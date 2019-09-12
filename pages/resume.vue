<template>
  <section class="resume">
    <h1>Resume</h1>
    <JobsList v-if="jobs" :jobs="jobs"></JobsList>
  </section>
</template>

<script>
import { mapState } from 'vuex';
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

  computed: {
    // mix this into the outer object with the object spread operator
    ...mapState({
      jobs: state => state.resume
    })
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

