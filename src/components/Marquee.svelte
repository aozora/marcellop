<script lang="ts">
	interface Props {
		inverted?: boolean;
		children?: import('svelte').Snippet;
	}

	let { inverted = false, children }: Props = $props();
</script>

<section class="marquee">
	<div class="marquee-wrapper">
		<div class="marquee-inner" style:animation-name={inverted ? 'marquee-inverted' : 'marquee'}>
			{@render children?.()}
			{@render children?.()}
		</div>
	</div>
</section>
