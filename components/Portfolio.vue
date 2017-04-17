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
      <div class="column">
        <a href="http://www.marcellop.com/bootplus/" class="portfolio-grid-item">
          <figure>
            <img src="/img/portfolio/bootplus-screen.jpeg" alt="bootplus" aria-hidden="true"/>
            <figcaption>
              <h4>Bootplus</h4>
            </figcaption>
          </figure>
          <div class="portfolio-grid-item__title">
            <p>Bootplus provides the same basic templates from Bootstrap, adapted with the first Google "plus" style.</p>
          </div>
        </a>
      </div>

      <div class="column">
        <a href="http://www.marcellop.com/bootmetro/" class="portfolio-grid-item">
          <figure>
            <img src="/img/portfolio/bootmetro-screen.jpeg" alt="bootmetro" aria-hidden="true"/>
            <figcaption>
              <h4>BootMetro</h4>
            </figcaption>
          </figure>
          <div class="portfolio-grid-item__title">
            <p>BootMetro is built on top of Twitter Bootstrap and provide the same UI elements of an original Windows 8 Store app, such Tiles, Charms Bar, Application Bar, and the same Navigation pattern.</p>
          </div>
        </a>
      </div>

      <div class="column">
        <a href="http://www.tripandia.com/" class="portfolio-grid-item">
          <figure>
            <img src="/img/portfolio/tripandia-screen.jpeg" alt="tripandia" aria-hidden="true"/>
            <figcaption>
              <h4>Tripandia</h4>
            </figcaption>
          </figure>
          <div class="portfolio-grid-item__title">
            <p>Tripandia is a travel social network that let you share your travels and find usefull tips from others travellers. In 2012 I supported the Tripandia team to build the UI.</p>
          </div>
        </a>
      </div>
    </div>

  </section>
</template>

<script>
  export default{
    name: 'Portfolio'
  }
</script>
