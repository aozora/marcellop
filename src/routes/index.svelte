<script context='module' lang='ts'>
import { homeQuery } from '../queries/home.query';
import type { RequestType } from '$lib/datocms';
import { request } from '$lib/datocms';
import type { Load } from '@sveltejs/kit';
import type { MenuItem, Site, Home, HeroData } from '../../types';

export type HomeProps = {
  site: Site,
  menu: Array<MenuItem>,
  home: Home
}

export const load: Load = async ({ fetch }) => {
  const graphqlRequest: RequestType = {
    query: homeQuery,
    preview: false // TODO: fix this
  };

  try {
    return {
      props: {
        data: await request(graphqlRequest)
      }
    };
  } catch (error) {
    console.error({ error });
    return {
      status: 500,
      error: error
    };
  }
};
</script>

<script lang='ts'>
import Hero from '../components/Hero.svelte';

/**
 * Props
 */
export let data:HomeProps;

/**
 * State
 */
const heroData:HeroData = {
  hi: data.home.hi,
  heading1: data.home.heading1,
  heading2A: data.home.heading2A,
  heading2B: data.home.heading2B,
  heading2C: data.home.heading2C
}

</script>


<Hero hero={heroData}/>
