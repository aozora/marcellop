import type { PageServerLoad } from './$types';
import { cmsRequest } from '$lib/datocms';
import type { RequestType } from '$lib/datocms';
import { resumeQuery } from '../../queries/resume.query';

export const load: PageServerLoad = async () => {
	const graphqlRequest: RequestType = {
		query: resumeQuery
	};

	const data = await cmsRequest(graphqlRequest);
	// console.log('DEBUG endpoint: ', data);

	return {
		...data
	};
};
