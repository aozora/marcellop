export type RequestType = {
	query: string;
	variables?: any;
	preview?: boolean;
};

export async function cmsRequest({ query, variables, preview }: RequestType): Promise<any | null> {
	const endpoint = 'https://graphql.datocms.com';

	// if (import.meta.env.VITE_DATOCMS_ENVIRONMENT) {
	// 	endpoint += `/environments/${import.meta.env.VITE_DATOCMS_ENVIRONMENT}`;
	// }
	//
	// if (preview) {
	// 	endpoint += `/preview`;
	// }

	// // eslint-disable-next-line no-console
	// console.log(endpoint);
	// // eslint-disable-next-line no-console
	// console.log(import.meta.env.VITE_DATOCMS_API_TOKEN);

	const res = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			accept: 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_DATOCMS_API_TOKEN}`,
			'X-Environment': import.meta.env.VITE_DATOCMS_ENVIRONMENT,
			'X-Include-Drafts': String(preview)
		},
		body: JSON.stringify({
			query,
			variables
		})
	});
	const json = await res.json();

	if (json.errors) {
		console.error('Ouch! The query has some errors!', json.errors);
		throw json.errors;
	}

	return json.data;
}
