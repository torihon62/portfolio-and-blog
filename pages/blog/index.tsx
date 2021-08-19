import {
  Card,
  CardMedia,
  CardContent,
  Chip,
  Grid,
  makeStyles,
  Typography,
  Theme,
  createStyles,
} from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { animateScroll } from 'react-scroll';
import Layout from '../../components/Layout';
import { Pagination } from '../../components/Pagination';
import { SearchField } from '../../components/SearchField';
import { Post } from '../../interfaces';
import { BLOG_PER_PAGE } from '../../interfaces/consts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5),
    },
    searchForm: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
      marginBottom: '10px',
    },
    link: {
      textDecoration: 'none',
    },
    card: {
      margin: theme.spacing(1),
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.04)',
      },
    },
    title: {
      fontWeight: 'bold',
    },
    media: {
      height: 140,
      backgroundSize: 'cover',
      backgroundColor: '#ebebeb',
    },
    outline: {
      marginBottom: theme.spacing(3),
    },
    chip: {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    pagination: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
      marginBottom: '30px',
    },
  }),
);

interface IdName {
  id: string;
  name: string;
}

interface Props {
  posts: Post[];
  totalCount: number;
  categories: {
    id: string;
    category: string;
  }[];
}

const BlogPage = (props: Props) => {
  const classes = useStyles();
  const router = useRouter();
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [searchPosts, setSearchPosts] = useState<Post[]>();
  const [searchTotalCount, setSearchTotalCount] = useState<number>();

  const queryCategory = router.query['category'];

  const categoryItems = props.categories.map((catecory) => ({ id: catecory.id, name: catecory.category }));
  const defaultSelectedCategory = categoryItems.filter(
    (item) =>
      queryCategory &&
      !Array.isArray(queryCategory) &&
      queryCategory.split(',').some((category) => category === item.id),
  );

  const onAutocompleteChange = (items: IdName[]) => {
    setOffset(0);
    const selectedCategory = items.map((item) => item.id).join(',');
    if (selectedCategory === '') {
      router.push({
        query: {},
      });
    } else {
      router.push({
        query: {
          category: selectedCategory,
        },
      });
    }
  };

  const onPaginationChange = (value: number) => {
    setOffset(value - 1);
    if (scrollAreaRef.current) {
      animateScroll.scrollToTop({ duration: 500, containerId: scrollAreaRef.current.id });
    }
  };

  useEffect(() => {
    const categories = router.query['category'];

    if (!categories || Array.isArray(categories) || categories === '') {
      setSearchPosts(undefined);
      setSearchTotalCount(undefined);
      return;
    }
    const searchCategories = categories.split(',');
    const filteredPosts = props.posts.filter((post) =>
      post.category.some((postCategory) => searchCategories.some((c) => c === postCategory.id)),
    );

    setSearchPosts(filteredPosts);
    setSearchTotalCount(filteredPosts.length);
  }, [router.query]);

  const dividePostsPerPage = (posts: Post[]): Post[][] => {
    const result = [];
    let record = [];
    for (let i = 0, l = posts.length; i < l; i++) {
      record.push(posts[i]);
      if (record.length === BLOG_PER_PAGE) {
        result.push(record);
        record = [];
      }
      if (i === posts.length - 1 && record.length !== 0) {
        result.push(record);
      }
    }
    return result.length ? result : [[]];
  };

  const displayPosts = dividePostsPerPage(searchPosts ?? props.posts);
  const displayTotalCount = searchTotalCount ?? props.totalCount;

  return (
    <div ref={scrollAreaRef}>
      <Layout title="Blog" description={'ブログの一覧です'}>
        <Grid container>
          <Grid item xs className={classes.pagination}>
            <SearchField items={categoryItems} onChange={onAutocompleteChange} value={defaultSelectedCategory} />
          </Grid>
        </Grid>
        <Grid container className={classes.root}>
          {displayPosts[offset].map((post) => {
            const maxLength = 50;
            const body = post.body.replace(/<.*?>/g, ' ');
            const outline = body.length > maxLength ? `${body.substr(0, maxLength)} ...` : body;

            return (
              <Grid key={post.id} item xs={12} sm={6} md={3}>
                <Link href={`/blog/${post.id}`}>
                  <a className={classes.link}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.media}
                        image={post.eyeCatch ? post.eyeCatch.url : '/assets/images/noimage.png'}
                        title={post.title}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
                          {post.title}
                        </Typography>
                        <div
                          className={classes.outline}
                          dangerouslySetInnerHTML={{
                            __html: outline,
                          }}
                        />
                        {post.category.map((category, index) => (
                          <Chip
                            key={`${index}_${category.id}`}
                            className={classes.chip}
                            label={category.category}
                            variant="outlined"
                          />
                        ))}
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              </Grid>
            );
          })}
        </Grid>
        <Grid container>
          <Grid item xs className={classes.pagination}>
            <Pagination totalCount={displayTotalCount} page={offset + 1} onChange={onPaginationChange} />
          </Grid>
        </Grid>
      </Layout>
    </div>
  );
};

export default BlogPage;

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const data = await fetch(`https://torihon.microcms.io/api/v1/blog`, key)
    .then((res) => res.json())
    .catch(() => null);

  const categories = await fetch(`https://torihon.microcms.io/api/v1/categories`, key)
    .then((res) => res.json())
    .catch(() => null);

  return {
    props: {
      posts: data.contents,
      totalCount: data.totalCount,
      categories: categories.contents,
    },
  };
};
