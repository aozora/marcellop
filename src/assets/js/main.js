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
