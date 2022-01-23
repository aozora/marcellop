// import { SeoMetaTagType, StructuredTextGraphQlResponse } from 'react-datocms';
import type {
  StructuredText as StructuredTextGraphQlResponse
} from 'datocms-structured-text-utils';

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

export type MetaAttribute = {
  sizes: string,
  type: string,
  rel: string,
  href: string,
}

export type Meta = {
  attributes: Array<MetaAttribute>
  content?: string
  tag: string
}

export type Site = {
  favicon: Array<Meta>;
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
  id: string;
  _modelApiKey: string;
  title: string;
  slug: string;
  canonical: string;
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
  seo: Array<Meta>;
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

export type ResumeJob = {
  id: string;
  title: string;
  from: string;
  to: string;
  company: string;
  description: string;
  seo: Array<Meta>;
};

export type Use = {
  id: string;
  title: string;
  description: string;
  seo: Array<Meta>;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  category: string;
  body: string;
  body2: StructuredTextGraphQlResponse<any>;
  cover: ResponsiveImage;
  seo: Array<Meta>;
  publishedAt: string;
};
