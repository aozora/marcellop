<script lang="ts">
import { scroll, animate } from "motion";
import type { Home } from "../lib/types";
import { browser } from "$app/env";

export let home: Home;

// const isClient = browser === true;
//
// if (isClient) {
//   scroll(
//     animate(".marquee__content", { transform: ["translateX(0)", `translateX(calc(100% + 1rem))`] })
//   );
// }
</script>

<article id="whatido" class="whatido">
  <!--  <h2>{home.whatidoHeading}</h2>-->

  <section class="whatido__items">
    <div class="marquee marquee--fit-content marquee--pos-absolute">
      <ul class="marquee__content">
        {#each home.whatido as item}
          <li>{item.title}</li>
        {/each}
      </ul>

      <ul class="marquee__content" aria-hidden="true">
        {#each home.whatido as item}
          <li>{item.title}</li>
        {/each}
      </ul>
    </div>

    <div class="marquee marquee--reverse marquee--dark marquee--fit-content marquee--pos-absolute">
      <ul class="marquee__content">
        {#each home.whatido as item}
          <li>{item.title}</li>
        {/each}
      </ul>

      <ul class="marquee__content" aria-hidden="true">
        {#each home.whatido as item}
          <li>{item.title}</li>
        {/each}
      </ul>
    </div>

  </section>
</article>

<style lang="scss">
  @import '../styles/shared';

  .whatido {

  }

  .marquee {
    --gap: 1rem;
    display: flex;
    overflow: hidden;
    user-select: none;
    gap: var(--gap);
    //max-width: fit-content;
  }

  .marquee__content {
    flex-shrink: 0;
    display: flex;
    justify-content: flex-start;
    min-width: 100%;
    gap: 5rem;
  }

  @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - var(--gap)));
    }
  }

  /* Pause animation when reduced-motion is set */
  @media (prefers-reduced-motion: reduce) {
    .marquee__content {
      animation-play-state: paused !important;
    }
  }

  /* Enable animation */
  .marquee__content {
    animation: scroll 10s linear infinite;
  }

  /* Reverse animation */
  .marquee--reverse .marquee__content {
    animation-direction: reverse;
  }

  .marquee:hover .marquee__content {
    animation-play-state: paused;
  }

  /* Attempt to size parent based on content. Keep in mind that the parent width is equal to both content containers that stretch to fill the parent. */
  //.marquee--fit-content {
  //  max-width: fit-content;
  //}

  /* A fit-content sizing fix: Absolute position the duplicate container. This will set the size of the parent wrapper to a single child container. Shout out to Olavi's article that had this solution 👏 @link: https://olavihaapala.fi/2021/02/23/modern-marquee.html  */
  .marquee--pos-absolute .marquee__content:last-child {
    position: absolute;
    top: 0;
    left: 0;
  }

  /* Enable position absolute animation on the duplicate content (last-child) */
  .marquee--pos-absolute .marquee__content:last-child {
    animation-name: scroll-abs;
  }

  @keyframes scroll-abs {
    from {
      transform: translateX(calc(100% + var(--gap)));
    }
    to {
      transform: translateX(0);
    }
  }

  .marquee__content {
    ul, li {
      list-style-type: none;
      max-width: none;
      margin: 0;
      padding: 0;
    }

    li {
      color: var(--color-black);

      @media (min-width: 64em) {
        font-size: 220px;
        text-transform: uppercase;
      }
    }
  }

  .marquee--dark {
    //.marquee__content {
    background-color: var(--color-black);
    //}

    li {
      color: var(--color-white);
    }
  }

</style>
