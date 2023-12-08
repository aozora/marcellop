<script lang="ts">
import { Canvas } from "@threlte/core";
import Tati from "./Tati.svelte";

</script>

<footer class="footer">
  <div class="footer-canvas-container">
    <Canvas shadows>
      <Tati/>
    </Canvas>
  </div>

  <nav class="menu__social">
    <ul>
      <li>
        <a rel="noopener noreferrer" target="_blank" href="https://www.twitter.com/marcellopalmit">
          X (Twitter)
        </a>
      </li>

      <li>
        <a rel="noopener noreferrer" target="_blank" href="https://it.linkedin.com/in/marcellopalmitessa">
          LinkedIn
        </a>
      </li>
    </ul>
  </nav>

  <p class="footer__copyright">&copy;{new Date().getFullYear()} Copyright Marcello Palmitessa. All rights reserved.</p>
  <p class="footer__credits">
    This site is built with&nbsp;
    <a target="_blank" rel="noopener noreferrer" href="https://svelte.dev/">
      Svelte and SvelteKit
    </a>
    &nbsp;and hosted on&nbsp;
    <a target="_blank" rel="noopener noreferrer" href="https://vercel.com/">
      Vercel
    </a>
    . The source code is hosted on&nbsp;
    <a target="_blank" rel="noopener noreferrer" href="https://github.com/aozora/marcellop">
      GitHub
    </a>
    .
  </p>
</footer>

<style lang="scss">
  @import '../styles/shared';

  .footer {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 200px auto auto auto;
    grid-gap: 1rem;
    grid-template-areas: "canvas" "social" "copyright" "credits";
    @include container;
    margin: 6rem auto 0 auto;
  }

  .footer-canvas-container {
    position: relative;
    grid-area: canvas;
    width: 100%;
    height: 100%;
  }

  .menu__social {
    grid-area: social;

    ul {
      list-style-type: none;
      display: flex;
      justify-content: space-evenly;
      align-items: flex-start;
      gap: 1rem;
      max-width: none;
      height: 1.778rem;
      margin: 0 0 3rem 0;
      padding: 0;
    }

    span {
      @include visuallyhidden;
    }

    a {
      display: block;
      //width: 1.778rem;
      height: 1.778rem;
      padding: .2rem;
      color: var(--theme-foreground);

      &:hover,
      &:focus,
      &:active {
        color: var(--theme-brand);
        border-color: var(--theme-brand);
      }
    }
  }

  .footer__copyright {
    grid-area: copyright;
    margin: 0 auto 2rem auto;
    padding: 0 1rem;
    font-size: .888rem;
    color: var(--theme-foreground);
    text-align: center;
  }

  .footer__credits {
    grid-area: credits;
    margin: 0 auto 2rem auto;
    padding: 0 1rem;
    font-size: .778rem;
    color: var(--theme-foreground);
    text-align: center;

    a {
      font-size: inherit;
      color: var(--theme-foreground);
    }
  }

</style>
