import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  AppBar,
  createStyles,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    nav: {
      marginLeft: theme.spacing(2),
    },
    link: {
      textDecoration: 'none',
      color: 'white',
    },
    snsLinks: {
      marginTop: '15px',
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    snsLink: {
      textDecoration: 'none',
      color: 'inherit',
      '& svg': {
        fontSize: '32px',
      },
    },
    drawer: {
      minWidth: '200px',
    },
  }),
);

const MenuList = [
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Works',
    href: '/works',
  },
  {
    name: 'Skills',
    href: '/skills',
  },
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

export const NavBar: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const drawerMenuClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <a className={classes.link}>Webird</a>
            </Link>
          </Typography>
          <Hidden xsDown>
            {MenuList.map((menu) => (
              <div key={menu.name} className={classes.nav}>
                <Link href={menu.href}>
                  <a className={classes.link}>{menu.name}</a>
                </Link>
              </div>
            ))}
            <div className={classes.nav}>
              <a href={'https://twitter.com/torihon62'} target={'_blank'} className={classes.link}>
                <TwitterIcon />
              </a>
            </div>
            <div className={classes.nav}>
              <a href={'https://github.com/torihon62'} target={'_blank'} className={classes.link}>
                <GitHubIcon />
              </a>
            </div>
          </Hidden>
          <Hidden smUp>
            <IconButton onClick={() => setDrawerOpen(true)} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Drawer anchor={'right'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <List className={classes.drawer}>
                {MenuList.map((menu) => (
                  <ListItem key={`mobile_${menu.name}`} onClick={() => drawerMenuClick(menu.href)} button>
                    <ListItemText primary={menu.name} />
                  </ListItem>
                ))}
              </List>
              <Divider />
              <div className={classes.snsLinks}>
                <div>
                  <a href={'https://twitter.com/torihon62'} target={'_blank'} className={classes.snsLink}>
                    <TwitterIcon />
                  </a>
                </div>
                <div>
                  <a href={'https://github.com/torihon62'} target={'_blank'} className={classes.snsLink}>
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </Drawer>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};
