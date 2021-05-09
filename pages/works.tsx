import Link from 'next/link';
import Layout from '../components/Layout';

const WorksPage = () => (
  <Layout title="Works">
    <p>This is the works page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default WorksPage;
