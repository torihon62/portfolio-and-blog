import React, { ReactNode } from 'react';
import Head from 'next/head';
import { NavBar } from './Navbar';
import { Header } from './Header';
import { createStyles, makeStyles, Theme, Toolbar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
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
};

const Layout = ({ children, title = 'default title', header = title }: Props) => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{title} | Webird</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <NavBar />
      <Toolbar variant="dense" />
      <div className={classes.main}>
        <Header text={header} />
        {children}
      </div>
      <footer className={classes.footer}>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </>
  );
};

export default Layout;
