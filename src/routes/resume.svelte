<script lang="ts">
import type { Menu, SeoMetaTagType, Site } from "$lib/types";
import { menuItems } from "../store";
import type { ResumeJob } from "$lib/types";
import Seo from "../components/Seo.svelte";

export type ResumeProps = {
  site: Site,
  menu: Menu,
  allResumeJobs: Array<ResumeJob>
}


/**
 * PROPS
 */
export let data: ResumeProps;
let { site, menu, allResumeJobs }: ResumeProps = data;


// write the menuItems store with the data form the page endpoint
// the Header component will use that.
menuItems.update(() => {
  return menu.menuItems;
});

/**
 * State
 */
// const metaTags: Array<SeoMetaTagType> = home && home.seo ? home.seo.concat(site.favicon) : [];

const getYear = date => {
  const d = new Date(date);
  return d.getFullYear();
};

</script>

<section class="resume">
  <h1>Resume</h1>

  <!--{allResumeJobs && allResumeJobs.map(job => <Job job={job} key={job.id} />)}-->
  {#each allResumeJobs as job}
    <article>
      <header>
        <h3>{`${job.title} @ ${job.company}`}</h3>
      </header>
      <p class="job__date">
        <span>{`${getYear(job.from)} - `}</span>
        {#if job.to}<span>{getYear(job.to)}</span>{/if}
        {#if !job.to}<span>present</span>{/if}
      </p>
      <p class="job__description">{@html job.description}</p>
    </article>
  {/each}
</section>

<style lang="scss">
  @import '../styles/shared';

  .resume {
    @include container;

    article {
      position: relative;
      margin: 0 0 3rem 0;

      @media (min-width: 48em) and (max-width: 64em) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto auto;
        grid-template-areas: ". title title" "date desc desc";
      }
      @media (min-width: 64em) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: auto auto;
        grid-template-areas: ". title title ." "date desc desc .";
      }

      header {
        @media (min-width: 48em) {
          grid-area: title;
        }
      }

      h3 {
        --h3-font-size-min: 2;
        --h3-font-size-max: 2.86;
        --text-weight: 500;
        font-family: var(--body-font-family);
        margin-top: 0;
        padding: .5rem 1rem;
        background-color: var(--color-black);
        color: var(--color-white);
      }
    }
  }

  .job__date {
    margin: 0;
    font-family: var(--heading-font-family);
    font-size: 2rem;
    text-align: right;
    color: var(--color-black);

    @media (min-width: 48em) {
      grid-area: date;
      align-self: start;
      justify-self: start;
      margin-left: 2rem;
      transform: rotate(180deg);
      font-size: 3rem;
      //width: 100%;
      writing-mode: vertical-lr;
    }
  }

  .job__description {
    @media (min-width: 48em) {
      grid-area: desc;
    }
  }
</style>
