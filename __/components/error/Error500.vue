<template>
  <div class="error-404">
    <h1>Sorry,</h1>
    <p>an unexpected error occured.</p>
  </div>
</template>

<script>
export default {
  name: 'Error500',
  props: {
    error: {
      type: Object,
      default: () => {
      },
    },
  },
};
</script>

