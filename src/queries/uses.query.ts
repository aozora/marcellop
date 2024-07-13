import { metaTagsFragment } from './__fragments';

export const usesQuery = `
  query Uses {
    allUses {
      id
      title
      description(markdown: true)
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
    }
  }

  ${metaTagsFragment}
`;
