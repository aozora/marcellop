import menu from './menu';
import onscroll from './onscroll';

/**
 * Netlify Identity redirect
 */
// if (window.netlifyIdentity) {
//   window.netlifyIdentity.on('init', (user) => {
//     if (!user) {
//       window.netlifyIdentity.on('login', () => {
//         document.location.href = '/admin/'
//       })
//     }
//   })
// }

menu.init();
onscroll.init();

const experienceButton = document.querySelector('.experience-area button');
experienceButton.addEventListener('click', (e) => {
  e.preventDefault();
  const expanded = experienceButton.getAttribute('aria-expanded') === 'true' || false;
  experienceButton.setAttribute('aria-expanded', !expanded);
});
