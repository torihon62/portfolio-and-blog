import Layout from '../../components/Layout';
import { Post } from '../../interfaces';
import { Grid, makeStyles, Theme, createStyles, Hidden } from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { DateTime } from '../../components/DateTime';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timestamps: {
      marginBottom: theme.spacing(4),
    },
    timestamp: {
      margin: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& svg': {
        marginRight: theme.spacing(1),
      },
    },
    body: {
      fontSize: '18px',
      marginBottom: '2em',
      lineHeight: 1.7,
      overflowWrap: 'break-word',
      [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
      },
      '& img': {
        maxWidth: '100%',
      },
      '& blockquote': {
        position: 'relative',
        padding: '10px 15px 10px 60px',
        boxSizing: 'border-box',
        fontStyle: 'italic',
        background: '#efefef',
        color: '#555',
        '&::before': {
          display: 'inline-block',
          position: 'absolute',
          top: '10px',
          left: '-3px',
          content: '"“"',
          fontFamily: 'sans-serif',
          color: '#cfcfcf',
          fontSize: '90px',
          lineHeight: 1,
        },
      },
      '& pre': {
        margin: '0 0 1.5em 0',
        fontSize: '15px',
        padding: '1em',
        color: 'white',
        border: '1px solid #e4e4e4',
        background: '#272d33',
        borderRadius: '2px',
      },
    },
    author: {
      borderRadius: '10px',
      border: '#bbbbbb',
      marginBottom: '2em',
    },
    authorIcon: {
      display: 'flex',
      justifyContent: 'center',
      '& img': {
        borderRadius: '50%',
      },
    },
    authorDescriptionBox: {
      paddingLeft: '15px',
    },
    authorDescription: {
      marginBottom: '15px',
    },
    authorSNS: {
      paddingRight: '5px',
    },
  }),
);

interface Props {
  post: Post;
}

export default function BlogId(props: Props) {
  const { post } = props;
  const classes = useStyles();
  const maxLength = 200;
  const body = post.body.replace(/<.*?>/g, '');
  const outline = body.length > maxLength ? `${body.substr(0, maxLength)}` : body;

  return (
    <Layout title={post.title} eyeCatch={post.eyeCatch?.url} description={outline}>
      <Grid container className={classes.timestamps}>
        <Grid item container xs={12}>
          <Grid item xs />
          <Grid className={classes.timestamp} item xs={12} sm={3}>
            <AccessTimeIcon fontSize={'small'} />
            <DateTime timestamp={new Date(post.publishedAt).getTime()} format={'YYYY-MM-DD'} />
          </Grid>
          <Grid item xs />
        </Grid>
      </Grid>
      <main>
        <Grid container>
          <Hidden smDown>
            <Grid item xs />
          </Hidden>
          <Grid item xs={12} md={7} className={classes.body}>
            <div
              dangerouslySetInnerHTML={{
                __html: `${post.body}`,
              }}
            />
          </Grid>
          <Hidden smDown>
            <Grid item xs />
          </Hidden>
        </Grid>
      </main>
    </Layout>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data: { contents: Post[] } = await fetch('https://torihon.microcms.io/api/v1/blog', key)
    .then((res) => res.json())
    .catch(() => null);
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

interface Param {
  id: string;
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: { params: Param }) => {
  const id = context.params.id;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://torihon.microcms.io/api/v1/blog/' + id, key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      post: data,
    },
  };
};
