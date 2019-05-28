<template>
  <div class="layout">
    <header class="header">
      <button type="button">Menu</button>

      <nav>
        <g-link to="/">{{ $static.metaData.siteName }}</g-link>

        <ul class="header__menu">
          <li>
            <g-link to="/#home">Home</g-link>
          </li>
          <li>
            <g-link to="/#about">About</g-link>
          </li>
          <li>
            <g-link to="/#whatido">What I do</g-link>
          </li>
          <li>
            <g-link to="/#experience">Experience</g-link>
          </li>
          <li>
            <g-link to="/#contact">Contact</g-link>
          </li>
        </ul>
      </nav>
    </header>

    <main id="main" role="main">
      <slot/>
    </main>

    <footer id="footer"></footer>
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

export default {
  components: { SiteHeader }
}
</script>
