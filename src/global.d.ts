/// <reference types="@sveltejs/kit" />

// Ref: https://timdeschryver.dev/blog/environment-variables-with-sveltekit#the-workaround
interface ImportMetaEnv {
	VITE_publicUrl: string;
	VITE_DATOCMS_API_TOKEN: string;
	VITE_DATOCMS_PREVIEW_SECRET: string;
}
