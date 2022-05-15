import type { PageLink } from '../lib/types';

export type LinkProps = {
	href: string;
	as: string;
};

/**
 * Custom hook that given a PageLink will return an object to be destructured with the next Link component
 * Usage:
 *  const { getLinkProps } = usePageLink();
 *  <Link {...getLinkProps(pageLink, externalUrl)}>
 *
 */
function usePageLink() {
	// const { allModularPages /*, allEditorialPages, allPosts*/ } = usePageState();

	const getLinkProps = (pageLink: PageLink, externalUrl: string): LinkProps => {
		let linkProps = {
			href: '/',
			as: '/'
		};

		// check the page links
		if (pageLink) {
			switch (pageLink._modelApiKey) {
				case 'home':
					linkProps = {
						href: '/',
						as: '/'
					};
					break;

				default:
					break;
			}
		}

		return linkProps;
	};

	return {
		getLinkProps
	};
}

export default usePageLink;
