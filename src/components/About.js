import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Observer from '@researchgate/react-intersection-observer';
import { TweenLite, CSSPlugin, Circ } from 'gsap';

const About = ({ about }) => {

  const gsap = {
    TweenLite,
    CSSPlugin,
    Circ
  };

  const isClient = typeof window !== 'undefined';
  // eslint-disable-next-line no-undef
  const hasOSReducedMotion = isClient ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;


  const animateParagraph = ({ isIntersecting, target, unobserve }) => {
    if (isIntersecting && !hasOSReducedMotion) {
      unobserve(); // observe only once

      // elements to animate
      const paragraph = target.querySelector('p');
      if (paragraph) {
        gsap.TweenLite.to(paragraph, 1, {
          autoAlpha: 1,
          y: 0,
          ease: Circ.easeOut
        }, 1);
      }
    }
  };

  const figureVisibilityChanged = (isIntersecting, target, unobserve) => {
    if (isIntersecting) {
      unobserve(); // observe only once
      target.classList.add('animated');
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
  }, []);

  return (
    <section className="about">
      <div id="about" className="about__container">
        <h2>{about.aboutHeading}</h2>

        {/* <div v-observe-visibility="{ callback: animateParagraph, once: true }" v-html="about.aboutDescription1"></div> */}
        {/* <div v-observe-visibility="{ callback: animateParagraph, once: true }" v-html="about.aboutDescription2"></div> */}
        <Observer onChange={animateParagraph}>
          <div>
            <p dangerouslySetInnerHTML={{ __html: about.aboutDescription1 }}/>
          </div>
        </Observer>
        <Observer onChange={animateParagraph}>
          <div>
            <p dangerouslySetInnerHTML={{ __html: about.aboutDescription2 }}/>
          </div>
        </Observer>

        {/* <figure v-if="about.aboutPicture" v-observe-visibility="{ callback: figureVisibilityChanged, once: true }"> */}

        <Observer onChange={figureVisibilityChanged}>
          <figure>
            <img
              srcSet={`${about.aboutPicture.url}?w=630;1280w,${about.aboutPicture.url}?w=630&fit=max;768w,${about.aboutPicture.url}?w=300&fit=max;320w`}
              sizes="(min-width: 17em) 50vw, 100vw"
              src={`${about.aboutPicture.url}?w=630`}
              alt={about.aboutPicture.alt}
            />
          </figure>
        </Observer>

        {/* <div v-observe-visibility="{ callback: animateParagraph, once: true }" v-html="about.aboutDescription3"></div> */}
        {/* <div v-observe-visibility="{ callback: animateParagraph, once: true }" v-html="about.aboutDescription4"></div> */}

        <Observer onChange={animateParagraph}>
          <div>
            <p dangerouslySetInnerHTML={{ __html: about.aboutDescription3 }}/>
          </div>
        </Observer>
        <Observer onChange={animateParagraph}>
          <div>
            <p dangerouslySetInnerHTML={{ __html: about.aboutDescription4 }}/>
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
