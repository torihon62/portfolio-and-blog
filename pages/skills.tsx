import Link from 'next/link';
import Layout from '../components/Layout';

const SkillsPage = () => (
  <Layout title="Skills">
    <p>This is the skills page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default SkillsPage;
