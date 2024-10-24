import type { LayoutServerLoad } from './$types';
import { cmsRequest, type RequestType } from '$lib/datocms';
import { commonQuery } from '$queries/_common.query';


export const prerender = true;
export const ssr = false;

export const load: LayoutServerLoad = async () => {
	const graphqlRequest: RequestType = {
		query: commonQuery,
		preview: false // TODO
	};

	const data = await cmsRequest(graphqlRequest);

	return {
		...data
	};
};
