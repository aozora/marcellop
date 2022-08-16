import type { PageServerLoad } from './$types';
import { cmsRequest } from '$lib/datocms';
import type { RequestType } from '$lib/datocms';
import { homeQuery } from '../queries/home.query';

export const load: PageServerLoad = async () => {
	const graphqlRequest: RequestType = {
		query: homeQuery
	};

	const data = await cmsRequest(graphqlRequest);

	return {
		...data
	};
};
