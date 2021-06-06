import React, { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NavBar } from './Navbar';
import { Header } from './Header';
import { createStyles, makeStyles, Theme, Toolbar } from '@material-ui/core';
import { Footer } from './Footer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    footer: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
  }),
);

type Props = {
  children?: ReactNode;
  title: string;
  header?: string;
  eyeCatch?: string;
  description: string
};

const Layout = ({ children, title = 'default title', header = title, eyeCatch, description }: Props) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title} | Webird</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        {/* OGP */}
        <meta property="og:url" content={`https://www.webird.work${router.pathname}`} />
        <meta property="og:type" content={title === 'Home' ? 'website' : 'article'} />
        <meta property="og:title" content={`${title} | Webird`} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="Webird" />
        <meta property="og:image" content={eyeCatch || 'https://images.microcms-assets.io/assets/d5eb4af8cbbf4b8aa1e80f6ea64e8f1d/cd97b6ee591a4834878d1ed3677c6533/logo.png'} />
      </Head>
      <NavBar />
      <Toolbar variant="dense" />
      <div className={classes.main}>
        <Header text={header} />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
