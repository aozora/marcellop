section.marquee
div.wrapper
header
h2
strong Uniting diverse ventures
br
span for a connected tomorrow

a.ntt-button.color-black(href="#")
span Discover Our Companies
span.icon

.marquee-wrapper
.marquee-inner
div
img(src="/wp-content/themes/globalntt/img/logos/docomo_business.png" alt="")
div
img(src="/wp-content/themes/globalntt/img/logos/ntt_anode.svg" alt="")
div
img(src="/wp-content/themes/globalntt/img/logos/ntt_data.svg" alt="")
div
img(src="/wp-content/themes/globalntt/img/logos/ntt_docomo.svg" alt="")
div
img(src="/wp-content/themes/globalntt/img/logos/ntt_east.svg" alt="")
div
img(src="/wp-content/themes/globalntt/img/logos/ntt_urban.svg" alt="")
div
img(src="/wp-content/themes/globalntt/img/logos/ntt_west.svg" alt="")

// This is not an error, all the logos must be repeated
div
img(aria-hidden="true" src="/wp-content/themes/globalntt/img/logos/docomo_business.png" alt="")
div
img(aria-hidden="true" src="/wp-content/themes/globalntt/img/logos/ntt_anode.svg" alt="")
div
img(aria-hidden="true" src="/wp-content/themes/globalntt/img/logos/ntt_data.svg" alt="")
div
img(aria-hidden="true" src="/wp-content/themes/globalntt/img/logos/ntt_docomo.svg" alt="")
div
img(aria-hidden="true" src="/wp-content/themes/globalntt/img/logos/ntt_east.svg" alt="")
div
img(aria-hidden="true" src="/wp-content/themes/globalntt/img/logos/ntt_urban.svg" alt="")
div
img(aria-hidden="true" src="/wp-content/themes/globalntt/img/logos/ntt_west.svg" alt="")




<style lang="scss">
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .marquee {
    padding-top: 156px;
    padding-bottom: 224px;
    background-color: var(--cold-grey);

    @include mq-tablet {
      display: flex;
      flex-direction: column;
      padding: 100px 0 80px 0;
    }

    > div {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-gap: 16px;
      gap: 16px;
    }

    header {
      grid-column: 2/12;
      margin-bottom: 130px;

      @include mq-tablet {
        grid-column: 1/-1;
        margin-bottom: 95px;
      }

      h2 {
        @include component-title-2-rows;
      }
    }
  }

  .marquee-wrapper {
    //grid-column: 1/-1;
    height: 50px;
    overflow: hidden;
    white-space: nowrap;
  }

  .marquee-inner {
    display: inline-flex;
    height: 50px;
    animation: marquee 18s linear infinite;

    & > div {
      padding-right: 200px;
    }

    img {
      width: auto;
      height: 50px;
      object-fit: contain;
    }

    &:hover {
      animation-play-state: paused;
    }

    @include mq-tablet {
      height: 30px;

      & > div {
        padding-right: 50px;
      }

      img {
        height: 30px;
      }
    }
  }

</style>
