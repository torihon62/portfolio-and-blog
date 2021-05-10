import React from 'react';
import {
  createStyles,
  Grid,
  makeStyles,
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Theme,
  Paper,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Layout from '../components/Layout';
import { SkillSet } from '../interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(5),
      display: 'flex',
    },
    paper: {
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      textAlign: 'center',
      alignSelf: 'flex-start',
    },
    header: {
      fontWeight: 'bold',
    },
  }),
);

interface Props {
  skills: SkillSet[];
}

const SkillsPage = (props: Props) => {
  const skills = props.skills;
  const classes = useStyles();

  return (
    <Layout title="Skills">
      <Grid container className={classes.root}>
        {skills.map((skill) => (
          <React.Fragment key={skill.id}>
            <Grid item xs />
            <Grid container item xs={12} md={6} className={classes.paper}>
              <Grid item xs={12}>
                <h2>{skill.name}</h2>
              </Grid>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.header} align="center">
                        技術
                      </TableCell>
                      <TableCell className={classes.header} align="center">
                        経験
                      </TableCell>
                      <TableCell className={classes.header} align="center">
                        熟練度
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {skill.contents.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell align="center">{content.name}</TableCell>
                        <TableCell align="center">{content.experience}</TableCell>
                        <TableCell align="center">
                          <Rating value={content.rating} readOnly />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs />
          </React.Fragment>
        ))}
      </Grid>
    </Layout>
  );
};

export default SkillsPage;

export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://torihon.microcms.io/api/v1/skillsets', key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      skills: data.contents,
    },
  };
};
