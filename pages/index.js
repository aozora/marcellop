import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import What from '@/components/What';
import { getSiteData, getHomeData, getAllMenu } from '@/lib/api';
import Helmet from 'react-helmet';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AppLoader from '@/components/AppLoader';

export default function Index({ isFirstMount, page }) {
  const [heroData, setHeroData] = useState(undefined);
  const [aboutData, setAboutData] = useState(undefined);
  const [whatido, setWhatido] = useState(undefined);
  const [loaded, setLoaded] = useState(false);
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (isClient) {
      setLoaded(true);
    }
  }, [isClient]);

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
    <motion.div exit={{ opacity: 0 }}>
      {isFirstMount && <AppLoader />}

      <Helmet>
        <body className={loaded ? 'home loaded' : 'home'} />
      </Helmet>

      {heroData && <Hero hero={heroData} />}
      {aboutData && <About about={aboutData} />}
      {whatido && <What whatido={whatido} />}
    </motion.div>
  );
}

export async function getStaticProps({ preview = false }) {
  const page = (await getHomeData(preview)) || null;
  const menu = (await getAllMenu(preview)) || null;
  const site = (await getSiteData(preview)) || null;

  return {
    props: {
      site,
      page,
      menu
    }
  };
}
