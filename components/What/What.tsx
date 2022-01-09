import React, { useRef, Fragment } from 'react';
import { WhatidoData } from '@/types/index';
import styles from './What.module.scss';

const What = ({ heading, items }: WhatidoData): JSX.Element => {
  const itemsRef = useRef();
  // const isClient = typeof window !== 'undefined';

  return (
    <article id="whatido" className={styles.whatido}>
      <h2>{heading}</h2>

      <section ref={itemsRef} className={styles.whatido__items}>
        {items &&
          items.map(item => (
            <Fragment key={item.title}>
              <div className={styles.whatido__item}>
                <div className={styles.WhatidoItemContainer}>
                  <div className={styles.WhatidoItemContent}>
                    <p className={styles.whatido__title}>
                      <span>{item.title}</span>
                    </p>
                    <p className={styles.whatido__description}>
                      <span>{item.description}</span>
                    </p>
                  </div>
                  <figure role="presentation" className={styles.Figure}>
                    {item.cover && (
                      <div className={styles.ImageWrapper}>
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
