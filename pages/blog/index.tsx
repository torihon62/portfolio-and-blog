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
import Layout from '../../components/Layout';
import { Post } from '../../interfaces';

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
    },
    title: {
      fontWeight: 'bold',
    },
    media: {
      height: 140,
      backgroundSize: 'contain',
      backgroundColor: '#ebebeb',
    },
    outline: {
      marginBottom: theme.spacing(3),
    },
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);
interface Props {
  posts: Post[];
}

const BlogPage = (props: Props) => {
  const classes = useStyles();

  return (
    <Layout title="Blog">
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
    </Layout>
  );
};

export default BlogPage;

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://torihon.microcms.io/api/v1/blog', key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      posts: data.contents,
    },
  };
};
