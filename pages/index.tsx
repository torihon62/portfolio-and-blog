import Link from 'next/link';
import Layout from '../components/Layout';

const IndexPage = () => (
  <Layout title="Home">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <p>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
    </p>
  </Layout>
);

export default IndexPage;
