import { globalSeoFragment, metaTagsFragment, responsiveImageFragment } from '@/queries/fragments';

export const postBySlugQuery = `
  query PostBySlug($slug: String) {
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
                ...responsiveImageFragment
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
        ...metaTagsFragment
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

  ${metaTagsFragment}
  ${globalSeoFragment}
  ${responsiveImageFragment}
`;
