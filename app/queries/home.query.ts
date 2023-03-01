import { metaTagsFragment, responsiveImageFragment } from "~/queries/fragments";

export const homeQuery = `
  query Home {
    home {
      title
      slug
      heading1
      heading1Ja
      heading2
      heading2Ja
      aboutHeading
      aboutDescription1
      aboutDescription2
      aboutDescription3
      aboutDescription4
      aboutPicture {
        mimeType
        responsiveImage(imgixParams: {fm: jpg, auto: compress, w: 630 h: 464 }) {
          ...responsiveImageFragment
        }
      }
      whatidoHeading
      whatido {
        title
        description
        cover {
          mimeType
          responsiveImage(imgixParams: {fm: jpg, auto: compress }) {
            ...responsiveImageFragment
          }
        }
      }
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
  }

  ${responsiveImageFragment}
  ${metaTagsFragment}
`;
