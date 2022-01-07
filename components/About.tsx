import React from 'react';
import { Image } from 'react-datocms';
import { AboutData } from '@/types/index';

const About = ({
  aboutHeading,
  aboutDescription1,
  aboutDescription2,
  aboutDescription3,
  aboutDescription4,
  aboutPicture
}: AboutData): JSX.Element => {
  // const isClient = typeof window !== 'undefined';
  // eslint-disable-next-line no-undef
  // const hasOSReducedMotion = isClient ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // // activate gsap ScrollTrigger
  // useAboutScrollTrigger(about);
  //
  // const animateParagraph = useCallback(
  //   (event, unobserve) => {
  //     if (event.isIntersecting && !hasOSReducedMotion) {
  //       unobserve(); // observe only once
  //
  //       // elements to animate
  //       const paragraph = event.target.querySelector('p');
  //       if (paragraph) {
  //         gsap.to(
  //           paragraph,
  //           {
  //             duration: 1,
  //             autoAlpha: 1,
  //             y: 0,
  //             ease: 'circ.out'
  //           },
  //           1
  //         );
  //       }
  //     }
  //   },
  //   [hasOSReducedMotion]
  // );
  //
  // useEffect(() => {
  //   if (!hasOSReducedMotion && isClient) {
  //     // eslint-disable-next-line no-undef
  //     const entries = document.querySelectorAll('.about__container p');
  //     for (let index = 0; index < entries.length; index += 1) {
  //       entries[index].style.visibility = 'hidden';
  //       entries[index].style.opacity = 0;
  //       entries[index].style.transform = 'matrix(1, 0, 0, 1, 0, 40)';
  //     }
  //   }
  // }, [hasOSReducedMotion, isClient]);

  return (
    <section className="about">
      <div id="about" className="about__container">
        <h2>{aboutHeading}</h2>

        <div className="about__container__textblock-wrapper">
          <p className="dropcap" dangerouslySetInnerHTML={{ __html: aboutDescription1 }} />
        </div>
        <div className="about__container__textblock-wrapper">
          <p dangerouslySetInnerHTML={{ __html: aboutDescription2 }} />
        </div>

        <div className="image-container">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            className="image-wrapper"
            data={{
              ...aboutPicture.responsiveImage
            }}
          />
        </div>

        <div className="about__container__textblock-wrapper">
          <p dangerouslySetInnerHTML={{ __html: aboutDescription3 }} />
        </div>

        <div className="about__container__textblock-wrapper">
          <p dangerouslySetInnerHTML={{ __html: aboutDescription4 }} />
        </div>
      </div>
    </section>
  );
};

export default About;
