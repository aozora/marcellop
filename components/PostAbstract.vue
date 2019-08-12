<template>
  <article :aria-labelledby="`aria-post-${post.id}`" class="post" itemscope itemtype="http://http://schema.org/BlogPosting" role="article">
    <header>
      <h2 :id="`aria-post-${post.id}`" itemprop="name">
        <nuxt-link :to="`writings/${post.slug}`" exact rel="bookmark">{{ post.title }}</nuxt-link>
      </h2>

      <div class="metadata">
        <span class="visuallyhidden">Posted </span>
        <p v-if="post.category">
          <em class="visuallyhidden">in </em>
          <span>{{ post.category }}</span>
        </p>
        <p>
          <span class="visuallyhidden"> on </span>
          <time itemprop="datePublished" :datetime="getPublishedDateShort">{{ getPublishedDateFormatted }}</time>
        </p>
      </div>
    </header>

    <div v-html="getAbstract"></div>
  </article>
</template>

<script>
import { format } from 'date-fns';
import stripHtml from 'string-strip-html';

export default {
  name: 'PostAbstract',

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
    },

    getAbstract() {
      const text = stripHtml(this.post.body);

      if (text.length >= 200) {
        return `${text.substr(0, 200)}...`;
      }

      return text;
    }
  }
};
</script>
