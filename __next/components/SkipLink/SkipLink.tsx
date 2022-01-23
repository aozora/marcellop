import React from 'react';
import styles from './SkipLink.module.scss';

export const SkipLink = (): JSX.Element => {
  return (
    <a href="#main" tabIndex={0} className={styles.SkipLink}>
      Skip to main content
    </a>
  );
};
