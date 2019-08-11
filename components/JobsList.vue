<template>
  <div>
    <article v-for="(job, index) in jobs" :key="index">
      <header>
        <h3>{{ job.title }} @ {{ job.company }}</h3>
      </header>
      <p class="job__date">
        <span>{{ getYear(job.from) }} - </span>
        <span v-if="job.to">{{ getYear(job.to) }}</span>
        <span v-else>present</span>
      </p>
      <div class="job__description" v-html="job.description"></div>
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
  },

  methods: {
    getYear: function (date) {
      const d = new Date(date);
      return d.getFullYear();
    }
  }
};
</script>

