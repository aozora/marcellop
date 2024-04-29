import { metaTagsFragment, responsiveImageFragment } from './__fragments';

export const homeQuery = `
  query Home {
    home {
      id
      _modelApiKey
      title
      slug
      canonical
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
      heading1
      heading2
      aboutHeading
      aboutDescription1
      aboutDescription2
      aboutDescription3
      aboutDescription4
      aboutPicture {
        responsiveImage(imgixParams: {fm: jpg, fit: max, w: 1440}) {
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
    }
  }

  ${metaTagsFragment}
  ${responsiveImageFragment}
`;
