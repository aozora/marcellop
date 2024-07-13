import type { PageServerLoad } from './$types';
import { cmsRequest } from '$lib/datocms';
import type { RequestType } from '$lib/datocms';
import { tatiQuery } from '$queries/tati.query';

export const load: PageServerLoad = async () => {
	const graphqlRequest: RequestType = {
		query: tatiQuery
	};

	const data = await cmsRequest(graphqlRequest);
	// console.log('DEBUG endpoint: ', data);

	return {
		...data
	};
};
