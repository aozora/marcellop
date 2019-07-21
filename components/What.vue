<template>
  <section class="whatido">
    <h2>What I Do</h2>

    <div v-if="whatido" class="whatido__items">
      <div v-for="(item, index) in whatido" :key="index" class="whatido__item">
        <h3 v-text="item.title"></h3>
        <p v-html="item.description"></p>
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
      type: Object,
      default: () => {
        return undefined;
      }
    }
  }
};
</script>
