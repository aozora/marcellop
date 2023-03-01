import { globalSeoFragment, metaTagsFragment } from "~/queries/fragments";

export const commonQuery = `
  query Common {
    site: _site {
      favicon: faviconMetaTags {
        ...metaTagsFragment
      }
      globalSeo(locale: $locale) {
        ...globalSeoFragment
      }
      locales
    }
    
    menu {
      menuItems {
        title
        url
      }
    }      
  }
  
  ${metaTagsFragment}
  ${globalSeoFragment}
`;
