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
