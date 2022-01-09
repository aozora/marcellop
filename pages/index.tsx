/* eslint-disable indent */
import React, { Suspense, useEffect, useState } from 'react';
import { QueryListenerOptions, SeoMetaTagType, useQuerySubscription } from 'react-datocms';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import What from '@/components/What/What';
import HeroAbstract from '@/components/HeroAbstract';
import { homeQuery } from '@/queries/home.query';
import { request, RequestType } from '@/lib/datocms';
import { AboutData, HeroData, Home, PageLink, WhatidoData } from '@/types/index';
import { GetStaticProps } from 'next';
import { Seo } from '@/components/Seo';
import { usePageState } from '@/components/PageProvider';

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
// const HeroAbstract = dynamic(() => import('@/components/HeroAbstract'), {
//   ssr: false
// });

export type HomeProps = {
  subscription: QueryListenerOptions<any, any>;
};

export type HomeData = {
  home: Home;
};

export default function Index({ subscription }: HomeProps) {
  // implement client-side updates of the page as soon as the content changes
  // see: https://github.com/datocms/react-datocms/#live-real-time-updates
  const { data } = useQuerySubscription(subscription);
  const { home }: HomeData = data;

  const { site } = usePageState();
  const metaTags: Array<SeoMetaTagType> = home && home.seo && home.seo.concat(site.favicon);

  const [heroData, setHeroData] = useState<HeroData>(undefined);
  const [aboutData, setAboutData] = useState<AboutData>(undefined);
  const [whatido, setWhatido] = useState<WhatidoData>(undefined);
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (home) {
      setHeroData({
        hi: home.hi,
        heading1: home.heading1,
        heading2A: home.heading2A,
        heading2B: home.heading2B,
        heading2C: home.heading2C
      });

      setAboutData({
        aboutHeading: home.aboutHeading,
        aboutDescription1: home.aboutDescription1,
        aboutDescription2: home.aboutDescription2,
        aboutDescription3: home.aboutDescription3,
        aboutDescription4: home.aboutDescription4,
        aboutPicture: home.aboutPicture
      });

      setWhatido({
        heading: home.whatidoHeading,
        items: home.whatido
      });
    }
  }, [home]);

  return (
    <>
      <Seo
        siteSeo={site.globalSeo}
        metaTags={metaTags}
        canonicalUrl={null}
        pageLink={
          {
            id: home.id,
            slug: home.slug,
            _modelApiKey: home._modelApiKey
          } as PageLink
        }
      />

      <div className="canvas-container">
        {isClient && <HeroAbstract />}

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
      </div>

      {heroData && <Hero {...heroData} />}
      {aboutData && <About {...aboutData} />}
      {whatido && <What {...whatido} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  const graphqlRequest: RequestType = {
    query: homeQuery,
    preview
  };

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.DATOCMS_API_TOKEN
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest)
          }
    }
  };
};
