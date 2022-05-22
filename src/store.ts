import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { MenuItem } from './lib/types';

export const menuItems: Writable<MenuItem[]> = writable([]);
