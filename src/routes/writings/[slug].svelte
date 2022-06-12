<script lang="ts">
import { page } from "$app/stores";
import type { Menu, Site } from "$lib/types";
import { menuItems } from "../../lib/stores/menu-store";
import type { Post } from "$lib/types";
import { getPublishedDateFormatted, getPublishedDateShort } from "../../lib/helpers.js";
import { Image, StructuredText } from "svelte-datocms";
import VideoBlock from "../../components/VideoBlock.svelte";
import ImageBlock from "../../components/ImageBlock.svelte";
// import Highlight from "svelte-highlight";
// import darcula from "svelte-highlight/src/styles/darcula";
// import javascript from "svelte-highlight/src/languages/javascript";

export type PostProps = {
  site: Site,
  menu: Menu,
  post: Post;
}

let slug;
page.subscribe(value => slug = value.params.slug);
console.log("slug: ", slug);


/**
 * PROPS
 */
export let data: PostProps;
let { site, menu, post }: PostProps = data;

// write the menuItems store with the data form the page endpoint
// the Header component will use that.
menuItems.update(() => {
  return menu.menuItems;
});

/**
 * State
 */
// const metaTags: Array<SeoMetaTagType> = home && home.seo ? home.seo.concat(site.favicon) : [];

</script>

<!--<svelte:head>-->
<!--  &lt;!&ndash;  styles for Highlight&ndash;&gt;-->
<!--  {@html darcula}-->
<!--</svelte:head>-->

<article
  aria-labelledby={`aria-article-${post.id}`}
  class="post">
  <header>
    <h1 id={`aria-article-${post.id}`}>
      {post.title}
    </h1>

    <div class="post__metadata">
      <span class="visuallyhidden">Posted </span>

      {#if post.category}
        <p>
          <em class="visuallyhidden">in </em>
          <span>{post.category}</span>
        </p>
      {/if}
      <p>
        <span class="visuallyhidden"> on </span>
        <time datetime={getPublishedDateShort(post.publishedAt)}>
          {getPublishedDateFormatted(post.publishedAt)}
        </time>
      </p>
    </div>
  </header>

  {#if post.cover}
    <figure>
      <Image
        data={{
          ...post.cover.responsiveImage
        }}
      />
      {#if post.cover.responsiveImage.alt}
        <figcaption>{post.cover.responsiveImage.alt}</figcaption>
      {/if}
    </figure>
  {/if}

  <div class="post__body">
    <StructuredText
      data={post.body2}
      components={{
        ImageBlockRecord: ImageBlock,
		  VideoBlockRecord: VideoBlock
	    }}
    />
  </div>

  <footer>
    <br />
    <p>Sincerely,</p>
    <p class="post__signature">Marcello</p>
  </footer>
</article>


<style lang="scss">
  @import '../../styles/shared';

  .post {

    h1 {
      line-height: 1.2;

      @media (min-width: 48em) {
        line-height: 1.2;
      }
    }

    header,
    .post__body,
    footer {
      @include container;
    }

    .post__body,
    footer {
      max-width: var(--text-max-width);
    }

    .post__metadata {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;

      p {
        margin: 0 0 1rem 0;
        padding: 0 .5rem;
        background-color: var(--color-black);
        color: var(--color-white);
      }
    }

    figure {
      margin: calc(2 * var(--text-base-size)) 0;

      img {
        clip-path: polygon(0% 7.61%, 18.65% 3.83%, 51.25% 8.81%, 75.5% 3.24%, 100.12% 9.81%, 99.90% 93.76%, 77.54% 99.91%, 54.52% 99.63%, 28.63% 96.38%, 0% 100%);
      }
    }

    figcaption {
      margin-right: 1rem;
      text-align: right;
      font-size: .8rem;
    }
  }

  .post__body {
    h2 {
      padding: .5rem calc(1 * var(--text-base-size));
      background-color: var(--color-black);
      color: var(--color-white);
    }

    h3 {
      font-family: var(--body-font-family);
      font-weight: 700;
    }

    p a {
      overflow-wrap: break-word;
    }

    video {
      width: 100%;
    }

    code {
      //font-family: monospace;
      font-size: .85rem;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      line-height: 1.5;
      hyphens: none;
    }
  }

  .post__signature {
    font-family: 'BonVivant-Regular', serif;
    font-size: 1.3rem;
  }
</style>
