import { vitePreprocess } from "@astrojs/svelte";

export default {
  preprocess: vitePreprocess({
    // remove the sass deprecation warning https://sass-lang.com/documentation/breaking-changes/legacy-js-api/#bundlers
    sass: {
      api: "modern-compiler",
    },
  }),
};
