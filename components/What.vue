<template>
  <section class="whatido">
    <h2>What I Do</h2>

    <div v-if="whatido" class="whatido__items">
      <div v-for="(item, index) in whatido" :key="index" class="whatido__item">
        <h3 v-text="item.title"></h3>
        <div v-html="item.description"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'What',

  props: {
    whatido: {
      required: true,
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>
