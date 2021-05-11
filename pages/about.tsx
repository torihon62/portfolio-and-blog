import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import Image from 'next/image';
import React from 'react';
import Layout from '../components/Layout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(5),
    },
    profile: {
      display: 'flex',
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
    text: {
      fontSize: '18px',
      marginBottom: '2em',
      lineHeight: 1.7,
    },
  }),
);

const AboutPage = () => {
  const classes = useStyles();

  return (
    <Layout title="About">
      <div className={classes.root}>
        <Grid container>
          <Grid item xs />
          <Grid item xs={12} sm={6} md={5} className={classes.profile}>
            <Image src={'/assets/images/logo.png'} width={200} height={200} className={classes.avater} />
          </Grid>
          <Grid item xs />
        </Grid>
        <Grid container>
          <Grid item xs />
          <Grid item xs={12} sm={9} md={7}>
            <Typography variant={'h5'} className={classes.name}>
              とりほん
            </Typography>
            <div className={classes.text}>
              <Typography>北海道生まれ。</Typography>
              <Typography>高専、技科大で電気工学を専攻していました。</Typography>
              <br />
              <Typography>
                プラントエンジニアとして就職するも、工事現場特有の職人気質な社風が肌に合わず、部署を異動しまして、
              </Typography>
              <Typography>異動後は組み込みLinuxの業務に触れ、プログラミングの楽しさに目覚めます。</Typography>
              <br />
              <Typography>そこからは、フロントエンドの技術領域に魅了され、日々勉強を続けています。</Typography>
            </div>
          </Grid>
          <Grid item xs />
        </Grid>
      </div>
    </Layout>
  );
};

export default AboutPage;
