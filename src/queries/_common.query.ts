import { globalSeoFragment, metaTagsFragment } from './__fragments';

export const commonQuery = `
  query Layout {
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

  }

  ${metaTagsFragment}
  ${globalSeoFragment}
`;
