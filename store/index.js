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
  }

};

export const actions = {
  /**
   * nuxtServerInit
   * @param dispatch
   * @returns {Promise<void>}
   */
  async nuxtServerInit({ dispatch }) {

    await dispatch('getResume');
    // await dispatch('getMenuContent');
    //
    // try {
    //   await dispatch('getApiConfiguration');
    //   await dispatch('getApiLanguages');
    //   await dispatch('getApiCountries');
    //   await dispatch('getApiMovieGenres');
    // } catch (error) {
    //   console.error({ error });
    // }
    //
    // await dispatch('getAppLoaderContent');
  },

  async getResume({ state, commit }) {
    // let { data } = await this.$axios({
    //   method: 'get',
    //   url: state.api.url.configuration,
    //   responseType: 'json'
    // });
    //
    // commit('SET_API_CONFIGURATION', data);

    // get the apollo client
    let client = this.app.apolloProvider.defaultClient;
    const query = gql`
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
      query
    });

    commit('SET_RESUME', data);
  },


};
