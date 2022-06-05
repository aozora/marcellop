<script>
/**
 * Image block to be used in DatoCMS Structured Text field or Modular field
 *
 */
import { Image } from "svelte-datocms";

/**
 * PROPS
 */
export let image;
</script>

<Image
  data={{
    ...image.responsiveImage
  }}
/>
