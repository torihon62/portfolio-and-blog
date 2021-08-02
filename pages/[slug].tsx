export const getStaticProps = async (context: { params: { slug: any; }; previewData: { draftKey: any; }; }) => {
    const slug = context.params?.slug;
    const draftKey = context.previewData?.draftKey;
    const content = await fetch(
        `https://xxxxxx.microcms.io/api/v1/blog/${slug}${
        draftKey !== undefined ? `?draftKey=${draftKey}` : ''
        }`,
        { headers: { 'X-API-KEY': process.env.apiKey || '' } }
    )
    .then((res) => res.json());
    return {
        props: {
            content
        }
    };
};
