import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { CommonData } from '$types';

export const commonData: Writable<CommonData> = writable();
