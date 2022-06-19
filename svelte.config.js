import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import path from 'path';
import { threeMinifier } from '@yushijinhun/three-minifier-rollup';

/** @type {import("@sveltejs/kit").Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),

		prerender: {
			default: true
		},

		// config for three.js
		vite: {
			optimizeDeps: {
				include: ['highlight.js/lib/core']
			},
			ssr: {
				noExternal: ['three']
			},
			resolve: {
				alias: {
					$lib: path.resolve('./src/lib'),
					$components: path.resolve('./src/lib/components')
				}
			},
			plugins: [
				{
					...threeMinifier(),
					enforce: 'pre'
				}
			]
		}
	},

	experimental: {
		inspector: false
	},

	compilerOptions: {
		dev: false
	}
};

export default config;
