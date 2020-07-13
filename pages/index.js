import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import What from '@/components/What';
import Layout from '@/components/layout';
import { getSiteData, getHomeData, getAllMenu } from '@/lib/api';
import Head from 'next/head';
import { CMS_NAME } from '@/lib/constants';

export default function Index({ site, page, menu }) {
  const [heroData, setHeroData] = useState(undefined);
  const [aboutData, setAboutData] = useState(undefined);
  const [whatido, setWhatido] = useState(undefined);

  useEffect(() => {
    if (page) {
      setHeroData({
        hi: page.hi,
        heading1: page.heading1,
        heading2A: page.heading2A,
        heading2B: page.heading2B,
        heading2C: page.heading2C
      });

      setAboutData({
        aboutHeading: page.aboutHeading,
        aboutDescription1: page.aboutDescription1,
        aboutDescription2: page.aboutDescription2,
        aboutDescription3: page.aboutDescription3,
        aboutDescription4: page.aboutDescription4,
        aboutPicture: page.aboutPicture
      });

      setWhatido({
        heading: page.whatidoHeading,
        items: page.whatido
      });
    }
  }, [page]);

  return (
    <>
      <Layout site={site} page={page} menu={menu}>
        <Head>
          <title>
            Next.js Blog Example with
            {CMS_NAME}
          </title>
        </Head>

        {heroData && <Hero hero={heroData} />}
        {aboutData && <About about={aboutData} />}
        {whatido && <What whatido={whatido} />}
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const page = (await getHomeData(preview)) || null;
  const menu = (await getAllMenu(preview) || null);
  const site = (await getSiteData(preview) || null);

  return {
    props: { site, page, menu }
  };
}
