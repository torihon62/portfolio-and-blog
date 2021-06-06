import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import Image from 'next/image';
import Layout from '../components/Layout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      marginBottom: theme.spacing(5),
    },
    avater: {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '50%',
    },
  }),
);

const ContactPage = () => {
  const classes = useStyles();
  return (
    <Layout title="Contact" description={'お問い合わせぺーじです'}>
      <div className={classes.root}>
        <Typography>TwitterのGMからお願いします</Typography>
        <a href={'https://twitter.com/torihon62'} target={'_blank'}>
          <Image src={'/assets/images/logo.png'} width={200} height={200} className={classes.avater} />
          <br />
          twitter
        </a>
      </div>
    </Layout>
  );
};

export default ContactPage;
