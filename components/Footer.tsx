import { createStyles, Divider, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      textAlign: 'center',
    },
    text: {
      margin: theme.spacing(2),
    },
  }),
);

export const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Divider />
      <div className={classes.text}>© 2021 Webird</div>
    </footer>
  );
};
