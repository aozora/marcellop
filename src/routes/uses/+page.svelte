<script lang="ts">

import type { Use } from '$types';
import { commonData } from '$lib/store';

type UsesProps = {
	allUses: Array<Use>
}


/**
 * PROPS
 */
export let data: UsesProps;
let { allUses }: UsesProps = data;
</script>

<section class="uses">
	<h1>Uses</h1>
	<p>Here the specifics of some piece of software or hardware I regularly use.</p>

	{#each allUses as use}
		<article class="uses__use">
			<h2>{use.title}</h2>
			<p class="job__description">{@html use.description}</p>
		</article>
	{/each}
</section>

<style lang="scss">
  @import '../../styles/shared';

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
