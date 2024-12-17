<script lang="ts">
  import type {CollectionEntry} from "astro:content";

  interface Props {
    skills: Array<CollectionEntry<'skills'>>;
  }

  let {skills}: Props = $props();
</script>

<section class="skills">
  <h2>Skills</h2>

  <ul>
    {#each skills as skill, index}
      <li style="--index: {index}">
        <h3>{skill.data.title}</h3>

        <p>{@html skill.body}</p>
      </li>
    {/each}
  </ul>
</section>


<style lang="scss">
  @use "../styles/shared" as *;

  .skills {
    h3 {
      margin-bottom: 3rem;
      font-size: 20vw;
      color: var(--theme-foreground);

      @media (max-width: 1023px) {
        margin-top: 0;
        margin-bottom: 2rem;
      }
      @media (min-width: 64em) {
        font-size: 6vw;
      }
    }

    h3 + p {
      font-size: 5.5vw;
      line-height: 1.3;
      --text-weight: 700;
      color: var(--color-highlight);

      @media (min-width: 64em) {
        font-size: 4vw;
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
      top: var(--menu-height);
      width: 100%;
      height: 90vh;
      padding: 3rem 0;
      overflow: hidden;
      background-color: var(--theme-background);
      z-index: var(--index);
    }

  }
</style>
