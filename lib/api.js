const API_URL = 'https://graphql.datocms.com';
const API_TOKEN = process.env.DATOCMS_API_TOKEN;

// See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
const responsiveImageFragment = `
  fragment responsiveImageFragment on ResponsiveImage {
    srcSet
    webpSrcSet
    sizes
    src
    width
    height
    aspectRatio
    alt
    title
    bgColor
    base64
  }
`;

async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(API_URL + (preview ? '/preview' : ''), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

export async function getSiteData(preview) {
  const data = await fetchAPI(
    `
    {
      site: _site {
        globalSeo {
          siteName
          titleSuffix
          twitterAccount
          fallbackSeo {
            title
            image {
              url
              format
            }
            description
            twitterCard
          }
        }
        favicon: faviconMetaTags {
          attributes
          content
          tag
        }
      }
    }
  `,
    { preview }
  );

  return data?.site;
}

export async function getHomeData(preview) {
  const data = await fetchAPI(
    `
    {
      home {
        hi
        heading1
        heading2A
        heading2B
        heading2C
        aboutHeading
        aboutDescription1
        aboutDescription2
        aboutDescription3
        aboutDescription4
        aboutPicture {
          responsiveImage(imgixParams: {fm: jpg, auto: compress, w: 630 h: 464 }) {
            ...responsiveImageFragment
          }
         alt
        }
        whatidoHeading
        whatido {
          title
          description
          cover {
            responsiveImage(imgixParams: {fm: jpg, auto: compress }) {
              ...responsiveImageFragment
            }
           alt
          }
        }
        seo: _seoMetaTags {
          tag
          content
          attributes
        }
      }
    }

    ${responsiveImageFragment}
  `,
    { preview }
  );

  return data?.home;
}

export async function getAllMenu(preview) {
  const data = await fetchAPI(
    `
    {
      menu {
        menuItems {
          title
          url
        }
      }      
    }
  `,
    { preview }
  );

  return data?.menu;
}

export async function getAllResumeJobs(preview) {
  const data = await fetchAPI(
    `
    {
        allResumeJobs(orderBy: from_DESC) {
          id
          title
          from
          to
          company
          description
          seo: _seoMetaTags {
            attributes
            content
            tag
          }
        }     
    }
  `,
    { preview }
  );

  return data?.allResumeJobs;
}

export async function getAllUses(preview) {
  const data = await fetchAPI(
    `
    {
      allUses {
        id
        title
        description(markdown: true)
        seo: _seoMetaTags {
          attributes
          content
          tag
        }
      }
    }
  `,
    { preview }
  );

  return data?.allUses;
}

export async function getAllPosts(preview) {
  const data = await fetchAPI(
    `
    {
      allPosts(orderBy: _firstPublishedAt_DESC) {
        id
        title
        slug
        category
        body(markdown: true)
        body2 {
          value
          blocks {
            ... on ImageBlockRecord {
              id
              __typename
              image {
                responsiveImage(imgixParams: {fm: jpg}) {
                  srcSet
                  webpSrcSet
                  sizes
                  src
                  width
                  height
                  aspectRatio
                  alt
                  title
                  bgColor
                  base64
                }
              }
            }
            ... on VideoBlockRecord {
              id
              __typename
              video {
                video {
                  streamingUrl
                }
                url
              }
            }
          }
        }
        cover {
          responsiveImage(imgixParams: {fm: jpg}) {
            ...responsiveImageFragment
          }
        }
        seo: _seoMetaTags {
          attributes
          content
          tag
        }
        publishedAt: _firstPublishedAt
      }
    }

    ${responsiveImageFragment}
  `,
    { preview }
  );

  return data?.allPosts;
}

export async function getAllPostsWithSlug() {
  const data = fetchAPI(
    `
    {
      allPosts {
        slug
      }
    }
  `,
    { preview: false }
  );
  return data?.allPosts;
}

export async function getPostBySlug(slug, preview) {
  const data = fetchAPI(
    `
    query PostBySlug($slug: String) {
      post(filter: {slug: {eq: $slug}}) {
        id
        title
        slug
        body(markdown: true)
        body2 {
          value
          blocks {
            ... on ImageBlockRecord {
              id
              __typename
              image {
                responsiveImage(imgixParams: {fm: jpg}) {
                  srcSet
                  webpSrcSet
                  sizes
                  src
                  width
                  height
                  aspectRatio
                  alt
                  title
                  bgColor
                  base64
                }
              }
            }
            ... on VideoBlockRecord {
              id
              __typename
              video {
                video {
                  streamingUrl
                }
                url
              }
            }
          }
        }
        seo: _seoMetaTags {
          attributes
          content
          tag
        }
        publishedAt: _firstPublishedAt
        category
        cover {
          responsiveImage(imgixParams: {fm: jpg}) {
            ...responsiveImageFragment
          }
        }
      }
    }
    
    ${responsiveImageFragment}
  `,
    {
      preview,
      variables: {
        slug
      }
    }
  );

  return data;
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String) {
      post(filter: {slug: {eq: $slug}}) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        slug
      }
    }
  );
  return data?.post;
}
