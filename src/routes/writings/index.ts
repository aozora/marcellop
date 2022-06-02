import type { RequestHandler } from '@sveltejs/kit';
import { cmsRequest } from '$lib/datocms';
import type { RequestType } from '$lib/datocms';
import { postsQuery } from '../../queries/posts.query';

export const get: RequestHandler = async () => {
	const graphqlRequest: RequestType = {
		query: postsQuery
	};

	const data = await cmsRequest(graphqlRequest);

	return {
		body: {
			data
		}
	};
};
