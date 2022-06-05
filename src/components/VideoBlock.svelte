<script lang="ts">
  /**
  * Video block to be used in DatoCMS Structured Text field or Modular field
  *
  */

  /**
   * PROPS
   */
  export let video;
</script>

<video controls src={video.url} />
