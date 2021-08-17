import {
  Card,
  CardMedia,
  CardContent,
  Chip,
  Grid,
  makeStyles,
  Typography,
  Theme,
  createStyles,
} from '@material-ui/core';
import Link from 'next/link';
import Layout from '../../../components/Layout';
import { Pagination } from '../../../components/Pagination';
import { Post } from '../../../interfaces';
import { BLOG_PER_PAGE } from '../../../interfaces/consts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    link: {
      textDecoration: 'none',
    },
    card: {
      margin: theme.spacing(1),
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.04)',
      },
    },
    title: {
      fontWeight: 'bold',
    },
    media: {
      height: 140,
      backgroundSize: 'cover',
      backgroundColor: '#ebebeb',
    },
    outline: {
      marginBottom: theme.spacing(3),
    },
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        marginBottom: '30px',
      },
  }),
);
interface Props {
  id: number;
  posts: Post[];
  totalCount: number;
}

const BlogPageId = (props: Props) => {
  const classes = useStyles();

  return (
    <Layout title="Blog" description={'ブログの一覧です'}>
      <Grid container className={classes.root}>
        {props.posts.map((post) => {
          const maxLength = 50;
          const body = post.body.replace(/<.*?>/g, ' ');
          const outline = body.length > maxLength ? `${body.substr(0, maxLength)} ...` : body;

          return (
            <Grid key={post.id} item xs={12} sm={6} md={3}>
              <Link href={`/blog/${post.id}`}>
                <a className={classes.link}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.media}
                      image={post.eyeCatch ? post.eyeCatch.url : '/assets/images/noimage.png'}
                      title={post.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
                        {post.title}
                      </Typography>
                      <div
                        className={classes.outline}
                        dangerouslySetInnerHTML={{
                          __html: outline,
                        }}
                      />
                      {post.category.map((category, index) => (
                        <Chip
                          key={`${index}_${category.id}`}
                          className={classes.chip}
                          label={category.category}
                          variant="outlined"
                        />
                      ))}
                    </CardContent>
                  </Card>
                </a>
              </Link>
            </Grid>
          );
        })}
      </Grid>
      <Grid container>
        <Grid item xs className={classes.pagination}>
          <Pagination totalCount={props.totalCount} page={props.id} />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default BlogPageId;

// 動的なページを作成
export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const res = await fetch('https://torihon.microcms.io/api/v1/blog', key);

  const repos = await res.json();

  const range = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(repos.totalCount / BLOG_PER_PAGE)).map((repo) => `/blog/page/${repo}`);

  return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context: { params: { id: string } }) => {
  const id = parseInt(context.params.id);

  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const data = await fetch(
    `https://torihon.microcms.io/api/v1/blog?offset=${(id - 1) * BLOG_PER_PAGE}&limit=${BLOG_PER_PAGE}`,
    key,
  )
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      id,
      posts: data.contents,
      totalCount: data.totalCount,
    },
  };
};
