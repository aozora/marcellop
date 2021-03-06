import React, { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import About from '@/components/About';
import What from '@/components/What';
import { getSiteData, getHomeData, getAllMenu } from '@/lib/api';
import Helmet from 'react-helmet';
import { motionVariants } from '@/lib/helpers';

export default function Index({ site, page, menu }) {
  const [heroData, setHeroData] = useState(undefined);
  const [aboutData, setAboutData] = useState(undefined);
  const [whatido, setWhatido] = useState(undefined);
  // const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (isClient) {
      setLoaded(true);
    }
  });

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
