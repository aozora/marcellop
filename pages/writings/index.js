import React from 'react';
import {
  getSiteData, getAllPosts, getAllMenu
} from '@/lib/api';

import Layout from '@/components/layout';
import Head from 'next/head';
import { CMS_NAME } from '@/lib/constants';
import PostAbstract from '@/components/PostAbstract';

export default function Writings({ site, page, menu }) {
  return (
    <Layout site={site} page={page} menu={menu}>
      <Head>
        <title>
          {CMS_NAME}
        </title>
      </Head>
      <section className="posts">
        <h1>Writings</h1>

        <div>
          {
            page && page.map((post) => <PostAbstract key={post.id} post={post} />)
            // <!--      <div class="posts__pagination">-->
            //   <!--        <a href="#">Older entries</a>-->
            //   <!--        <a href="#">Newer entries</a>-->
            //   <!--      </div>-->
          }
        </div>

        {!page && (
          <div>
            <p className="sorry">Nothing new here, please come back later...</p>
          </div>
        )}
      </section>
    </Layout>
  );
}

export async function getStaticProps({ preview = false }) {
  const page = (await getAllPosts(preview)) || null;
  const menu = (await getAllMenu(preview) || null);
  const site = (await getSiteData(preview) || null);

  return {
    props: {
      site,
      page,
      menu
    }
  };
}