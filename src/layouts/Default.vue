<template>
  <div class="layout">
    <header class="header">

      <strong>
        <g-link to="/">{{ $static.metaData.siteName }}</g-link>
      </strong>

      <nav class="nav">
        <g-link class="nav__link" to="/#home">Home</g-link>
        <g-link class="nav__link" to="/#about">About</g-link>
        <g-link class="nav__link" to="/#whatido">What I do</g-link>
        <g-link class="nav__link" to="/#experience">Experience</g-link>
        <g-link class="nav__link" to="/#contact">Contact</g-link>
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
