export const getPublishedDateFormatted = (date: string) => {
	const d = new Date(date); // , 'MMMM do yyyy');
	return d.toLocaleDateString('en', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
};

export const getPublishedDateShort = (date: string) => {
	const d = new Date(date);
	return d.toLocaleDateString('en', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});
};

export function getDomainUrl(request: Request) {
	const host =
		request.headers.get('X-Forwarded-Host') ??
		request.headers.get('host') ??
		new URL(request.url).host;
	const protocol = host.includes('localhost') ? 'http' : 'https';
	return `${protocol}://${host}`;
}
