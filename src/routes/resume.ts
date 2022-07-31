import type { RequestHandler } from '@sveltejs/kit';
import { cmsRequest } from '$lib/datocms';
import type { RequestType } from '$lib/datocms';
import { resumeQuery } from '../queries/resume.query';

export const GET: RequestHandler = async () => {
	const graphqlRequest: RequestType = {
		query: resumeQuery
	};

	const data = await cmsRequest(graphqlRequest);
	// console.log('DEBUG endpoint: ', data);

	return {
		body: {
			data
		}
	};
};
