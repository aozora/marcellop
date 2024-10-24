<script lang="ts">
import { Canvas } from "@threlte/core";
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<div class="canvas-container">
  <Canvas shadows>
    {@render children?.()}
  </Canvas>
</div>
