<template>
  <section class="resume">
    <h1>Resume</h1>
    <JobsList v-if="resume && resume.jobs" :jobs="jobs"></JobsList>
  </section>
</template>

<script>
import gql from 'graphql-tag';
import { DatoCmsSeoMetaTags } from '../apollo/fragments/seoMetaTagsFragmentMixin';
import JobsList from '../components/JobsList';

export default {
  name: 'Resume',

  components: { JobsList },

  head() {
    return {
      // title: this.$t('home.title'),
      // titleTemplate: null,
      meta: [
        ...this.getSeoMetaData()
      ]
    };
  },

  apollo: {
    resume: gql`
{
  resume(locale: en) {
    seoMetaTags: _seoMetaTags {
      ...DatoCmsSeoMetaTags
    }
    jobs {
      from
      to
      title
      company
      description
    }
  }
}
${DatoCmsSeoMetaTags}
`
  },

  computed: {
    jobs() {
      return this.resume && this.resume.jobs ? this.resume.jobs : [];
    }
  },

  methods: {
    getSeoMetaData: function () {
      if (!this.resume) {
        return [];
      }

      return this.resume.seoMetaTags.filter(meta => meta.tag === 'meta')
        .map((meta) => {
          if (meta.attributes !== null) {

            const m = {};
            const attributes = Object.keys(meta.attributes);

            for (let index = 0; index < attributes.length; index++) {
              m[attributes[index]] = meta.attributes[attributes[index]];
              m.hid = attributes[index];
            }

            return m;
          }
        });
    }
  }

};
</script>

