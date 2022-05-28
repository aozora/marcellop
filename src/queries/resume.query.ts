import { globalSeoFragment, metaTagsFragment } from './__fragments';

export const resumeQuery = `
  query Resume {
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
       
    allResumeJobs(orderBy: from_DESC) {
      id
      title
      from
      to
      company
      description
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }     
  }

  ${metaTagsFragment}
  ${globalSeoFragment}
`;
