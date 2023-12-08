<a href="#main" tabIndex={0} class='skiplink'>
  Skip to main content
</a>

<style lang='scss'>
  @import '../styles/shared';

  .skiplink {
    position: absolute;
    top: 0;
    right: 100%; /* moves off screen */
    width: 100vw;
    height: var(--menu-height);
    padding: 0 1rem;
    margin: 0;
    background-color: var(--theme-brand);
    font-size: 1.6rem;
    line-height: var(--menu-height);
    color: var(--theme-foreground);
    text-decoration: underline;

    &:focus {
      right: auto;
      z-index: var(--skiplink-zindex);
    }
  }

</style>
