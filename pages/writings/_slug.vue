<template>
  <Post></Post>
</template>

<script>
import gql from 'graphql-tag';
import { DatoCmsSeoMetaTags } from '../../apollo/fragments/seoMetaTagsFragmentMixin';
import Post from '../../components/Post';

export default {
  name: 'Slug',

  components: { Post },

  head() {
    return {
      title: this.post.title,
      meta: [
        ...this.getSeoMetaData()
      ]
    };
  },

  apollo: {
    post: {
      query: gql`
{
  post(filter: {slug: {eq: $slug}}, locale: en) {
    id
    slug
    title(locale: en)
    category(locale: en)
    body(locale: en, markdown: true)
    _firstPublishedAt
    _publishedAt
    seoMetaTags: _seoMetaTags {
      ...DatoCmsSeoMetaTags
    }
  }
}
${DatoCmsSeoMetaTags}
   `,
      // Initial variables
      variables: {
        slug: this.$route.params.slug
      }
    }
  },

  methods: {
    getSeoMetaData: function () {
      if (!this.home) {
        return [];
      }

      return this.home.seoMetaTags.filter(meta => meta.tag === 'meta')
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

