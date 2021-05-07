import Link from 'next/link';
import Layout from '../../components/Layout';
import { Post } from '../../interfaces';

interface Props {
  posts: Post[];
}

const BlogPage = (props: Props) => (
  <Layout title="Blog">
    <h1>Blog</h1>
    <div>
      <ul>
        {props.posts.map((post) => (
          <li key={post.id}>
            <Link href={`blog/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
);

export default BlogPage;

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  const data = await fetch('https://torihon.microcms.io/api/v1/blog', key)
    .then((res) => res.json())
    .catch(() => null);
  return {
    props: {
      posts: data.contents,
    },
  };
};
