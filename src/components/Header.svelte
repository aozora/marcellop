<script lang='ts'>
import { page } from '$app/stores';
import { onDestroy } from 'svelte';
import { browser } from '$app/env';
import { menuItems } from "../lib/stores/menu-store";

/**
 * Props
 */
// export let menu: Array<MenuItem>;

/**
 * State
 */
let showMobileMenu = false;
// const isMobile = window.matchMedia('(max-width: 768px)').matches;
const isClient = browser === true;

// subscribe the page store to get page info
let pageInfo
const unsubscribePageStore = page.subscribe(value => pageInfo = value);
let isHome = pageInfo.pathname === '/';

/**
 * Toggle the mobile menu
 */
const toggleMobileMenu = () => {
  if (isClient && window.matchMedia('(max-width: 768px)').matches) {
    const { body } = document;
    const menuElement = document.querySelector('.menu');

    // on open
    if (!showMobileMenu) {
      // fix ios issues
      // ref: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
      body.style.position = 'fixed';
    } else {
      body.style.position = '';
    }

    // toggle
    showMobileMenu = !showMobileMenu;
    menuElement.setAttribute('aria-hidden', `${!showMobileMenu}`);
    menuElement.setAttribute('tabindex', showMobileMenu ? '0' : '-1');

    // on open, set focus on the first <a>
    if (showMobileMenu) {
      menuElement.querySelector('a').focus();
    } else {
      // on close, set focus to the triggering button
      // eslint-disable-next-line no-undef
      const el = document.querySelector('.menu__toggle') as HTMLElement;
      el.focus();
    }
  }
};

// TODO
// useEffect(() => {
//   // if mobile, then add ARIA attrs to the mobile menu, so it will be available to AT only when toggled
//   if (isMobile && isClient) {
//     // eslint-disable-next-line no-undef
//     const menuElement = document.querySelector('.menu');
//     menuElement.setAttribute('aria-hidden', 'true');
//     menuElement.setAttribute('tabindex', '-1');
//     menuElement.setAttribute('aria-labelledby', 'menu__toggle');
//   }
// }, [isMobile, isClient]);


/**
 * Cleanup
 */
onDestroy(unsubscribePageStore);
</script>

<header
  id='header'
  class={`header ${isHome ? 'header--home' : ''} ${showMobileMenu ? 'header--menu-open' : ''}`}
>
  <button
    id='menu__toggle'
    type='button'
    class='menu__toggle'
    aria-expanded={showMobileMenu}
    aria-controls='menu'
    on:click={toggleMobileMenu}
  >
    <span class='visuallyhidden'>Menu</span>
    <svg width='48' height='48' viewBox='0 0 48 48' xmlns='http://www.w3.org/2000/svg'>
      <g fill='none' fill-rule='evenodd'>
        <path
          class='menu__toggle-close'
          fill='currentColor'
          fill-rule='nonzero'
          d='M12 23h18v2H12zM12 14h24v2H12zM12 32h12v2H12z'
        />
        <path
          class='menu__toggle-open'
          fill='currentColor'
          fill-rule='nonzero'
          d='M15.414 15l16.97 16.97-1.413 1.414L14 16.414z'
        />
        <path
          class='menu__toggle-open'
          fill='currentColor'
          fill-rule='nonzero'
          d='M14.708 32.111l16.97-16.97 1.415 1.414-16.97 16.97z'
        />
      </g>
    </svg>
  </button>

  {#if isHome}
    <div aria-hidden='true' class='menu__title'>
      <span aria-hidden='true'>MP</span>
      <span>Marcello Palmitessa</span>
    </div>
  {/if}

  <nav class='menu'>
    <ul class='menu__items'>
      {#if $menuItems}
        {#each $menuItems as item}
          <li>
            <a href={item.url} class={pageInfo.pathname === item.url ? 'active' : ''} onClick={toggleMobileMenu}>
              <span>{item.title}</span>
            </a>
          </li>
        {/each}
      {/if}
    </ul>

    <ul class='menu__social'>
      <li>
        <a rel='noopener noreferrer' target='_blank' href='https://www.twitter.com/marcellopalmit'>
          <svg aria-hidden='true' width='32' height='27' viewBox='0 0 32 27' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M32 3.37c-.214.452-.612 1.022-1.195 1.712a8.8 8.8 0 0 1-2.158 1.82c.023.19.041.368.053.535.092 2.563-.522 5.222-1.373 7.438-1.652 4.119-4.182 7.434-7.795 9.685-3.769 2.162-8.157 2.622-12.2 2.23C4.646 26.482 2 25.605 0 23.954c3.66.437 7.075-.808 9.775-2.818-3 .075-5.179-2.094-6.208-4.602.464.121.95.106 1.392.071.544-.051 1.061-.102 1.57-.214-1.913-.617-3.586-1.751-4.46-3.46a7.459 7.459 0 0 1-.749-3.283c.896.472 1.974.932 2.961.892-1.49-1.262-2.685-2.876-2.907-4.727-.14-1.543.245-2.951.802-4.263C4.406 4 6.907 6.017 9.793 7.258c1.973.808 3.94 1.24 5.975 1.249-.235-1.817-.052-3.575.803-5.066C17.577 1.838 19.045.908 20.69.444c2.356-.604 4.654.25 6.1 1.891 1.561-.168 3.056-.86 4.246-1.57-.506 1.531-1.49 3.054-2.925 3.782A18.499 18.499 0 0 0 32 3.37z'
              fill='#FFF'
              fill-rule='nonzero'
            />
          </svg>
          <span>Twitter</span>
        </a>
      </li>

      <li>
        <a rel='noopener noreferrer' target='_blank' href='https://it.linkedin.com/in/marcellopalmitessa'>
          <svg aria-hidden='true' width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M6.705 3.703c0 .96-.285 1.769-.854 2.427-.568.659-1.408.988-2.519.988-1.002 0-1.801-.33-2.397-.988C.339 5.472.027 4.731 0 3.91c0-.96.312-1.797.935-2.51C1.558.686 2.37.329 3.373.329c1.002 0 1.815.33 2.438.988.623.658.92 1.453.894 2.386zM0 30.857h6.705V8.805H0v22.052zM22.756 9.134c-.867 0-1.64.11-2.317.329a7.527 7.527 0 0 0-1.828.864 7.118 7.118 0 0 0-1.341 1.11 7.205 7.205 0 0 0-.853 1.112h-.163l-.366-2.88H9.874c0 .932.027 1.947.082 3.044.054 1.097.08 2.277.08 3.538v14.606h6.706V18.802c0-.329.013-.63.04-.905.027-.274.068-.535.122-.782.108-.301.257-.617.447-.946.19-.329.406-.617.65-.864s.542-.466.894-.658a2.13 2.13 0 0 1 1.179-.247c1.192 0 2.058.439 2.6 1.317.542.877.8 2.016.772 3.414v11.726h6.705V18.31c0-1.564-.19-2.922-.569-4.074-.379-1.152-.894-2.112-1.544-2.88a5.78 5.78 0 0 0-2.357-1.686 8.033 8.033 0 0 0-2.925-.535z'
              fill='#FFF'
              fill-rule='nonzero'
            />
          </svg>
          <span>LinkedIn</span>
        </a>
      </li>

      <li>
        <a rel='noopener noreferrer' target='_blank' href='https://github.com/aozora/marcellop'>
          <svg aria-hidden='true' width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M16.002.384C7.16.381 0 7.538 0 16.372c0 6.985 4.48 12.924 10.718 15.104.84.211.711-.386.711-.793v-2.771c-4.851.568-5.048-2.642-5.373-3.178-.658-1.123-2.213-1.409-1.748-1.945 1.105-.568 2.23.143 3.536 2.07.943 1.398 2.785 1.162 3.718.93a4.51 4.51 0 0 1 1.24-2.174C7.776 22.714 5.681 19.647 5.681 16c0-1.77.582-3.396 1.726-4.708-.729-2.163.068-4.015.176-4.29 2.077-.186 4.236 1.487 4.404 1.62 1.18-.319 2.528-.487 4.036-.487 1.516 0 2.867.175 4.058.497.404-.308 2.406-1.745 4.336-1.57.104.276.883 2.085.197 4.219 1.158 1.316 1.748 2.957 1.748 4.73 0 3.653-2.11 6.724-7.15 7.611a4.558 4.558 0 0 1 1.362 3.253v4.022c.029.322 0 .64.536.64C27.442 29.403 32 23.422 32 16.375 32 7.538 24.836.385 16.002.385z'
              fill='#FFF'
              fill-rule='nonzero'
            />
          </svg>
          <span>Medium</span>
        </a>
      </li>
    </ul>
  </nav>
</header>


<style lang="scss">
  @import '../styles/shared';


  .header {
    --menu-background: transparent;

    position: -webkit-sticky;
    position: sticky;
    top: 0;
    display: grid;
    grid-template-columns: 2.667rem 1fr 1fr 2.667rem;
    grid-template-rows: var(--menu-height);
    grid-template-areas: "toggle title menu search";
    grid-gap: 1rem;
    width: 100%;
    max-width: none;
    height: var(--menu-height);
    margin: 0;
    padding: 0;
    background-color: var(--menu-background); // var(--color-white);
    z-index: var(--menu-zindex);
  }

  /**
    Mobile Navigation
   */
  .menu {
    grid-area: menu;
    position: relative;
    display: none;
    width: 100%;
    height: var(--menu-height);
    padding: 0;
    //overflow: hidden;
    background-color: var(--menu-background);
    z-index: var(--menu-zindex);

    @media (min-width: 48em) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .menu__toggle {
    grid-area: toggle;
    @include icon-button;
    z-index: var(--menu-toggle-button-zindex);

    @media (min-width: 48em) {
      display: none;
    }
  }

  .menu__toggle-close {
    opacity: 1;
  }

  .menu__toggle-open {
    opacity: 0;
  }

  .menu__search {
    grid-area: search;
    @include icon-button;
    z-index: var(--menu-toggle-button-zindex);
  }

  .menu__items {
    width: 100%;
    height: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: transparent;

    // fix odd safari issue
    &:focus-visible {
      //border: 0;
    }

    > li {
      margin: 0;
      list-style-type: none;
      padding: 1rem 0;
      text-align: left;
    }

    a {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: .10em solid transparent;
      font-family: var(--heading-font-family);
      line-height: 1;
      font-weight: 500;
      text-transform: uppercase;
      text-decoration: none;
      text-align: center;
      color: var(--color-primary);
      transition: all .2s ease-out;


      /*
       * Don't enable hover on links on mobile, it will cause this issue on ios:
       * https://css-tricks.com/annoying-mobile-double-tap-link-issue/
      */
      // &:hover:after,
      &:focus:after {
        width: 100%;
      }

      &:active,
      &:focus {
        color: var(--body-font-color);
        text-decoration: none;
        border-bottom: .10em dashed var(--color-pantone);
        outline: 0;
      }
    }

    @media (min-width: 48em) {
      position: relative;
      top: auto;
      left: auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
      height: 100%;
      margin: 0;
      padding: 0;

      > li {
        flex: 0 0 auto;
        margin: 0 .5rem;
      }

      a {
        display: block;
        width: auto;
        margin: 0 1rem;

        //&:hover,
        //&:active,
        //&:focus {
        //  color: var(--body-font-color);
        //  text-decoration: none;
        //  border-bottom: .10em solid var(--color-pantone);
        //  outline: 0;
        //}

      }
    }
  }

  .menu__social {
    width: 100%;
    height: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;

    span {
      @include visuallyhidden;
    }
  }

  @media (min-width: 48em) {
    .header .menu__social {
      display: none;
    }
  }

  .header--menu-open {
    background-color: var(--color-black);

    .menu__toggle-close {
      opacity: 0;
    }

    .menu__toggle-open {
      opacity: 1;
    }

    .menu__search {
      display: none;
    }

    &::before {
      content: '';
      position: absolute;
      display: block;
      width: 100vw;
      height: 100vh;
      z-index: calc(var(--menu-toggle-button-zindex) - 2);
      background-color: var(--color-pantone);
    }

    .menu {
      position: fixed;
      top: 0;
      left: 0;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 2fr 1fr;
      grid-template-areas: ". items ." "social social social";
      width: 100vw;
      height: 100vh;
      padding: var(--menu-height) 1rem 1rem 1rem;
      background-color: var(--color-black);
      z-index: calc(var(--menu-toggle-button-zindex) - 1);
      clip-path: polygon(10% 0%, 25% 0%, 50% 0%, 75% 0%, 100% 0%, 100% 100%, 75% 100%, 50% 100%, 25% 100%, 0% 100%, 0% 0%);
      animation: menu-enter 3s ease-in-out;
      animation-fill-mode: forwards;
      will-change: clip-path;
    }


    .menu__items {
      grid-area: items;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(auto-fill, 4rem);

      li {
        width: 100%;
      }

      a {
        display: inline-block;
        height: 2.778rem;
        width: auto;
        color: var(--color-white);
        font-size: 2rem;
        line-height: 1.6;
        letter-spacing: 1px;
      }
    }

    .menu__social {
      grid-area: social;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }

  .menu__title {
    grid-area: title;
    padding: 1rem 0;
    margin: 0 .5rem;
    font-family: var(--heading-font-family);
    font-size: 1.833rem;
    line-height: 2.667rem;
    color: var(--color-black);
    text-transform: uppercase;

    @media (min-width: 48em) and (max-width: 846px) {
      grid-column: span 2;
      justify-self: center;
      padding: .388rem 0;
    }

    span {
      &:last-child {
        display: none;
      }
    }

    @media (min-width: 48em) and (max-width: 1060px) {
      grid-column: span 2;
      padding-left: 1rem;
      font-size: 1.111rem;
      line-height: 1.5;

      span {
        &:first-child {
          display: none;
        }

        &:last-child {
          display: block;
        }
      }
    }

    @media (min-width: 1060px) {
      font-size: 1.833rem;
      line-height: 1;

      span {
        &:first-child {
          display: none;
        }

        &:last-child {
          display: block;
        }
      }
    }
  }


  /*
    Desktop menu links animation with effect Kumya by Codrops:
    https://tympanus.net/codrops/2015/05/13/inspiration-for-text-styles-and-hover-effects/
  */
  /* Kumya */

  @media (min-width: 64em) {
    .menu__items {
      a {
        overflow: hidden;
        padding: 10px 10px 5px 10px;
        border: 0;
        text-decoration: underline;

        &:focus,
        &:hover {
          color: var(--color-white);
          border: 0;
          text-decoration: none;
        }

        &::after {
          content: '';
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          right: 0;
          z-index: -1;
          background-color: var(--color-black);
          transform: translate3d(101%, 0, 0);
          transition: transform 0.5s;
          transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
        }

        &:focus::after,
        &:hover::after {
          transform: translate3d(0, 0, 0);
        }

        span {
          display: block;
          position: relative;

          &::before {
            content: attr(data-letters);
            position: absolute;
            color: var(--color-white);
            left: 0;
            overflow: hidden;
            white-space: nowrap;
            width: 0;
            transition: width 0.5s;
            transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
          }
        }

        &:focus span::before,
        &:hover span::before {
          width: 100%;
        }
      }
    }

  }

</style>
