import React from 'react';
import {
  getSiteData, getAllPosts, getAllMenu
} from '@/lib/api';
import PostAbstract from '@/components/PostAbstract';
import { generateRSS } from '@/lib/rss-utils';

export default function Writings({ site, page, menu }) {
  return (
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
  );
}

export async function getStaticProps({ preview = false }) {
  const page = (await getAllPosts(preview)) || null;
  const menu = (await getAllMenu(preview) || null);
  const site = (await getSiteData(preview) || null);

  await generateRSS(page);

  return {
    props: {
      site,
      page,
      menu
    }
  };
}
