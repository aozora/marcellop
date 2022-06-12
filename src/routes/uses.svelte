<script lang="ts">
import type { Menu, Site, Use } from "$lib/types";
import { menuItems } from "../lib/stores/menu-store";

export type UsesProps = {
  site: Site,
  menu: Menu,
  allUses: Array<Use>
}


/**
 * PROPS
 */
export let data: UsesProps;
let { site, menu, allUses }: UsesProps = data;


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

<section class="uses">
  <h1>Uses</h1>
  <p>Here the specifics of some piece of software or hardware I regularly use.</p>

  {#each allUses as use}
    <article key={use.id} class="uses__use">
      <h2>{use.title}</h2>
      <p class="job__description">{@html use.description}</p>
    </article>
  {/each}
</section>

<style lang="scss">
  @import '../styles/shared';

  .uses {
    @include container;
  }

  .uses__use {
    margin-bottom: calc(2 * var(--text-base-size));

    h2 {
      margin: calc(1 * var(--text-base-size)) 0 calc(1 * var(--text-base-size)) 0;
    }

    ul {
      list-style-type: square;
    }

    li {
      p {
        margin-bottom: 0;
      }
    }
  }
</style>
