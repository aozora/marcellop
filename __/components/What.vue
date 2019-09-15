<template>
  <section id="whatido" class="whatido">
    <h2>{{ whatido.heading }}</h2>

    <ul v-if="whatido" class="whatido__items">
      <li v-for="(item, index) in whatido.items" :key="index" :style="{'--whatido-justify': getRandomJustification()}">
        <p class="whatido__title">{{ item.title }}</p>
        <div class="whatido__description" v-html="item.description"></div>
      </li>
    </ul>
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
  },

  methods: {
    getRandomJustification: function () {
      const index = Math.floor(Math.random() * 3);

      switch (index) {
        case 2:
          return 'flex-start';
        case 1:
          return 'flex-end';
        case 0:
          return 'center';
        default:
      }
    }
  }
};
</script>
