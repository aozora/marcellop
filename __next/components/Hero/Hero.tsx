/* eslint-disable react/no-array-index-key,react/no-danger */
import React from 'react';
import { HeroData } from '../../../src/types/index';
import styles from './Hero.module.scss';

const Hero = ({ hi, heading1, heading2A, heading2B, heading2C }: HeroData): JSX.Element => (
  <section className={styles.Hero}>
    {/*{hi && <p className="hi">{hi}</p>}*/}
    <h1>
      {heading1}
      <br />
      Design Engineer
    </h1>

    {/*<p>*/}
    {/*  <span>{heading2A}</span>*/}
    {/*  <span>{heading2B}</span>*/}
    {/*  <span>{heading2C}</span>*/}
    {/*</p>*/}
  </section>
);

export default Hero;
