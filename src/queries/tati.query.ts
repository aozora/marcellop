import { metaTagsFragment, responsiveImageFragment } from './__fragments';

export const tatiQuery = `
  query Uses {
    tati {
      id
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
      title
      intro
      gallery {
        format
        id
        mimeType
        width
        height
        responsiveImage(imgixParams: {fm: webp, fit: max, w: 768}) {
          ...responsiveImageFragment
        }
      }      
    }
  }

  ${metaTagsFragment}
  ${responsiveImageFragment}
`;
