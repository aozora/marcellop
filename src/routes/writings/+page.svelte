<script lang="ts">
import type { Menu, Site } from "$lib/types";
import { menuItems } from "../../lib/stores/menu-store";
import type { Post } from "$lib/types";
import { getPublishedDateFormatted, getPublishedDateShort } from "../../lib/helpers.js";

export type PostsProps = {
  site: Site,
  menu: Menu,
  allPosts: Array<Post>;
}


/**
 * PROPS
 */
export let data: PostsProps;
let { site, menu, allPosts }: PostsProps = data;

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

<section class="posts">
  <h1>Writings</h1>

  <div>
    {#if allPosts}
      {#each allPosts as post}
        <article
          aria-labelledby={`aria-article-${post.id}`}
          class="post"
        >
          <header>
            <h2 id={`aria-article-${post.id}`}>
              <a href={`/writings/${post.slug}`}>
                {post.title}
              </a>
            </h2>
          </header>

          <div class="post__metadata">
            <span>Posted in &nbsp;</span>

            {#if post.category}
              <p>
                <span>{post.category}</span>
              </p>
            {/if}
            <span>&nbsp; on &nbsp;</span>
            <p>
              <time datetime={getPublishedDateShort(post.publishedAt)}>
                {getPublishedDateFormatted(post.publishedAt)}
              </time>
            </p>
          </div>
        </article>
      {/each}
    {/if}
  </div>

  {#if !allPosts}
    <div>
      <p class="sorry">Nothing new here, please come back later...</p>
    </div>
  {/if}
</section>


<style lang="scss">
  @import '../../styles/shared';

  .posts {
    @include container;
    max-width: var(--text-max-width);
    padding: 0 1rem;
  }

  .post {
    margin: 0 0 3rem 0;

    h2 {
      margin: 0 0 1rem 0;
      background-color: var(--color-white);
      color: var(--color-primary);
    }

    a {
      font-weight: 400;
      font-family: var(--heading-font-family);
      font-size: inherit;
      line-height: inherit;
    }
  }

  .post__metadata {
    display: flex;
    justify-content: flex-start;
    align-content: center;

    p {
      margin-bottom: 0;
    }
  }
</style>
