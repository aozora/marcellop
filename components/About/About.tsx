import React from 'react';
import { Image } from 'react-datocms';
import { AboutData } from '@/types/index';
import styles from './About.module.scss';

const About = ({
  aboutHeading,
  aboutDescription1,
  aboutDescription2,
  aboutDescription3,
  aboutDescription4,
  aboutPicture
}: AboutData): JSX.Element => {
  return (
    <section className={styles.About}>
      <div id="about" className={styles.AboutContainer}>
        <h2>{aboutHeading}</h2>

        <div className={styles.ImageContainer}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            className={styles.ImageWrapper}
            data={{
              ...aboutPicture.responsiveImage
            }}
          />
        </div>

        <div className={styles.AboutContainerTextblockWrapper}>
          <p className="dropcap" dangerouslySetInnerHTML={{ __html: aboutDescription1 }} />
        </div>
        <div className={styles.AboutContainerTextblockWrapper}>
          <p dangerouslySetInnerHTML={{ __html: aboutDescription2 }} />
        </div>

        <div className={styles.AboutContainerTextblockWrapper}>
          <p dangerouslySetInnerHTML={{ __html: aboutDescription3 }} />
        </div>

        <div className={styles.AboutContainerTextblockWrapper}>
          <p dangerouslySetInnerHTML={{ __html: aboutDescription4 }} />
        </div>
      </div>
    </section>
  );
};

export default About;
