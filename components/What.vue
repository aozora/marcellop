<template>
  <section id="whatido" class="whatido">
    <h2>What I Do</h2>

    <div v-if="whatido" class="whatido__items">
      <div v-for="(item, index) in whatido" :key="index" class="whatido__item">
        <p v-text="item.title"></p>
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
