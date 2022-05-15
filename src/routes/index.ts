import type { RequestHandler } from '@sveltejs/kit';
import { cmsRequest } from '$lib/datocms';
import type { RequestType } from '$lib/datocms';
import { homeQuery } from '../queries/home.query';

export const get: RequestHandler = async () => {
	const graphqlRequest: RequestType = {
		query: homeQuery
	};

	const data = await cmsRequest(graphqlRequest);
	// console.log('DEBUG endpoint: ', data);

	return {
		body: {
			data
		}
	};
};
