import Layout from '../../components/Layout';
import { Post } from '../../interfaces';

interface Props {
    post: Post;
}

export default function BlogId(props: Props) {
    const { post } = props;
    return (
        <Layout title={`${post.title} | Next.js + TypeScript Example`}>
            <main>
                <h1>{post.title}</h1>
                <p>{post.publishedAt}</p>
                <div
                dangerouslySetInnerHTML={{
                    __html: `${post.body}`,
                }}
                />
            </main>
        </Layout>
    );
  }
  
  // 静的生成のためのパスを指定します
  export const getStaticPaths = async () => {
    const key = {
      headers: {'X-API-KEY': process.env.API_KEY},
    };
    const data: { contents: Post[] } = await fetch('https://torihon.microcms.io/api/v1/blog', key)
      .then(res => res.json())
      .catch(() => null);
    const paths = data.contents.map(content => `/blog/${content.id}`);
    return {paths, fallback: false};
  };
  
  interface Param {
    id: string;
  }

  // データをテンプレートに受け渡す部分の処理を記述します
  export const getStaticProps = async (context: { params: Param }) => {
    const id = context.params.id;
    const key = {
      headers: {'X-API-KEY': process.env.API_KEY},
    };
    const data = await fetch(
      'https://torihon.microcms.io/api/v1/blog/' + id,
      key,
    )
      .then(res => res.json())
      .catch(() => null);
    return {
      props: {
        post: data,
      },
    };
  };
