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
    bgColor
    base64
  }
`;

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
