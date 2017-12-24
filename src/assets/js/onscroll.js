// eslint-disable-next-line no-unused-vars
import waypoint from 'waypoints/lib/noframework.waypoints';

export default {
  init: () => {
    // eslint-disable-next-line no-undef,no-new
    new Waypoint({
      element: document.querySelector('.hero__headings h1'),
      // offset: 120,
      handler: (direction) => {
        const logo = document.querySelector('.marcello');

        if (direction === 'down') {
          logo.classList.add('active');
        } else if (direction === 'up') {
          logo.classList.remove('active');
        }
      }
    });
  }
};
