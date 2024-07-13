<script lang="ts">
export let inverted = false;
</script>

<section class="marquee">
	<div class="marquee-wrapper">
		<div class="marquee-inner" style:animation-name={inverted ? 'marquee-inverted' : 'marquee'}>
			<slot />
			<slot />
		</div>
	</div>
</section>
