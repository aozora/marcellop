import type { PageServerLoad } from './$types';
import { cmsRequest } from '$lib/datocms';
import type { RequestType } from '$lib/datocms';
import { postBySlugQuery } from '../../../queries/post-by-slug.query';

export const load: PageServerLoad = async ({ params }) => {
	const graphqlRequest: RequestType = {
		query: postBySlugQuery,
		variables: {
			slug: params.slug
		}
	};

	const data = await cmsRequest(graphqlRequest);

	return {
		...data
	};
};
