<script lang="ts">
import { page } from '$app/stores';
import { onDestroy } from 'svelte';
import { browser } from '$app/environment';
import { menuItems } from '$lib/stores/menu-store';

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
let pageInfo;
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

const toggleTheme = () => {
	const currentTheme = document.documentElement.getAttribute('data-theme');
	let targetTheme = 'light';

	if (currentTheme === 'light') {
		targetTheme = 'dark';
	}

	document.documentElement.setAttribute('data-theme', targetTheme);
	localStorage.setItem('theme', targetTheme);
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
	id="header"
	class={`header ${isHome ? 'header--home' : ''} ${showMobileMenu ? 'header--menu-open' : ''}`}
>
	<div aria-hidden="true" class="menu__title">
		<!--			<span aria-hidden="true">MP</span>-->
		<!--			<span>Marcello Palmitessa</span>-->
		<span class="header-title-word" style:--char-count={'MARCELLO'.length}>
      {#each Array.from('MARCELLO') as char, charIndex}
        <span class="header-title-char">
          <span style:--char-index={charIndex}>{char}</span>
        </span>
      {/each}
      </span>

		<span class="header-title-word" style:--char-count={'PALMITESSA'.length}>
      {#each Array.from('PALMITESSA') as char, charIndex}
        <span class="header-title-char">
          <span style:--char-index={charIndex}>{char}</span>
        </span>
      {/each}
      </span>
	</div>

	<nav class="menu">
		<ul class="menu__items">
			{#if $menuItems}
				{#each $menuItems as item}
					<li>
						<a href={item.url} class={pageInfo.pathname === item.url ? 'active' : ''} onClick={()=>toggleMobileMenu()}>
							<span>{item.title}</span>
						</a>
					</li>
				{/each}
			{/if}

			<li>
				<button type="button" class="toggle-theme" on:click={()=> toggleTheme()}>
					<span class="visuallyhidden">Toggle colors</span>
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 24a12 12 0 0 1 0-24v24Z" fill="var(--theme-foreground)" />
						<path d="M12 0a12 12 0 1 1 0 24V0Z" fill="var(--theme-background)" />
						<circle cx="12" cy="12" r="11.5" stroke="var(--theme-foreground)" />
					</svg>
				</button>
			</li>
		</ul>
	</nav>
</header>


<style lang="scss">
  @import '../styles/shared';

  .header {
    --menu-background: transparent;

    //position: -webkit-sticky;
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
    background-color: transparent;
    z-index: var(--menu-zindex);
  }

  .header-title-word {
    display: inline-flex;
  }

  .header-title-char {
    position: relative;
    display: inline-flex;
    overflow: hidden;

    span {
      will-change: transform;
    }
  }

  .menu__title {
    grid-area: title;
    overflow: hidden;
    height: 100%;
    margin: 0 .5rem;
    padding: 0;
    font-family: var(--body-font-family);
    font-optical-sizing: auto;
    font-variation-settings: "slnt" 0, "GRAD" 0, "XOPQ" 96, "XTRA" 468, "YOPQ" 79, "YTAS" 750, "YTDE" -203, "YTFI" 738, "YTLC" 514, "YTUC" 712;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: var(--menu-height);
    color: var(--theme-foreground);
    text-transform: uppercase;

    span {
      height: 100%;
    }
  }

  .menu {
    grid-area: menu;
    position: relative;
    display: none;
    width: 100%;
    height: var(--menu-height);
    padding: 0;
    //overflow: hidden;
    background-color: transparent;
    z-index: var(--menu-zindex);

    @media (min-width: 48em) {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .menu__items {
    width: 100%;
    height: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: transparent;

    > li {
      overflow: hidden;
      list-style-type: none;
      margin: 0;
      padding: 1rem 0;
      text-align: left;
      transform: translateY(-200%);
      transition: transform .5s ease-in-out;

      @media (min-width: 48em){
        animation: menuEnterTransition .5s ease-in-out 1s forwards;
      }
    }

    a {
      --text-weight-max: 600;
      --text-weight-min: 300;

      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      border: .10em solid transparent;
      line-height: 1;
      font-weight: 400;
      font-variation-settings: 'wght' 400, 'wdth' 80;
      letter-spacing: -1px;
      text-decoration: none;
      text-align: center;
      color: var(--theme-foreground);
      transition: all 1s ease-in-out;

      /*
       * Don't enable hover on links on mobile, it will cause this issue on ios:
       * https://css-tricks.com/annoying-mobile-double-tap-link-issue/
      */

      &:active,
      &:focus,
      &:focus-visible {
        color: var(--theme-foreground);
        text-decoration: none;
        border-bottom: .10em dashed var(--theme-brand);
        outline: 0;
      }

      @media (min-width: 48em){
        &:hover {
          //animation: breathe 3s infinite both;
          font-weight: 700;
          font-variation-settings: 'wght' 700, 'wdth' 80;
        }
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
      }
    }
  }


  .toggle-theme {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
</style>
