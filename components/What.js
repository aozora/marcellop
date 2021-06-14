import React, { useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const What = ({ whatido }) => {
  const itemsRef = useRef();
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (!isClient) return;

    // ScrollTrigger & Parallax for covers
    const slides = document.querySelectorAll('#whatido .whatido__item');

    slides.forEach(slide => {
      const imageWrappers = slide.querySelector('.image-wrapper');

      const tl = gsap.timeline({
        paused: true,
        scrollTrigger: {
          trigger: slide,
          start: '40% 50%' // position of trigger meets the scroller position
        }
      });

      tl.from(slide.querySelectorAll('.whatido__title span'), {
        ease: 'power4',
        y: '+=5vh',
        duration: 2.5
      }).from(
        slide.querySelectorAll('.whatido__description span'),
        {
          y: '-100%',
          duration: 2,
          ease: 'power4'
        },
        0.4
      );

      tl.play();

      gsap.fromTo(
        imageWrappers,
        {
          y: '-30vh'
        },
        {
          y: '30vh',
          scrollTrigger: {
            trigger: slide,
            scrub: true,
            start: 'top bottom' // position of trigger meets the scroller position
          },
          ease: 'none'
        }
      );
    });
  }, [isClient]);

  return (
    <article id="whatido" className="whatido">
      <h2>{whatido.heading}</h2>

      <section ref={itemsRef} className="whatido__items">
        {whatido &&
          whatido.items &&
          whatido.items.map(item => (
            <Fragment key={item.title}>
              <div className="whatido__item">
                <div className="whatido__item-container">
                  <div className="whatido__item-content">
                    <p className="whatido__title">
                      <span>{item.title}</span>
                    </p>
                    <p className="whatido__description">
                      <span>{item.description}</span>
                    </p>
                  </div>
                  <figure>
                    {item.cover && (
                      <div className="image-wrapper">
                        <picture>
                          <source
                            srcSet={item.cover.responsiveImage.webpSrcSet}
                            sizes={item.cover.responsiveImage.sizes}
                            type="image/webp"
                          />
                          <source
                            srcSet={item.cover.responsiveImage.srcSet}
                            sizes={item.cover.responsiveImage.sizes}
                          />
                          <img
                            alt={item.cover.responsiveImage.alt}
                            src={item.cover.responsiveImage.src}
                          />
                        </picture>
                      </div>
                    )}
                  </figure>
                </div>
              </div>
            </Fragment>
          ))}
      </section>
    </article>
  );
};

What.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  whatido: PropTypes.object.isRequired
};

export default What;
