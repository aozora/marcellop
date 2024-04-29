<script lang="ts">

type PageProps = {
	tati: {
		id:string
		title:string
		intro:string
	}
}


/**
 * PROPS
 */
export let data: PageProps;
let { tati }: PageProps = data;
</script>

<section class="tati">
	<h1>{tati.intro}</h1>
<!--	<p>Here the specifics of some piece of software or hardware I regularly use.</p>-->

</section>

<style lang="scss">
  @import '../../styles/shared';

  .tati {
    @include container;
  }

</style>
