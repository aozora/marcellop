import type { PageServerLoad } from './$types';
import { cmsRequest } from '$lib/datocms';
import type { RequestType } from '$lib/datocms';
import { postsQuery } from '../../queries/posts.query';

export const load: PageServerLoad = async () => {
	const graphqlRequest: RequestType = {
		query: postsQuery
	};

	const data = await cmsRequest(graphqlRequest);

	return {
		data
	};
};
