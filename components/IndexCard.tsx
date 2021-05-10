import { Card, CardContent, createStyles, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.04)',
      },
    },
    link: {
      textDecoration: 'none',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& svg': {
        fontSize: '2.5rem',
        color: '#5a5a5a',
      },
    },
  }),
);

interface Props {
  link: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}
export const IndexCard: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { link, title, description, icon } = props;

  return (
    <Link href={link}>
      <a className={classes.link}>
        <Card className={classes.root}>
          <CardContent className={classes.cover}>{icon}</CardContent>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {description}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </a>
    </Link>
  );
};
