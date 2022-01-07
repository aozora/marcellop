import React, { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import About from '@/components/About';
import What from '@/components/What';
import { getSiteData, getHomeData, getAllMenu } from '@/lib/api';
import Helmet from 'react-helmet';
import { Canvas } from '@react-three/fiber';
import HeroAbstract from '@/components/HeroAbstract';

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const HeroAbstract = dynamic(() => import('@/components/HeroAbstract'), {
//   ssr: false
// });

export default function Index({ /* isFirstMount, */ page }) {
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
    <>
      <Helmet>
        <body className={loaded ? 'home loaded' : 'home'} />
      </Helmet>

      {isClient && (
        <Suspense fallback={null}>
          <HeroAbstract />
        </Suspense>
      )}

      {!isClient && (
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <canvas
            style={{
              display: 'block',
              width: '1121px',
              height: '814px'
            }}
            data-engine="three.js r136"
            width="1121"
            height="814"
          />
        </div>
      )}

      {heroData && <Hero hero={heroData} />}
      {aboutData && <About about={aboutData} />}
      {whatido && <What whatido={whatido} />}
    </>
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
