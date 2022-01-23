import { SeoMetaTagType } from 'react-datocms';
import { NextSeo } from 'next-seo';
import { useMemo } from 'react';
import { MetaTag, OpenGraphMedia } from 'next-seo/lib/types';
import usePageLink from '../hooks/usePageLink';
import { PageLink } from '../../src/types/index';

type GlobalSeo = {
  siteName?: string;
  titleSuffix?: string;
  twitterAccount?: string;
  facebookPageUrl?: string;
};

export type SeoProps = {
  siteSeo: GlobalSeo;
  pageLink: PageLink;
  // slug: string;
  metaTags: Array<SeoMetaTagType>;
  canonicalUrl: string;
};

interface LinkTag {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
  color?: string;
  keyOverride?: string;
}

/**
 * SEO component
 * @param siteSeo
 * @param metaTags
 * @param pageLink
 * @param canonicalUrl
 * @constructor
 */
export const Seo = ({ siteSeo, metaTags, pageLink, canonicalUrl }: SeoProps): JSX.Element => {
  const { getLinkProps } = usePageLink();
  const link = getLinkProps(pageLink, null);

  /**
   * Extract the title from the metatags
   */
  const title: string | null = useMemo(() => {
    if (!metaTags) {
      return '';
    }

    const tag: SeoMetaTagType | undefined = metaTags.find(t => t.tag === 'title');

    return tag ? tag.content : siteSeo.siteName;
  }, [metaTags, siteSeo.siteName]);

  /**
   * Extract the description from the metatags
   */
  const description: string | null = useMemo(() => {
    if (!metaTags) {
      return '';
    }

    const tag: SeoMetaTagType | undefined = metaTags.find(
      t => t.tag === 'meta' && t.attributes?.name === 'description'
    );
    return tag ? tag.attributes?.content : '';
  }, [metaTags]);

  /**
   * Build the canonical url
   */
  const canonical: string = useMemo(() => {
    let pagePath = link.as.indexOf('/') === 0 ? link.as.substring(1) : link.as;

    if (pagePath === '/') {
      pagePath = '';
    }

    if (!canonicalUrl || canonicalUrl === '') {
      return `${process.env.publicUrl}${pagePath}`;
    }

    if (canonicalUrl.indexOf('http') > -1) {
      return canonicalUrl;
    }

    return `${process.env.publicUrl}${process.env.publicUrl.endsWith('/') ? '' : '/'}${canonicalUrl}`;
  }, [canonicalUrl, link]);

  /**
   * FB image
   */
  const ogImage: OpenGraphMedia | undefined = useMemo(() => {
    if (!metaTags) {
      return undefined;
    }

    const imageUrl = metaTags.find(t => t.tag === 'meta' && t.attributes?.property === 'og:image');
    const imageWidth = metaTags.find(t => t.tag === 'meta' && t.attributes?.property === 'og:image:width');
    const imageHeight = metaTags.find(t => t.tag === 'meta' && t.attributes?.property === 'og:image:height');
    const imageAlt = metaTags.find(t => t.tag === 'meta' && t.attributes?.property === 'og:image:alt');

    return {
      url: imageUrl?.attributes?.content,
      width: imageWidth ? parseInt(imageWidth.attributes?.content as string, 10) : undefined,
      height: imageHeight ? parseInt(imageHeight.attributes?.content as string, 10) : undefined,
      alt: imageAlt ? imageAlt.attributes?.content : undefined,
      type: 'image/jpeg'
    } as OpenGraphMedia;
  }, [metaTags]);

  const locale: string | undefined = useMemo(() => {
    if (!metaTags) {
      return '';
    }

    const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.property === 'og:locale');

    return meta?.attributes?.content || undefined;
  }, [metaTags]);

  const siteName: string | undefined = useMemo(() => {
    if (!metaTags) {
      return '';
    }

    const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.property === 'og:site_name');

    return meta?.attributes?.content || undefined;
  }, [metaTags]);

  const ogType: string | undefined = useMemo(() => {
    if (!metaTags) {
      return undefined;
    }

    const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.property === 'og:type');

    return meta?.attributes?.content || undefined;
  }, [metaTags]);

  const twitterCard: string | undefined = useMemo(() => {
    if (!metaTags) {
      return undefined;
    }

    const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.name === 'twitter:card');

    return meta?.attributes?.content || undefined;
  }, [metaTags]);

  const additionalMeta: ReadonlyArray<MetaTag> = useMemo(() => {
    if (!metaTags) {
      return [];
    }

    const additional = metaTags.find(m => m.tag === 'meta' && m.attributes?.property === 'article:modified_time');

    if (!additional) {
      return [];
    }

    return [
      {
        property: 'article:modified_time',
        content: additional.content
      } as MetaTag
    ];
  }, [metaTags]);

  const additionalLinks: ReadonlyArray<LinkTag> = useMemo(() => {
    if (!metaTags) {
      return [];
    }

    const links = metaTags.filter(m => m.tag === 'link');

    if (!links) {
      return [];
    }

    return links.map(link => {
      return {
        href: link.attributes?.href,
        rel: link.attributes?.rel,
        sizes: link.attributes?.sizes,
        type: link.attributes?.type
      } as LinkTag;
    });
  }, [metaTags]);

  return (
    <>
      <NextSeo
        title={title || undefined}
        titleTemplate={''}
        defaultTitle={siteName}
        description={description || undefined}
        canonical={canonical || undefined}
        openGraph={{
          url: canonical,
          title: title || undefined,
          description: description || undefined,
          images: ogImage ? [ogImage] : undefined,
          locale,
          site_name: siteName,
          type: ogType
        }}
        twitter={{
          // handle: '@handle',
          site: siteSeo.twitterAccount,
          cardType: twitterCard
        }}
        additionalMetaTags={additionalMeta}
        additionalLinkTags={additionalLinks}
      />
    </>
  );
};
