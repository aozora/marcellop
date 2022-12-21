import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';

/** @type {import("vite").UserConfig} */
const config = {
	// optimizeDeps: {
	// 	include: ['highlight.js/lib/core']
	// },
	ssr: {
		noExternal: ['three']
	},
	resolve: {
		alias: {
			// $lib: path.resolve('./src/lib'),
			$components: path.resolve('./src/lib/components')
		}
	},
	plugins: [
		sveltekit()
		// {
		// 	// ...threeMinifier(),
		// 	enforce: 'pre'
		// }
	]
};

export default config;
