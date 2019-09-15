import gql from 'graphql-tag';
import { DatoCmsSeoMetaTags } from '../apollo/fragments/seoMetaTagsFragmentMixin';

export const state = () => ({
  home: {},
  resume: [],
  writings: []
});

export const mutations = {
  SET_RESUME(state, data) {
    state.resume = data;
  },

  SET_WRITINGS(state, data) {
    state.writings = data;
  },

};

export const actions = {
  /**
   * nuxtServerInit
   * @param dispatch
   * @returns {Promise<void>}
   */
  async nuxtServerInit({ dispatch }) {
    try {
      await dispatch('getResume');
      await dispatch('getWritings');
    } catch (error) {
      console.error({ error });
    }
  },

  async getResume({ state, commit }) {
    // get the apollo client
    let client = this.app.apolloProvider.defaultClient;
    const getJobsQuery = gql`query GetJobs
    {
        jobs: allResumeJobs(locale: en, orderBy: to_DESC) {
            title
            from
            to
            company
            description(markdown: true)
            seoMetaTags: _seoMetaTags {
                ...DatoCmsSeoMetaTags
            }
        }
    }
    ${DatoCmsSeoMetaTags}
    `;

    let data = await client.query({
      // fetchPolicy: 'network-only', // ensure cache isn't being used
      query: getJobsQuery
    });

    commit('SET_RESUME', data.data.jobs);
  },

  async getWritings({ state, commit }) {
    // get the apollo client
    let client = this.app.apolloProvider.defaultClient;
    const getPostsQuery = gql`query GetPosts
    {
        allPosts(locale: en, orderBy: _publishedAt_DESC, skip: "0", first: "10") {
            id
            slug
            title(locale: en)
            category(locale: en)
            cover {
                url
                alt
            }
            body(locale: en, markdown: true)
            _firstPublishedAt
            _publishedAt
            seoMetaTags: _seoMetaTags {
                ...DatoCmsSeoMetaTags
            }
        }
    }
    ${DatoCmsSeoMetaTags}
    `;

    let data = await client.query({
      // fetchPolicy: 'network-only', // ensure cache isn't being used
      query: getPostsQuery
    });

    commit('SET_WRITINGS', data.data.allPosts);
  },


};
