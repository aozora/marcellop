<script lang="ts">
import SvelteSeo from "svelte-seo";
import type { PageLink, SeoMetaTagType } from "../types";
import usePageLink from "../hooks/usePageLink";

type GlobalSeo = {
  siteName?: string;
  titleSuffix?: string;
  twitterAccount?: string;
  facebookPageUrl?: string;
};

interface LinkTag {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
  color?: string;
  keyOverride?: string;
}


export let siteSeo: GlobalSeo;
export let pageLink: PageLink;
export let metaTags: Array<SeoMetaTagType>;
export let canonicalUrl: string;

const { getLinkProps } = usePageLink();
const link = getLinkProps(pageLink, null);

/**
 * Get Title
 */
const getTitle = (): string | null => {
  if (!metaTags) {
    return "";
  }

  const tag: SeoMetaTagType | undefined = metaTags.find(t => t.tag === "title");
  return tag ? tag.content : siteSeo.siteName;
};

/**
 * Extract the description from the metatags
 */
const getDescription = (): string | null => {
  if (!metaTags) {
    return "";
  }

  const tag: SeoMetaTagType | undefined = metaTags.find(
    t => t.tag === "meta" && t.attributes?.name === "description"
  );

  return tag ? tag.attributes?.content : "";
};

</script>

<SvelteSeo
  title={getTitle()}
  description={getDescription()}
/>
