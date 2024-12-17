import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

/**
 * Dynamically generate the robots.txt
 * Source: https://docs.astro.build/en/guides/integrations-guide/sitemap/
 * @param site
 * @constructor
 */
export const GET: APIRoute = ({ site }) => {
	const sitemapURL = new URL('sitemap-index.xml', site);
	return new Response(getRobotsTxt(sitemapURL));
};
