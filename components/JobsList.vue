<template>
  <div>
    <article v-for="(job, index) in jobs" :key="index">
      <header>
        <p>
          <span>{{ getYear(job.from) }}</span>
          <span v-if="job.to">{{ getYear(job.to) }}</span>
          <span v-else>present</span>
        </p>
        <h3>{{ job.title }} @ {{ job.company }}</h3>
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
      type: Object,
      default: () => {
        return undefined;
      }
    }
  },

  methods: {
    getYear: function (date) {
      const d = new Date(date);
      return d.getFullYear();
    }
  }
};
</script>

