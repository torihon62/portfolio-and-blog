import { createStyles, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '600px',
      margin: '30px auto 0 auto',
    },
  }),
);

interface Props {
  text: string;
}
export const Header: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <h1>{props.text}</h1>
    </header>
  );
};
