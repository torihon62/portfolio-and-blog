import { createStyles, Grid, Hidden, makeStyles, Theme, Typography } from '@material-ui/core';
import Layout from '../components/Layout';
import { IndexCard } from '../components/IndexCard';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import StarIcon from '@material-ui/icons/Star';
import BookIcon from '@material-ui/icons/Book';
import ChatIcon from '@material-ui/icons/Chat';
import Image from 'next/image';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    profile: {
      display: 'flex',
      fontSize: '18px',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avater: {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '50%',
    },
    name: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      fontWeight: 'bold',
    },
    cards: {
      justifyContent: 'center',
    },
    card: {
      padding: theme.spacing(4),
      justifyContent: 'center',
    },
  }),
);

const IndexPage = () => {
  const classes = useStyles();

  return (
    <Layout title="Home" header="Webird">
      <Grid container>
        <Grid item xs />
        <Grid item xs={12} sm={6} md={5} className={classes.profile}>
          <Image src={'/assets/images/logo.png'} width={200} height={200} className={classes.avater} />
          <Typography className={classes.name}>とりほん's Portfolio</Typography>
          <Typography>子育てと料理が好きなフロントエンドエンジニア。</Typography>
        </Grid>
        <Grid item xs />
      </Grid>
      <Grid container className={classes.cards}>
        <Hidden smDown>
          <Grid item xs />
        </Hidden>
        <Grid item xs={12} sm={5} className={classes.card}>
          <IndexCard link={'/about'} title={'About'} description={'私について'} icon={<PersonIcon />} />
        </Grid>
        <Grid item xs={12} sm={5} className={classes.card}>
          <IndexCard link={'/works'} title={'Works'} description={'製作物'} icon={<BuildIcon />} />
        </Grid>
        <Hidden smDown>
          <Grid item xs />
        </Hidden>
      </Grid>
      <Grid container className={classes.cards}>
        <Hidden smDown>
          <Grid item xs />
        </Hidden>
        <Grid item xs={12} sm={5} className={classes.card}>
          <IndexCard link={'/skills'} title={'Skills'} description={'保有スキル'} icon={<StarIcon />} />
        </Grid>
        <Grid item xs={12} sm={5} className={classes.card}>
          <IndexCard link={'/blog'} title={'Blog'} description={'ブログ'} icon={<BookIcon />} />
        </Grid>
        <Hidden smDown>
          <Grid item xs />
        </Hidden>
      </Grid>
      <Grid container className={classes.cards}>
        <Hidden smDown>
          <Grid item xs />
        </Hidden>
        <Grid item xs={12} sm={5} className={classes.card}>
          <IndexCard link={'/contact'} title={'Contact'} description={'お問い合わせ'} icon={<ChatIcon />} />
        </Grid>
        <Hidden smDown>
          <Grid item xs />
        </Hidden>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
