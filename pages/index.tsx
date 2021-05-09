import { Grid } from '@material-ui/core';
import Layout from '../components/Layout';

const IndexPage = () => {
  return (
    <Layout title="Home" header="Webird">
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          Works
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          Skills
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          Blog
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          Contact
        </Grid>
      </Grid>
    </Layout>
  );
};

export default IndexPage;
