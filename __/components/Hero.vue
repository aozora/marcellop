<template>
  <section v-if="hero" class="hero">
    <p v-if="hero.hi" class="hi">{{ hero.hi }}</p>
    <h1>{{ hero.heading1 }}</h1>

    <p>
      <span>{{ hero.heading2A }}</span>
      <span>{{ hero.heading2B }}</span>
      <span>{{ hero.heading2C }}</span>
    </p>
  </section>
</template>

<script>
export default {
  name: 'Hero',

  props: {
    hero: {
      required: true,
      type: Object,
      default: () => {
        return undefined;
      }
    }
  }
};
</script>
