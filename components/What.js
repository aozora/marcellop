import React, { useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import gsap from 'gsap';
// import { Image } from 'react-datocms';
import Image from 'next/image';

const What = ({ whatido }) => {
  const itemsRef = useRef();
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (!isClient) return;

    const slides = document.querySelectorAll('#whatido .whatido__item');

    slides.forEach(slide => {
      const imageWrappers = slide.querySelector('.image-wrapper');

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
                    <p className="whatido__title">{item.title}</p>
                    <p className="whatido__description">{item.description}</p>
                  </div>
                  <figure>
                    {/*  <Image */}
                    {/*    lazyLoad={false} */}
                    {/*    className="image-wrapper" */}
                    {/*    data={{ */}
                    {/*      ...item.cover.responsiveImage */}
                    {/*    }} */}
                    {/*  /> */}
                    {item.cover && (
                      <div className="image-wrapper">
                        <img
                          alt={item.cover.responsiveImage.alt}
                          src={item.cover.responsiveImage.src}
                        />
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
