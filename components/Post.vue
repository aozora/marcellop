<template>
  <article aria-labelledby="aria-article-9324" class="post" itemscope itemtype="http://http://schema.org/BlogPosting" role="article">
    <header>
      <h1 id="aria-article-9324" itemprop="name">{{ post.title }}</h1>

      <p class="metadata">
        <span class="visuallyhidden">Posted in </span>
        {{ post.category }} <span class="visuallyhidden"> on </span>
        <time itemprop="datePublished" :datetime="getPublishedDateShort">{{ getPublishedDateFormatted }}</time>
      </p>
    </header>

    <div v-html="post.body"></div>
  </article>
</template>

<script>
import { format } from 'date-fns';

export default {
  name: 'Post',

  props: {
    post: {
      required: true,
      type: Object,
      default: () => {
        return undefined;
      }
    }
  },

  computed: {
    getPublishedDateFormatted() {
      return format(
        new Date(this.post._publishedAt),
        'MMMM Do YYYY'
      );
    },

    getPublishedDateShort() {
      return format(
        new Date(this.post._publishedAt),
        'YYYY-MM-DD'
      );
    }
  }
};
</script>
