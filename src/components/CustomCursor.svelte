<script>
import { spring } from 'svelte/motion';

let coords1 = spring(
	{
		x: 0,
		y: 0
	},
	{
		stiffness: 0.05,
		damping: 0.25
	}
);

let coords2 = spring(
	{
		x: 0,
		y: 0
	},
	{
		stiffness: 0.1,
		damping: 0.35
	}
);

let size = spring(32);

</script>

<svelte:window
	on:mousemove={(e) => {
		coords1.set({ x: e.clientX, y: e.clientY })
		coords2.set({ x: e.clientX, y: e.clientY })
	}}
	on:mousedown={(e) => {
		size.set(48);
	}}
	on:mouseup={(e) => {
		size.set(32);
	}}
/>

<svg
	class="custom-cursor"
>
	<circle cx={$coords1.x} cy={$coords1.y} r={$size} fill="var(--color-pantone)" stroke-width="1" fill-opacity="1" />
<!--	<circle cx={$coords2.x} cy={$coords2.y} r={$size/4} fill="var(&#45;&#45;color-pantone)" />-->
</svg>

<style>
  :global(body) {
    cursor: none;
  }

  .custom-cursor {
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
    width: 100vw;
    height: 100vh;
		mix-blend-mode: screen;
		z-index: 10;
  }
</style>
