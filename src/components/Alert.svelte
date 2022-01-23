<script lang='ts'>
export let preview = false;
</script>

<aside class='alert'>
  {#if preview}
    This is page is a preview.&nbsp;
    <!--<Link href='/api/exit-preview'>-->
    <a>Click here</a>
    <!--< /Link>-->
    &nbsp;to exit preview mode.
  {/if}

  {#if !preview}
    This is page is showing published content.&nbsp;
    <!--<Link href='/api/preview'>-->
    <a>Click here</a>
    <!-- < /Link>-->
    &nbsp;to enter preview mode!
  {/if}
</aside>


<style lang='scss'>
  .alert {
    position: fixed;
    top: 0;
    left: 0;
    right: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 2rem);
    height: 1.2rem;
    margin: 0 1rem;
    padding: 0 1rem;
    border-radius: 4px;
    font-size: 0.7rem;
    background-color: var(--token-color-basic-6);
    color: var(--token-color-basic-1);
    z-index: 999;

    a:not([class]):visited,
    a:not([class]):link {
      color: var(--token-color-basic-1);

      &:hover {
        color: var(--token-color-basic-6);
      }
    }
  }
</style>
