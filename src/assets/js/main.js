import menu from './menu';
import smoothscroll from './smoothscroll';
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
smoothscroll.init();
onscroll.init();
