/* eslint-disable react/no-danger */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Observer from '@researchgate/react-intersection-observer';
import gsap from 'gsap';
import { Image } from 'react-datocms';
import { useAboutScrollTrigger } from '@/lib/motionHooks';

const About = ({ about }) => {
  const isClient = typeof window !== 'undefined';
  // eslint-disable-next-line no-undef
  const hasOSReducedMotion = isClient
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // activate gsap ScrollTrigger
  useAboutScrollTrigger(about);

  const animateParagraph = (event, unobserve) => {
    if (event.isIntersecting && !hasOSReducedMotion) {
      unobserve(); // observe only once

      // elements to animate
      const paragraph = event.target.querySelector('p');
      if (paragraph) {
        gsap.to(
          paragraph,
          {
            duration: 1,
            autoAlpha: 1,
            y: 0,
            ease: 'circ.out'
          },
          1
        );
      }
    }
  };

  useEffect(() => {
    if (!hasOSReducedMotion && isClient) {
      // eslint-disable-next-line no-undef
      const entries = document.querySelectorAll('.about__container p');
      for (let index = 0; index < entries.length; index += 1) {
        entries[index].style.visibility = 'hidden';
        entries[index].style.opacity = 0;
        entries[index].style.transform = 'matrix(1, 0, 0, 1, 0, 40)';
      }
    }
  }, [hasOSReducedMotion, isClient]);

  return (
    <section className="about">
      <div id="about" className="about__container">
        <h2>{about.aboutHeading}</h2>

        <Observer onChange={animateParagraph}>
          <div className="about__container__textblock-wrapper">
            <p
              className="dropcap"
              dangerouslySetInnerHTML={{ __html: about.aboutDescription1 }}
            />
          </div>
        </Observer>
        <Observer onChange={animateParagraph}>
          <div className="about__container__textblock-wrapper">
            <p dangerouslySetInnerHTML={{ __html: about.aboutDescription2 }} />
          </div>
        </Observer>

        <div className="image-container">
          <Image
            className="image-wrapper"
            data={{
              ...about.aboutPicture.responsiveImage
            }}
          />
        </div>

        <Observer onChange={animateParagraph}>
          <div className="about__container__textblock-wrapper">
            <p dangerouslySetInnerHTML={{ __html: about.aboutDescription3 }} />
          </div>
        </Observer>
        <Observer onChange={animateParagraph}>
          <div className="about__container__textblock-wrapper">
            <p dangerouslySetInnerHTML={{ __html: about.aboutDescription4 }} />
          </div>
        </Observer>
      </div>
    </section>
  );
};

About.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  about: PropTypes.object.isRequired
};

export default About;
