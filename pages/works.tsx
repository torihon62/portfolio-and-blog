import { Chip, createStyles, Divider, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import Layout from '../components/Layout';
import { Work } from '../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(5),
    },
    image: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    description: {
      '& h3': {
        marginBottom: 0,
      },
    },
    link: {
      textDecoration: 'none',
    },
    chip: {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.04)',
        cursor: 'pointer',
      },
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }),
);

interface Props {
  works: Work[];
}

const WorksPage = (props: Props) => {
  const works = props.works;
  const classes = useStyles();

  return (
    <Layout title="Works" description={'今までの製作物です'}>
      <Grid container className={classes.root}>
        <Grid item xs />
        <Grid container xs={12} sm={10} item>
          {works.map((work, index) => (
            <React.Fragment key={work.id}>
              <Grid item xs={12} md={4} className={classes.image}>
                <img src={work.image.url} width="100%" />
              </Grid>
              <Grid item xs />
              <Grid item xs={12} md={7} className={classes.description}>
                <h2>{work.title}</h2>
                <h3>URL</h3>
                <Typography>
                  <a href={work.url} target={'_blank'}>
                    {work.url}
                  </a>
                </Typography>
                <h3>ソースコード</h3>
                <Typography>
                  <a href={work.source} target={'_blank'}>
                    {work.source}
                  </a>
                </Typography>
                <h3>製作期間</h3>
                <Typography>{work.period}</Typography>
                <h3>概要</h3>
                <Typography style={{ whiteSpace: 'pre-wrap' }}>{work.description}</Typography>
                {work.technologies.map((technology, index) => (
                  <Link href={'/skills'} key={`${index}_${technology.id}`}>
                    <a className={classes.link}>
                      <Chip className={classes.chip} label={technology.name} variant="outlined" />
                    </a>
                  </Link>
                ))}
              </Grid>
              <Grid item xs={12}>
                {index + 1 !== works.length && <Divider className={classes.divider} />}
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
        <Grid item xs />
      </Grid>
    </Layout>
  );
};

export default WorksPage;

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://torihon.microcms.io/api/v1/works', key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      works: data.contents,
    },
  };
};
