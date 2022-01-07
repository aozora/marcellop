/* eslint-disable react/no-array-index-key,react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

const Hero = ({ hero }): JSX.Element => (
  <section className="hero">
    {hero.hi && <p className="hi">{hero.hi}</p>}
    <h1>{hero.heading1}</h1>

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
