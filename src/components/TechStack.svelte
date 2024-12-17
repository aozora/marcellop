<script lang="ts">
  import type {CollectionEntry} from "astro:content";

  interface Props {
    techStack: Array<CollectionEntry<'techStack'>>;
  }

  let {techStack}: Props = $props();
</script>

<section class="tech-stack">
  <h2>Tech Stack</h2>

  <ul>
    {#each techStack as tech, index}
      <li style="--index: {index}">
        <h3>{tech.data.title}</h3>

        <ul>
          {#each tech.data.items as item}
            <li>
              <strong>{item.title}</strong>
              {#if item.subTitle}<p>{item.subTitle}</p>{/if}
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>

</section>


<style lang="scss">
  @use "../styles/shared" as *;

  .tech-stack {
    @include container;

    h3 {
      margin-bottom: 3rem;
      font-size: 13vw;
      color: var(--theme-foreground);

      @media (max-width: 1023px) {
        margin-top: 0;
        margin-bottom: 2rem;
      }
      @media (min-width: 64em) {
        font-size: 10vw;
      }
    }

    ul, li {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    > ul > li {
      position: sticky;
      top: calc((var(--index) - 1) * 2vh + var(--menu-height));
      width: 100%;
      height: 90vh;
      padding: 3rem 0;
      overflow: hidden;
      background-color: var(--theme-background);
      z-index: var(--index);

      > ul {
        @include container-layout-grid;

        li {
          grid-column: 6/12;
        }
      }
    }


    li {
      strong {
        font-size: 10vw;
        text-transform: uppercase;
        --text-weight: 700;
        color: var(--color-highlight);

        @media (min-width: 64em) {
          font-size: 6vw;
        }

        + p {
          font-size: 4vw;
          text-transform: uppercase;
          --text-weight: 700;
          color: var(--theme-foreground);
        }
      }
    }

  }
</style>
