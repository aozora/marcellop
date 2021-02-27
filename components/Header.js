import Link from 'next/link';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

const Header = (menu, showMenu = true) => {
  const router = useRouter();
  // eslint-disable-next-line no-unused-vars
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isClient = typeof window !== 'undefined';

  const isMobile = useCallback(() => {
    if (isClient) {
      // eslint-disable-next-line no-undef
      return window.matchMedia('(max-width: 768px)').matches;
    }

    return false;
  }, [isClient]);

  const isHome = useMemo(() => router.pathname === '/', [router.pathname]);

  /**
   * Toggle the mobile menu
   */
  const toggleMobileMenu = useCallback(() => {
    // eslint-disable-next-line no-undef
    if (isClient && window.matchMedia('(max-width: 768px)').matches) {
      // eslint-disable-next-line no-undef
      const { body } = document;
      // eslint-disable-next-line no-undef
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
      setShowMobileMenu(!showMobileMenu);
      menuElement.setAttribute('aria-hidden', `${!showMobileMenu}`);
      menuElement.setAttribute('tabindex', showMobileMenu ? '0' : '-1');

      // on open, set focus on the first <a>
      if (showMobileMenu) {
        menuElement.querySelector('a').focus();
      } else {
        // on close, set focus to the triggering button
        // eslint-disable-next-line no-undef
        document.querySelector('.menu__toggle').focus();
      }
    }
  }, [isClient, showMobileMenu]);

  useEffect(() => {
    // if mobile, then add ARIA attrs to the mobile menu, so it will be available to AT only when toggled
    if (isMobile && isClient) {
      // eslint-disable-next-line no-undef
      const menuElement = document.querySelector('.menu');
      menuElement.setAttribute('aria-hidden', 'true');
      menuElement.setAttribute('tabindex', '-1');
      menuElement.setAttribute('aria-labelledby', 'menu__toggle');
    }
  }, [isMobile, isClient]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <header
      id="header"
      className={`header ${isHome() ? 'header--home' : ''} ${
        showMobileMenu ? 'header--menu-open' : ''
      }`}
    >
      {showMenu && (
        <button
          id="menu__toggle"
          type="button"
          className="menu__toggle"
          aria-expanded={showMobileMenu}
          aria-controls="menu"
          onClick={toggleMobileMenu}
        >
          <span className="visuallyhidden">Menu</span>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fillRule="evenodd">
              <path
                className="menu__toggle-close"
                fill="currentColor"
                fillRule="nonzero"
                d="M12 23h18v2H12zM12 14h24v2H12zM12 32h12v2H12z"
              />
              <path
                className="menu__toggle-open"
                fill="currentColor"
                fillRule="nonzero"
                d="M15.414 15l16.97 16.97-1.413 1.414L14 16.414z"
              />
              <path
                className="menu__toggle-open"
                fill="currentColor"
                fillRule="nonzero"
                d="M14.708 32.111l16.97-16.97 1.415 1.414-16.97 16.97z"
              />
            </g>
          </svg>
        </button>
      )}

      {!isHome() && (
        <div aria-hidden="true" className="menu__title">
          <span aria-hidden="true">MP</span>
          <span>Marcello Palmitessa</span>
        </div>
      )}

      {showMenu && (
        <nav className="menu">
          <ul className="menu__items">
            {menu &&
              menu.menu &&
              menu.menu.menuItems.map(item => (
                <li key={item.url}>
                  <Link href={item.url}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid,jsx-a11y/click-events-have-key-events */}
                    <a
                      className={router.pathname === item.url ? 'active' : ''}
                      onClick={toggleMobileMenu}
                    >
                      <span>{item.title}</span>
                    </a>
                  </Link>
                </li>
              ))}
          </ul>

          <ul className="menu__social">
            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="http://www.twitter.com/marcellopalmit"
              >
                <svg
                  aria-hidden="true"
                  width="32"
                  height="27"
                  viewBox="0 0 32 27"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32 3.37c-.214.452-.612 1.022-1.195 1.712a8.8 8.8 0 0 1-2.158 1.82c.023.19.041.368.053.535.092 2.563-.522 5.222-1.373 7.438-1.652 4.119-4.182 7.434-7.795 9.685-3.769 2.162-8.157 2.622-12.2 2.23C4.646 26.482 2 25.605 0 23.954c3.66.437 7.075-.808 9.775-2.818-3 .075-5.179-2.094-6.208-4.602.464.121.95.106 1.392.071.544-.051 1.061-.102 1.57-.214-1.913-.617-3.586-1.751-4.46-3.46a7.459 7.459 0 0 1-.749-3.283c.896.472 1.974.932 2.961.892-1.49-1.262-2.685-2.876-2.907-4.727-.14-1.543.245-2.951.802-4.263C4.406 4 6.907 6.017 9.793 7.258c1.973.808 3.94 1.24 5.975 1.249-.235-1.817-.052-3.575.803-5.066C17.577 1.838 19.045.908 20.69.444c2.356-.604 4.654.25 6.1 1.891 1.561-.168 3.056-.86 4.246-1.57-.506 1.531-1.49 3.054-2.925 3.782A18.499 18.499 0 0 0 32 3.37z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </svg>
                <span>Twitter</span>
              </a>
            </li>

            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="http://it.linkedin.com/in/marcellopalmitessa"
              >
                <svg
                  aria-hidden="true"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.705 3.703c0 .96-.285 1.769-.854 2.427-.568.659-1.408.988-2.519.988-1.002 0-1.801-.33-2.397-.988C.339 5.472.027 4.731 0 3.91c0-.96.312-1.797.935-2.51C1.558.686 2.37.329 3.373.329c1.002 0 1.815.33 2.438.988.623.658.92 1.453.894 2.386zM0 30.857h6.705V8.805H0v22.052zM22.756 9.134c-.867 0-1.64.11-2.317.329a7.527 7.527 0 0 0-1.828.864 7.118 7.118 0 0 0-1.341 1.11 7.205 7.205 0 0 0-.853 1.112h-.163l-.366-2.88H9.874c0 .932.027 1.947.082 3.044.054 1.097.08 2.277.08 3.538v14.606h6.706V18.802c0-.329.013-.63.04-.905.027-.274.068-.535.122-.782.108-.301.257-.617.447-.946.19-.329.406-.617.65-.864s.542-.466.894-.658a2.13 2.13 0 0 1 1.179-.247c1.192 0 2.058.439 2.6 1.317.542.877.8 2.016.772 3.414v11.726h6.705V18.31c0-1.564-.19-2.922-.569-4.074-.379-1.152-.894-2.112-1.544-2.88a5.78 5.78 0 0 0-2.357-1.686 8.033 8.033 0 0 0-2.925-.535z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </svg>
                <span>LinkedIn</span>
              </a>
            </li>

            <li>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/aozora/marcellop"
              >
                <svg
                  aria-hidden="true"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.002.384C7.16.381 0 7.538 0 16.372c0 6.985 4.48 12.924 10.718 15.104.84.211.711-.386.711-.793v-2.771c-4.851.568-5.048-2.642-5.373-3.178-.658-1.123-2.213-1.409-1.748-1.945 1.105-.568 2.23.143 3.536 2.07.943 1.398 2.785 1.162 3.718.93a4.51 4.51 0 0 1 1.24-2.174C7.776 22.714 5.681 19.647 5.681 16c0-1.77.582-3.396 1.726-4.708-.729-2.163.068-4.015.176-4.29 2.077-.186 4.236 1.487 4.404 1.62 1.18-.319 2.528-.487 4.036-.487 1.516 0 2.867.175 4.058.497.404-.308 2.406-1.745 4.336-1.57.104.276.883 2.085.197 4.219 1.158 1.316 1.748 2.957 1.748 4.73 0 3.653-2.11 6.724-7.15 7.611a4.558 4.558 0 0 1 1.362 3.253v4.022c.029.322 0 .64.536.64C27.442 29.403 32 23.422 32 16.375 32 7.538 24.836.385 16.002.385z"
                    fill="#FFF"
                    fillRule="nonzero"
                  />
                </svg>
                <span>Medium</span>
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
