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
      <div class="portfolio-grid-item column">
        <figure>
          <img src="/img/portfolio/bootplus-screen.jpeg" alt="bootplus" aria-hidden="true"/>
          <!--<div class="zoom-icon">-->
          <!--<a href="http://www.marcellop.com/bootplus/" class="fancybox">-->
          <!--<i class="zmdi zmdi-filter-center-focus"></i>-->
          <!--</a>-->
          <!--</div>-->
          <figcaption>
            <h4>Bootplus</h4>
            <p>Bootplus provides the same basic templates from Bootstrap, adapted with the first Google "plus" style.</p>
          </figcaption>
        </figure>
      </div>

      <div class="portfolio-grid-item column">
        <figure>
          <img src="/img/portfolio/bootmetro-screen.jpeg" alt="bootmetro" aria-hidden="true"/>
          <!--<div class="title plr-40 text-center">-->
          <!--<div class="zoom-icon">-->
          <!--<a href="http://www.marcellop.com/bootmetro/" class="fancybox">-->
          <!--<i class="zmdi zmdi-filter-center-focus"></i>-->
          <!--</a>-->
          <!--</div>-->
          <!--</div>-->
          <figcaption>
            <h4>BootMetro</h4>
            <p>BootMetro is built on top of Twitter Bootstrap and provide the same UI elements of an original Windows 8 Store app, such Tiles, Charms Bar, Application Bar, and the same Navigation pattern.</p>
          </figcaption>
        </figure>
      </div>

      <div class="portfolio-grid-item column">
        <figure>
          <img src="/img/portfolio/tripandia-screen.jpeg" alt="tripandia" aria-hidden="true"/>
          <!--<div class="title plr-40 text-center">-->
          <!--<div class="zoom-icon">-->
          <!--<a class="various" title="Tripandia web site" href="http://www.tripandia.com/">-->
          <!--<i class="zmdi zmdi-play"></i>-->
          <!--</a>-->
          <!--</div>-->
          <!--</div>-->
          <figcaption>
            <h4>Tripandia</h4>
            <p>Tripandia is a travel social network that let you share your travels and find usefull tips from others travellers. In 2012 I supported the Tripandia team to build the UI.</p>
          </figcaption>
        </figure>
      </div>
    </div>

  </section>
</template>

<script>
  export default{
    name: 'Portfolio'
  }
</script>
