<template>
  <section class="posts">
    <h1>Writings</h1>

    <div v-if="allPosts && allPosts.length > 0">
      <PostAbstract v-for="post in allPosts" :key="post.id" :post="post"></PostAbstract>

<!--      <div class="posts__pagination">-->
<!--        <a href="#">Older entries</a>-->
<!--        <a href="#">Newer entries</a>-->
<!--      </div>-->
    </div>

    <div v-else>
      <p class="sorry">Nothing new here, please come back later...</p>
    </div>
  </section>
</template>

<script>
import gql from 'graphql-tag';
import { DatoCmsSeoMetaTags } from '../../apollo/fragments/seoMetaTagsFragmentMixin';
import PostAbstract from '../../components/PostAbstract';

export default {
  name: 'Writings',

  components: { PostAbstract },

  // head() {
  //   return {
  //     // title: this.$t('home.title'),
  //     // titleTemplate: null,
  //     meta: [
  //       ...this.getSeoMetaData()
  //     ]
  //   };
  // },

  apollo: {
    allPosts: gql`
{
  allPosts(locale: en, orderBy: _publishedAt_DESC, skip: "0", first: "10") {
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
`
  },
  //
  // methods: {
  //   getSeoMetaData: function () {
  //     if (!this.home) {
  //       return [];
  //     }
  //
  //     return this.home.seoMetaTags.filter(meta => meta.tag === 'meta')
  //       .map((meta) => {
  //         if (meta.attributes !== null) {
  //
  //           const m = {};
  //           const attributes = Object.keys(meta.attributes);
  //
  //           for (let index = 0; index < attributes.length; index++) {
  //             m[attributes[index]] = meta.attributes[attributes[index]];
  //             m.hid = attributes[index];
  //           }
  //
  //           return m;
  //         }
  //       });
  //   }
  // }
};
</script>
