import { SeoMetaTagType } from 'react-datocms';

export type ResponsiveImage = {
  responsiveImage: {
    srcSet: string;
    webpSrcSet: string;
    sizes: string;
    src: string;
    width: number;
    height: number;
    aspectRatio: number;
    alt: string;
    title: string;
    base64: string;
  };
};

export type ResponsiveMedia = {
  id: string;
  width: number;
  height: number;
  mimeType: string;
  title: string;
  alt: string;
  responsiveImage: {
    srcSet: string;
    webpSrcSet: string;
    sizes: string;
    src: string;
    width: number;
    height: number;
    aspectRatio: number;
    alt: string;
    title: string;
    base64: string;
  };
  video: {
    mp4Url: string;
    thumbnailUrl: string;
  };
};

export type GlobalSeo = {
  siteName?: string;
  titleSuffix?: string;
  twitterAccount?: string;
  facebookPageUrl?: string;
};

export type Site = {
  favicon: Array<SeoMetaTagType>;
  globalSeo: GlobalSeo;
};

export type IdSlug = {
  id: string;
  slug: string;
};

export type PageLink = {
  id: string;
  slug: string;
  title?: string;
  _modelApiKey: string;
};

export type MenuItem = {
  id: string;
  title: string;
  url: string;
};

export type Home = {
  hi: string;
  heading1: string;
  heading2A: string;
  heading2B: string;
  heading2C: string;
  aboutHeading: string;
  aboutDescription1: string;
  aboutDescription2: string;
  aboutDescription3: string;
  aboutDescription4: string;
  aboutPicture: ResponsiveImage;
  whatidoHeading: string;
  whatido: Array<WhatidoItem>;
  seo: Array<SeoMetaTagType>;
};

export type HeroData = {
  hi: string;
  heading1: string;
  heading2A: string;
  heading2B: string;
  heading2C: string;
};

export type AboutData = {
  aboutHeading: string;
  aboutDescription1: string;
  aboutDescription2: string;
  aboutDescription3: string;
  aboutDescription4: string;
  aboutPicture: ResponsiveImage;
};

export type WhatidoItem = {
  title: string;
  description: string;
  cover: ResponsiveImage;
};

export type WhatidoData = {
  heading: string;
  items: Array<WhatidoItem>;
};
