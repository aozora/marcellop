import { globalSeoFragment, metaTagsFragment, responsiveImageFragment } from './fragments';

export const homeQuery = `
  query Home {
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
       
    home {
      id
      _modelApiKey
      title
      slug
      canonical
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
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
  }

  ${metaTagsFragment}
  ${globalSeoFragment}
  ${responsiveImageFragment}
`;