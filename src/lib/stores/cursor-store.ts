import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export type ClientXY = {
	x: number;
	y: number;
};

export const cursorPosition: Writable<ClientXY> = writable({ x: 0, y: 0 });
