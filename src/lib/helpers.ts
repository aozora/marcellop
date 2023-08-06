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
