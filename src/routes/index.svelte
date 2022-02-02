<script context="module" lang="ts">
import { homeQuery } from "../queries/home.query";
import type { RequestType } from "$lib/datocms";
import { request } from "$lib/datocms";
import type { Load } from "@sveltejs/kit";
// import type { MenuItem, Site, Home } from '../types';
import { menu } from "../store";


export const load: Load = async ({ fetch }) => {
  const graphqlRequest: RequestType = {
    query: homeQuery
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

<script lang="ts">

import type { Home, MenuItem, Site } from "../types";

export type HomeProps = {
  site: Site,
  menu: {
    menuItems: Array<MenuItem>
  },
  home: Home
}

/**
 * Props
 */
export let data: HomeProps;

menu.update(() => {
  console.log(data)
  return data.menu.menuItems
});

/**
 * State
 */
// const heroData:HeroData = {
//   hi: data.home.hi,
//   heading1: data.home.heading1,
//   heading2A: data.home.heading2A,
//   heading2B: data.home.heading2B,
//   heading2C: data.home.heading2C
// }

</script>

<section class="hero">
  <h1>
    {data.home.heading1}
    <br />
    Design Engineer
  </h1>

  <!--{/*<p>*/}-->
  <!--{/*  <span>{heading2A}</span>*/}-->
  <!--{/*  <span>{heading2B}</span>*/}-->
  <!--{/*  <span>{heading2C}</span>*/}-->
  <!--{/*</p>*/}-->
</section>
