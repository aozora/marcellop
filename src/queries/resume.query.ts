import { metaTagsFragment } from './__fragments';

export const resumeQuery = `
  query Resume {
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
`;
