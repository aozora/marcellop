<script lang="ts">
  import SvelteSeo from 'svelte-seo';
  // import { OpenGraphImage, TwitterCard } from "svelte-seo/types/SvelteSeo";
  import type { GlobalSeo, PageLink, SeoMetaTagType } from '../types';
  import usePageLink from '../hooks/usePageLink';
  import type { Thing, WithContext } from 'schema-dts';

  /**
   * Props
   */
  export let domainUrl: string;
  export let siteSeo: GlobalSeo;
  export let pageLink: PageLink;
  export let metaTags: Array<SeoMetaTagType>;
  export let canonicalUrl: string;
  export let jsonLd: Thing | WithContext<Thing>;


  const { getLinkProps } = usePageLink();
  const link = getLinkProps(pageLink, null);

  /**
   * Get Title
   */
  const getTitle = (): string | undefined => {
    if (!metaTags) {
      return undefined;
    }

    const tag: SeoMetaTagType | undefined = metaTags.find(t => t.tag === 'title');
    return tag && tag.content ? tag.content : siteSeo.siteName ?? undefined;
  };

  /**
   * Extract the description from the metatags
   */
  const getDescription = (): string | undefined => {
    if (!metaTags) {
      return '';
    }

    const tag: SeoMetaTagType | undefined = metaTags.find(
      t => t.tag === 'meta' && t.attributes?.name === 'description'
    );

    return tag && tag.attributes?.content ? tag.attributes?.content : undefined;
  };

  /**
   * Build the canonical url
   */
  const getCanonical = (): string => {
    let pagePath = link.as.indexOf('/') === 0 ? link.as.substring(1) : link.as;

    if (pagePath === '/') {
      pagePath = '';
    }

    if (!canonicalUrl || canonicalUrl === '') {
      return `${domainUrl}${pagePath}`;
    }

    if (canonicalUrl.indexOf('http') > -1) {
      return canonicalUrl;
    }

    return `${domainUrl}${domainUrl.endsWith('/') ? '' : '/'}${canonicalUrl}`;
  };

  /**
   * FB image
   */
  const getOpenGraphImages = (): any | undefined => {
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
    };
  };


  // const getSiteLocale=(): string | undefined  => {
  //   if (!metaTags) {
  //     return '';
  //   }
  //
  //   const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.property === 'og:locale');
  //
  //   return meta?.attributes?.content || undefined;
  // }
  //
  // const getSiteName=(): string | undefined  => {
  //   if (!metaTags) {
  //     return '';
  //   }
  //
  //   const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.property === 'og:site_name');
  //
  //   return meta?.attributes?.content || undefined;
  // }

  const getTwitterTitle = (): string | undefined => {
    if (!metaTags) {
      return undefined;
    }

    const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.name === 'twitter:title');

    return meta?.attributes?.content || undefined;
  };

  const getTwitterDescription = (): string | undefined => {
    if (!metaTags) {
      return undefined;
    }

    const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.name === 'twitter:description');

    return meta?.attributes?.content || undefined;
  };

  const getTwitterImage = (): string | undefined => {
    if (!metaTags) {
      return undefined;
    }

    const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.name === 'twitter:image');

    return meta?.attributes?.content || undefined;
  };

  const getTwitterImageAlt = (): string | undefined => {
    if (!metaTags) {
      return undefined;
    }

    const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.name === 'twitter:image:alt');

    return meta?.attributes?.content || undefined;
  };

  const getTwitterSite = (): string | undefined => {
    if (!metaTags) {
      return undefined;
    }

    const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.name === 'twitter:site');

    return meta?.attributes?.content || undefined;
  };

  const getTwitterCard = (): 'summary' | 'summary_large_image' | 'player' | 'app' | undefined => {
    if (!metaTags) {
      return undefined;
    }

    const meta = metaTags.find(t => t.tag === 'meta' && t.attributes?.name === 'twitter:card');

    // noinspection TypeScriptValidateTypes
    return meta?.attributes?.content || undefined;
  };


</script>

<SvelteSeo
  title={getTitle()}
  description={getDescription()}
  canonical={getCanonical()},
  twitter={{
    card: getTwitterCard(),
    site: getTwitterSite(),
    title: getTwitterTitle(),
    description: getTwitterDescription(),
    image: getTwitterImage(),
    imageAlt: getTwitterImageAlt(),
  }}
  openGraph={{
    title: getTitle(),
    description: getDescription(),
    url: getCanonical(),
    type: 'website',
    images: [getOpenGraphImages()]
  }}
  jsonLd={jsonLd}
/>
