<template>
  <section id="portfolio" class="portfolio-area">
    <div class="row column">
      <div class="small-12">
        <div class="section-title">
          <h2>My Portfolio</h2>
          <div class="horizontal-line">
            <div class="top"></div>
            <div class="bottom"></div>
          </div>
        </div>
      </div>
    </div>


    <div class="portfolio-grid row small-up-1 medium-up-3">
      <div class="grid-item column">
        <div class="portfolio-item overlay light-1 text-center">
          <img src="/img/portfolio/bootplus.png" alt="bootplus" aria-hidden="true"/>
          <div class="zoom-icon">
            <a href="http://aozora.github.io/bootplus/" class="fancybox">
              <i class="zmdi zmdi-filter-center-focus"></i>
            </a>
          </div>
          <div class="project-title text-left">
            <h4 class="font-20 montserrat weight-regular capitalize no-margin">Bootplus</h4>
            <p class="montserratlight">Sleek, intuitive, and powerful Google styled front-end framework for faster and easier web development. Bootplus provides the same basic templates from Bootstrap, adapted with the new "plus" style.</p>
          </div>
        </div>
      </div>

      <div class="grid-item column">
        <div class="portfolio-item overlay light-1 text-center">
          <img src="/img/portfolio/bootmetro.png" alt="bootmetro" aria-hidden="true"/>
          <div class="title plr-40 text-center">
            <div class="zoom-icon">
              <a href="http://aozora.github.io/bootmetro/" class="fancybox">
                <i class="zmdi zmdi-filter-center-focus"></i>
              </a>
            </div>
          </div>
          <div class="project-title text-left">
            <h4 class="font-20 montserrat weight-regular capitalize no-margin">BootMetro</h4>
            <p class="montserratlight">
              BootMetro is a web framework with simple and flexible HTML, CSS, and Javascript for web apps that wants to use the Windows 8 Store Style (ex Metro style) style, without the need to run on Windows 8. BootMetro is built on top of Twitter Bootstrap and provide the same UI elements of an original Windows 8 Store app, such Tiles, Charms Bar, Application Bar, and the same Navigation pattern.</p>
          </div>
        </div>
      </div>

      <div class="grid-item column">
        <div class="portfolio-item overlay light-1 text-center">
          <img src="/img/portfolio/tripandia.png" alt="tripandia" aria-hidden="true"/>
          <div class="title plr-40 text-center">
            <div class="zoom-icon">
              <a class="various" title="Tripandia web site" href="http://www.tripandia.com/">
                <i class="zmdi zmdi-play"></i>
              </a>
            </div>
            <div class="project-title text-left">
              <h4 class="font-20 montserrat weight-regular capitalize no-margin">Tripandia</h4>
              <p class="montserratlight">Tripandia is a new travel social network that let you share your travels and find usefull tips from others travellers.
Recreating the travel experience is easy and funny, enriching with photos and maps all the visited places, sharing with friends to let them add theirs photos and stories.
In 2012 I collaborated with the Tripandia team to realize the front-end, first my sahring various mockups, then implementing part of the web design of the project.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
  export default{
    name: 'Portfolio'
  }
</script>
