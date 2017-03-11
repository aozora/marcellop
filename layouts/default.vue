<template>
  <div>
    <!-- Loading Bar Start -->
    <div id="loading">
      <div id="loading-center">
        <div id="loading-center-absolute">
          <img src="~assets/img/catforlogo.png" alt="Mim" />
          <div class="object" id="object_three"></div>
        </div>
      </div>
    </div>
    <!-- Loading Bar End -->

    <div id="home"></div>

    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '~components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>
