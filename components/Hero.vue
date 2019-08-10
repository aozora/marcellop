<template>
  <section class="hero">
    <p class="hi">{{ hi }}</p>
    <h1>{{ heading1Splitted[0] }} {{ heading1Splitted[1] }}</h1>

    <p>
      <span>{{ heading2A }}</span>
      <span>{{ heading2B }}</span>
      <span>{{ heading2C }}</span>
    </p>
  </section>
</template>

<script>
// import gql from 'graphql-tag';

export default {
  name: 'Hero',

  props: {
    hi: {
      required: true,
      type: String,
      default: ''
    },
    heading1: {
      required: true,
      type: String,
      default: ''
    },
    heading2A: {
      required: true,
      type: String,
      default: ''
    },
    heading2B: {
      required: true,
      type: String,
      default: ''
    },
    heading2C: {
      required: true,
      type: String,
      default: ''
    }
  },

  computed: {

    heading1Splitted() {
      if (this.heading1 && this.heading1.length > 0) {
        return this.heading1.split(' ');
      }

      return ['', ''];
    }
  }
};
</script>
