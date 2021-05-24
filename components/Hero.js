import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { letterContainerVariants, letterVariants } from '@/lib/motionShared';

const Hero = ({ hero }) => (
  <section className="hero">
    {hero.hi && <p className="hi">{hero.hi}</p>}
    <h1>{hero.heading1}</h1>
    {/* <motion.h1 */}
    {/*  initial="before" */}
    {/*  animate="after" */}
    {/*  variants={letterContainerVariants} */}
    {/*  className="splitting" */}
    {/*  data-splitting */}
    {/*  aria-label={hero.heading1} */}
    {/* > */}
    {/*  {hero.heading1.split(' ').map((word, wordIndex) => ( */}
    {/*    <span key={wordIndex} className="word"> */}
    {/*      {Array.from(word).map((char, index) => ( */}
    {/*        <motion.span */}
    {/*          key={index} */}
    {/*          variants={letterVariants} */}
    {/*          aria-hidden="true" */}
    {/*          className="char" */}
    {/*          dangerouslySetInnerHTML={{ */}
    {/*            __html: char === ' ' ? '&nbsp;' : char */}
    {/*          }} */}
    {/*        /> */}
    {/*      ))} */}
    {/*      &nbsp; */}
    {/*    </span> */}
    {/*  ))} */}
    {/* </motion.h1> */}

    <p>
      <span>{hero.heading2A}</span>
      <span>{hero.heading2B}</span>
      <span>{hero.heading2C}</span>
    </p>
  </section>
);

Hero.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  hero: PropTypes.object.isRequired
};

export default Hero;
