import React from 'react';
import { motion } from 'framer-motion';
import { getSiteData, getAllPosts, getAllMenu } from '@/lib/api';
import PostAbstract from '@/components/PostAbstract';
import { generateRSS } from '@/lib/rss-utils';
import { motionVariants } from '@/lib/helpers';
import { useRouter } from 'next/router';

export default function Writings({ site, page, menu }) {
  const router = useRouter();

  return (
    <motion.section
      key={router.route}
      initial="pageInitial"
      animate="pageAnimate"
      variants={motionVariants}
      className="posts"
    >
      <h1>Writings</h1>

      <div>
        {
          page && page.map(post => <PostAbstract key={post.id} post={post} />)
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
    </motion.section>
  );
}

export async function getStaticProps({ preview = false }) {
  const page = (await getAllPosts(preview)) || null;
  const menu = (await getAllMenu(preview)) || null;
  const site = (await getSiteData(preview)) || null;

  console.log(page);

  await generateRSS(page);

  return {
    props: {
      site,
      page,
      menu
    }
  };
}
