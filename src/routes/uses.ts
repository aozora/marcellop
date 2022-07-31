import type { RequestHandler } from '@sveltejs/kit';
import { cmsRequest } from '$lib/datocms';
import type { RequestType } from '$lib/datocms';
import { usesQuery } from '../queries/uses.query';

export const GET: RequestHandler = async () => {
	const graphqlRequest: RequestType = {
		query: usesQuery
	};

	const data = await cmsRequest(graphqlRequest);
	// console.log('DEBUG endpoint: ', data);

	return {
		body: {
			data
		}
	};
};
