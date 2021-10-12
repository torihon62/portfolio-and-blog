import { Avatar, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import Layout from '../components/Layout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(5),
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
    },
    link: {
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
    },
    avater: {
      margin: '30px auto',
      width: '200px',
      height: '200px',
    },
  }),
);

const ContactPage = () => {
  const classes = useStyles();
  return (
    <Layout title="Contact" description={'お問い合わせぺーじです'}>
      <div className={classes.root}>
        <Typography>TwitterのGMからお願いします</Typography>
        <a href={'https://twitter.com/torihon62'} target={'_blank'} className={classes.link}>
          <Avatar src={'/assets/images/logo.png'} className={classes.avater} />
          <div>twitter</div>
        </a>
      </div>
    </Layout>
  );
};

export default ContactPage;
