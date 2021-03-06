import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <nav role="navigation" className="menu__social">
        <ul>
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
                  fill="currentColor"
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
                  fill="currentColor"
                  fillRule="nonzero"
                />
              </svg>
              <span>LinkedIn</span>
            </a>
          </li>
        </ul>
      </nav>
      <p className="footer__copyright">
        &copy; 2010–2020 Copyright Marcello Palmitessa. All rights reserved.
      </p>
      <p className="footer__credits">
        This site is built with&nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://nextjs.org/">
          NextJs
        </a>
        &nbsp;and hosted on&nbsp;
        <a target="_blank" rel="noopener noreferrer" href="https://vercel.com/">
          Vercel
        </a>
        . The source code is hosted on&nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/aozora/marcellop"
        >
          GitHub
        </a>
        .
      </p>
    </footer>
  );
}
