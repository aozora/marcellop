import { globalSeoFragment, metaTagsFragment, responsiveImageFragment } from '@/queries/fragments';

export const postsQuery = `
  query Posts {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
      globalSeo {
        ...globalSeoFragment
      }
    }
    
    menu {
      menuItems {
        id
        title
        url
      }
    }   
       
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
        ...metaTagsFragment
      }
      publishedAt: _firstPublishedAt
    }
  }

  ${metaTagsFragment}
  ${globalSeoFragment}
  ${responsiveImageFragment}
`;
