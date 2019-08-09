<template>
  <section class="resume">
    <h2>Resume</h2>

    <article v-for="(job, index) in resume.jobs" :key="index">
      <header>
        <h3>{{ job.title }}</h3>
        <div v-html="job.description"></div>
      </header>
    </article>
  </section>
</template>

<script>
import gql from 'graphql-tag';
import { DatoCmsSeoMetaTags } from '../apollo/fragments/seoMetaTagsFragmentMixin';

export default {
  name: 'Resume',

  head() {
    return {
      // title: this.$t('home.title'),
      titleTemplate: null,
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
      title
      description
      from
      to
      company
    }
  }
}
${DatoCmsSeoMetaTags}
`
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

