<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error"/>
  </div>
</template>

<script>
import error404 from '~/components/error/Error404';
import error500 from '~/components/error/Error500';

export default {
  name: 'NuxtError',
  layout: 'default', // optional

  props: {
    error: {
      type: Object,
      default: () => {
      },
    },
  },

  computed: {
    errorPage() {
      if (this.error.statusCode === 404) {
        return error404;
      }
      // catch everything else
      return error500;
    },
  }
};
</script>
