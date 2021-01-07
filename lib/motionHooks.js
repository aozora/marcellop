/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export const useAboutScrollTrigger = data => {
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (data) {
      gsap.to('.image-wrapper', {
        scale: 1.3,
        scrollTrigger: {
          trigger: '.image-wrapper', // aboutImageRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: 0.5,
          pin: false,
          markers: false
        }
      });
    }
  }, [data]);

  return null;
};
