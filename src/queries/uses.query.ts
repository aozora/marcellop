import { globalSeoFragment, metaTagsFragment } from './__fragments';

export const usesQuery = `
  query Uses {
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
       
    allUses {
      id
      title
      description(markdown: true)
      seo: _seoMetaTags {
        attributes
        content
        tag
      }
    }
  }

  ${metaTagsFragment}
  ${globalSeoFragment}
`;
