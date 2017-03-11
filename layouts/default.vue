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

<style>
.container
{
  margin: 0;
  width: 100%;
  padding: 100px 0;
  text-align: center;
}

.button, .button:visited
{
  display: inline-block;
  color: #3B8070;
  letter-spacing: 1px;
  background-color: #fff;
  border: 2px solid #3B8070;
  text-decoration: none;
  text-transform: uppercase;
  padding: 15px 45px;
}

.button:hover, .button:focus
{
  color: #fff;
  background-color: #3B8070;
}

.title
{
  color: #505153;
  font-weight: 300;
  font-size: 2.5em;
  margin: 0;
}
</style>
