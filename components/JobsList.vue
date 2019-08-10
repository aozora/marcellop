<template>
  <div>
    <article v-for="(job, index) in jobs" :key="index">
      <header>
        <h3>{{ job.title }}</h3>
        <div v-html="job.description"></div>
      </header>
    </article>
  </div>
</template>

<script>
export default {
  name: 'JobsList',

  props: {
    jobs: {
      required: true,
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

