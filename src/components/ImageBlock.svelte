<script>
/**
 * Image block to be used in DatoCMS Structured Text field or Modular field
 *
 */
import { Image } from "svelte-datocms";


  /**
   * @typedef {Object} Props
   * @property {any} image - PROPS
   */

  /** @type {Props} */
  let { image } = $props();
</script>

<Image
  data={{
    ...image.responsiveImage
  }}
/>
