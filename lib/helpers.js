import { format } from 'date-fns';

export const getPublishedDateFormatted = (date) => format(new Date(date), 'MMMM do yyyy');

export const getPublishedDateShort = (date) => format(new Date(date), 'yyyy-MM-dd');
