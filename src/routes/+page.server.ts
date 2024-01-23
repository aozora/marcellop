import type { PageServerLoad } from './$types';
import type { RequestType } from '$lib/datocms';
import { cmsRequest } from '$lib/datocms';
import { homeQuery } from '../queries/home.query';
import { getDomainUrl } from '$lib/helpers';

export const load: PageServerLoad = async ({ request }) => {
	const graphqlRequest: RequestType = {
		query: homeQuery
	};

	const domainUrl = getDomainUrl(request);

	const data = await cmsRequest(graphqlRequest);

	return {
		...data,
		domainUrl
	};
};
