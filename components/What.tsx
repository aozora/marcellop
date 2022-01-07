import React, { useRef, Fragment } from 'react';
import { WhatidoData } from '@/types/index';

const What = ({ heading, items }: WhatidoData): JSX.Element => {
  const itemsRef = useRef();
  // const isClient = typeof window !== 'undefined';

  // useEffect(() => {
  //   if (!isClient) return;
  //
  //   // ScrollTrigger & Parallax for covers
  //   const slides = document.querySelectorAll('#whatido .whatido__item');
  //
  //   slides.forEach(slide => {
  //     const imageWrappers = slide.querySelector('.image-wrapper');
  //
  //     // const tl = gsap.timeline({
  //     //   scrollTrigger: {
  //     //     trigger: slide,
  //     //     start: '40% 50%' // position of trigger meets the scroller position
  //     //   }
  //     // });
  //
  //     gsap.from(slide.querySelectorAll('.whatido__title span'), {
  //       ease: 'power4',
  //       y: '-100%',
  //       duration: 2.2,
  //       scrollTrigger: {
  //         trigger: slide,
  //         start: '40% 50%' // position of trigger meets the scroller position
  //       }
  //     });
  //     gsap.from(slide.querySelectorAll('.whatido__description span'), {
  //       y: '+100%',
  //       duration: 2.5,
  //       delay: 0.2,
  //       ease: 'power4',
  //       scrollTrigger: {
  //         trigger: slide,
  //         start: '40% 50%' // position of trigger meets the scroller position
  //       }
  //     });
  //
  //     gsap.fromTo(
  //       imageWrappers,
  //       {
  //         y: '-30vh'
  //       },
  //       {
  //         y: '30vh',
  //         scrollTrigger: {
  //           trigger: slide,
  //           scrub: true,
  //           start: 'top bottom' // position of trigger meets the scroller position
  //         },
  //         ease: 'none'
  //       }
  //     );
  //   });
  // }, [isClient]);

  return (
    <article id="whatido" className="whatido">
      <h2>{heading}</h2>

      <section ref={itemsRef} className="whatido__items">
        {items &&
          items.map(item => (
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
                  <figure role="presentation">
                    {item.cover && (
                      <div className="image-wrapper">
                        <picture>
                          <source
                            srcSet={item.cover.responsiveImage.webpSrcSet}
                            sizes={item.cover.responsiveImage.sizes}
                            type="image/webp"
                          />
                          <source srcSet={item.cover.responsiveImage.srcSet} sizes={item.cover.responsiveImage.sizes} />
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img alt="" src={item.cover.responsiveImage.src} />
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

export default What;
