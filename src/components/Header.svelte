<script lang="ts">
	const menu = {
		items: [
			{ url: '/', title: 'Home' },
			{ url: 'https://it.linkedin.com/in/marcellopalmitessa', title: 'Resume', external: true },
			// {url: '/uses', title: 'Uses'},
			{ url: '/tati', title: 'Tati' }
		]
	};
	let showMobileMenu = false;

	/**
	 * Toggle the mobile menu
	 */
	const toggleMobileMenu = () => {
		if (window.matchMedia('(max-width: 768px)').matches) {
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

	// const toggleTheme = () => {
	//   const currentTheme = document.documentElement.getAttribute('data-theme');
	//   let targetTheme = 'light';
	//
	//   if (currentTheme === 'light') {
	//     targetTheme = 'dark';
	//   }
	//
	//   document.documentElement.setAttribute('data-theme', targetTheme);
	//   localStorage.setItem('theme', targetTheme);
	// };

</script>

<header
	id="header"
	class={`header ${showMobileMenu ? 'header--menu-open' : ''}`}
>
	<div class="header-inner">
		<h1 class="menu__title">
			<span class="visuallyhidden">Marcello Palmitessa</span>
			<span aria-hidden="true">MP</span>
		</h1>

		<button type="button" class="mobile-toggle-menu" aria-expanded={showMobileMenu}
						on:click={()=>showMobileMenu = !showMobileMenu}>
			<span class="visuallyhidden">{showMobileMenu ? 'Open the menu' : 'Close the menu'}</span>
			<span class="menu-closed" aria-hidden="true">Menu</span>
			<span class="menu-opened" aria-hidden="true">Close</span>
		</button>

		<nav class="menu" aria-label="Main navigation" class:open={showMobileMenu}>
			<ul class="menu__items">
				{#if menu && menu.items}
					{#each menu.items as item}
						<li>
							<a href={item.url} target={item.external ? '_blank' :''} on:click={()=>toggleMobileMenu()}>
								<span class="visuallyhidden">{item.title}</span>

								<span class="word" style:--char-count={item.title.length}>
							{#each Array.from(item.title) as char, charIndex}
								<span class="char">
									<span style:--char-index={charIndex}>{char}</span>
								</span>
							{/each}
							</span>
							</a>
						</li>
					{/each}
				{/if}
			</ul>
		</nav>
	</div>
</header>


<style lang="scss">
  @use "../styles/shared" as *;

  @keyframes letter-breathe {
    from,
    to {
      font-variation-settings: 'wght' 100;
    }

    50% {
      font-variation-settings: 'wght' 900;
    }
  }

  .header {
    --menu-background: var(--theme-background);
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    width: 100%;
    max-width: none;
    height: var(--menu-height);
    margin: 0;
    padding: 0 1rem;
    background-color: var(--menu-background);
    z-index: var(--menu-zindex);

    @media (min-width: 64em) {
      //display: grid;
      //grid-template-columns: 1fr 1fr;
      //grid-template-rows: var(--menu-height);
      //grid-gap: 1rem;
      //padding: 0 1.5rem;
      @include layout-grid;

      @media (min-width: 48em) {
        padding: 0 2rem;
      }
    }
  }

  .header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    @media (min-width: 64em) {
			grid-column: 2;
    }
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
    grid-column: 1/2;
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

    @media (min-width: 64em) {
      margin: 0;
    }
  }

  .menu {
    grid-column: 2/3;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100dvh;
    padding: var(--menu-height) 0 0 0;
    background-color: var(--theme-brand);
    z-index: var(--menu-zindex);
    transition: all .5s ease;
    transform-origin: calc(100% - 3rem) 1.5rem;
    transform: scale(0);
    clip-path: circle(0);

    &.open {
      transform: scale(1);
      clip-path: circle(100%);
    }

    @media (min-width: 64em) {
      position: relative;
      top: auto;
      left: auto;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      height: var(--menu-height);
      padding: 0;
      background-color: var(--menu-background);
      transform: scale(1);
      clip-path: none
    }
  }

  .menu__items {
    width: 100%;
    height: 100%;
    list-style-type: none;
    margin: 0;
    padding: 0;
    background-color: transparent;

    @media (min-width: 64em) {
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    > li {
      overflow: hidden;
      list-style-type: none;
      margin: 0;
      padding: 1rem 0;
      text-align: left;

      @media (min-width: 64em) {
        flex: 0 0 auto;
        margin: 0 .5rem;
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
      padding: 0 1rem;
      border: .10em solid transparent;
      font-size: 20vw;
      line-height: 1;
      font-weight: 400;
      //font-variation-settings: 'wght' 400, 'wdth' 80;
      font-family: var(--body-font-family);
      font-optical-sizing: auto;
      font-variation-settings: "slnt" 0, "GRAD" 0, "XOPQ" 96, "XTRA" 468, "YOPQ" 79, "YTAS" 750, "YTDE" -203, "YTFI" 738, "YTLC" 514, "YTUC" 712;

      letter-spacing: -1px;
      text-decoration: none;
      text-align: right;
      text-transform: uppercase;
      color: var(--theme-foreground);
      transition: all 1s ease-in-out;

      @media (min-width: 64em) {
        padding: 0;
        font-size: 1rem;
        text-align: center;
        text-transform: none;
      }

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

      //@media (min-width: 64em) {
      //  &:hover {
      //    //animation: breathe 3s infinite both;
      //    font-weight: 700;
      //    font-variation-settings: 'wght' 700, 'wdth' 80;
      //  }
      //}

      span:not(.char):not(.word) {
        --delay: calc((var(--char-index) + 1) * 400ms);
        --text-weight-max: 700;
        --text-weight-min: 300;
        --text-weight: var(--text-weight-max);
        font-weight: var(--text-weight);
        font-variation-settings: 'wght' var(--text-weight);
        //transition: all

        animation: letter-breathe 5s ease-in-out var(--delay) infinite;

        @media (min-width: 64em) {
          animation: none;
        }
      }
    }
  }

  .mobile-toggle-menu {
    position: relative;
    width: 100px;
    height: 32px;
    margin: 0;
    padding: 0 .6rem;
    border: 1px solid var(--body-font-color);
    background-color: transparent;
    color: var(--body-font-color);
    z-index: calc(var(--menu-zindex) + 1);

    &:hover,
    &:focus-visible,
    &:focus {

    }

    &[aria-expanded="false"] {
      .menu-closed {
        display: inline-flex;
      }

      .menu-opened {
        display: none;
      }
    }

    &[aria-expanded="true"] {
      .menu-closed {
        display: none;
      }

      .menu-opened {
        display: inline-flex;
      }
    }

    @media (min-width: 64em) {
      display: none;
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
