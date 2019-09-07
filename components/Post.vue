<template>
  <article v-if="post"
           :aria-labelledby="`aria-article-${post.id}`"
           class="post"
           itemscope
           itemtype="http://http://schema.org/BlogPosting"
           role="article"
  >
    <header>
      <h1 :id="`aria-article-${post.id}`"
          itemprop="name"
      >{{ post.title }}</h1>

      <div class="post__metadata">
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

    <figure v-if="post.cover">
      <img
        :srcset="`${post.cover.url}?w=630;1280w,
              ${post.cover.url}?w=630&fit=max;768w,
              ${post.cover.url}?w=300&fit=max;320w
          `"
        sizes="(min-width: 17em) 50vw, 100vw"
        :src="`${post.cover.url}?w=630`"
        :alt="post.cover.alt"
      >
      <figcaption>{{ post.cover.alt }}</figcaption>
    </figure>

    <div v-html="post.body"></div>

    <footer>
      <p>Sincerely,</p>
      <p class="post__signature">Marcello</p>
    </footer>
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
        'MMMM do yyyy'
      );
    },

    getPublishedDateShort() {
      return format(
        new Date(this.post._publishedAt),
        'yyyy-MM-dd'
      );
    }
  }
};
</script>
