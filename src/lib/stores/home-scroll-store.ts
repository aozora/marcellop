import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const aboutSectionIsInView: Writable<boolean> = writable(false);
export const whatSectionIsInView: Writable<boolean> = writable(false);
