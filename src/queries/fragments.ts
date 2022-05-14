/**
 * Responsive Image fragment
 * See: See: https://www.datocms.com/blog/offer-responsive-progressive-lqip-images-in-2020
 */
export const responsiveImageFragment = `
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
    base64
  }
`;

/**
 * Metatags fragment
 */
export const metaTagsFragment = `
  fragment metaTagsFragment on Tag {
    attributes
    content
    tag
  }
`;

export const globalSeoFragment = `
    fragment globalSeoFragment on GlobalSeoField {
      siteName
      titleSuffix
      twitterAccount
      facebookPageUrl
    }
`;
