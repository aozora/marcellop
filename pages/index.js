import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero'
import About from '@/components/About'
import What from '@/components/What'
import Layout from '@/components/layout'
import { getHomeData, getAllMenu } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'

export default function Index({ homeData, menu }) {
  const [heroData, setHeroData] = useState(undefined);
  const [aboutData, setAboutData] = useState(undefined);
  const [whatido, setWhatido] = useState(undefined);

  useEffect(() => {
    if (homeData) {
      setHeroData({
        hi: homeData.hi,
        heading1: homeData.heading1,
        heading2A: homeData.heading2A,
        heading2B: homeData.heading2B,
        heading2C: homeData.heading2C
      });

      setAboutData({
        aboutHeading: homeData.aboutHeading,
        aboutDescription1: homeData.aboutDescription1,
        aboutDescription2: homeData.aboutDescription2,
        aboutDescription3: homeData.aboutDescription3,
        aboutDescription4: homeData.aboutDescription4,
        aboutPicture: homeData.aboutPicture
      });

      setWhatido({
        heading: homeData.whatidoHeading,
        items: homeData.whatido
      });
    }
  }, [homeData]);

  return (
    <>
      <Layout menu={menu}>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>

        {heroData && <Hero hero={heroData}/>}
        {aboutData && <About about={aboutData}/>}
        {whatido && <What whatido={whatido}/>}
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const homeData = (await getHomeData(preview)) || null;
  const menu = (await getAllMenu(preview) || null);

  return {
    props: { homeData, menu },
  }
}
