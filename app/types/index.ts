export type SeoMetaAttribute = {
  name?: string;
  property?: string;
  content?: string;
  href?: string;
  rel?: string;
  sizes?: string;
  type?: string;
};

export declare type SeoMetaTagType = {
  /** the tag for the meta information */
  tag: string;
  /** the inner content of the meta tag */
  content: string | null;
  /** the HTML attributes to attach to the meta tag */
  attributes: SeoMetaAttribute | null;
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
  locales: Array<string>;
};

export type ResponsiveImage = {
  mimeType: string;
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
  };
};

export type Menu = {
  menuItems: [
    {
      title: string;
      url: string;
    }
  ];
};

export type MetaRoot = {
  data: {
    datoQuerySubscription: {
      initialData: {
        site: Site;
        menu: Menu;
      };
    };
  };
};

export type WhatIDo = {
  title: string;
  description: string;
  cover: {
    responsiveImage: ResponsiveImage;
    mimeType: string;
  };
};

export type Home = {
  title: string;
  slug: string;
  heading1: string;
  heading2A: string;
  heading2B: string;
  heading2C: string;
  aboutHeading: string;
  aboutDescription1: string;
  aboutDescription2: string;
  aboutDescription3: string;
  aboutDescription4: string;
  aboutPicture: {
    responsiveImage: ResponsiveImage;
    mimeType: string;
  };
  whatidoHeading: string;
  whatido: Array<WhatIDo>;
  seo: Array<SeoMetaTagType>;
};
