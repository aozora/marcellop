import { metaTagsFragment } from './__fragments';

export const tatiQuery = `
  query Uses {
    tati {
      id
      seo: _seoMetaTags {
        ...metaTagsFragment
      }
      title
      intro
    }
  }

  ${metaTagsFragment}
`;
