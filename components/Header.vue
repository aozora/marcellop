<template>
  <header>
    <div class="title-bar show-for-small-only" data-responsive-toggle="main-menu" data-hide-for="medium" >
      <button class="menu-icon" type="button" data-toggle="example-menu"></button>
      <div class="title-bar-title">
        <img src="~assets/img/catforlogo.png" alt="Mim"/>
        Marcello
      </div>
    </div>

    <nav id="main-menu" class="top-bar">
      <div class="top-bar-left">
        <ul class="menu">
          <li class="menu-text">
            <a href="/"><img src="~assets/img/catforlogo.png" alt="Mim"/></a>
          </li>
        </ul>
      </div>

      <div class="top-bar-right">
        <ul class="dropdown menu" data-dropdown-menu>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#portfolio">PORTFOLIO</a></li>
          <li><a href="#service">Services</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact">Contact</a></li>
          <!--<li>-->
            <!--<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">-->
              <!--<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>-->
            <!--</svg>-->
          <!--</li>-->
        </ul>
      </div>
    </nav>
  </header>
</template>
