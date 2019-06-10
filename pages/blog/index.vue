<!--<template>-->
<!--  <Layout>-->
<!--    &lt;!&ndash; List posts &ndash;&gt;-->
<!--    <div class="posts">-->
<!--      <PostCard v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node"/>-->
<!--    </div>-->

<!--  </Layout>-->
<!--</template>-->

<!--<page-query>-->
<!--  {-->
<!--    posts: allPost {-->
<!--    edges {-->
<!--    node {-->
<!--    id-->
<!--    title-->
<!--    path-->
<!--    tags {-->
<!--    id-->
<!--    title-->
<!--    path-->
<!--    }-->
<!--    date (format: "D. MMMM YYYY")-->
<!--    timeToRead-->
<!--    description-->
<!--    coverImage (width: 770, height: 380, blur: 10)-->
<!--    ...on Post {-->
<!--    id-->
<!--    title-->
<!--    path-->
<!--    }-->
<!--    }-->
<!--    }-->
<!--    }-->
<!--  }-->
<!--</page-query>-->

<!--<script>-->

<!--import PostCard from '../components/PostCard';-->

<!--export default {-->
<!--  components: { PostCard },-->
<!--  metaInfo: {-->
<!--    title: 'Blog'-->
<!--  }-->
<!--}-->
<!--</script>-->
