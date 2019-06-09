<template>
  <div>
    <SiteHeader></SiteHeader>
    <nuxt/>
    <SiteFooter></SiteFooter>
  </div>
</template>

<static-query>
  query {
  metaData {
  siteName
  }
  }
</static-query>

<script>
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';

export default {
  components: {
    SiteFooter,
    SiteHeader
  }
}
</script>
