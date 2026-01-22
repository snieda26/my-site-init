'use client';

import React from 'react';
import styles from './LandingCTA.module.scss';

export const LandingCTA: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Ready to land your <span className={styles.highlight}>dream job?</span>
      </h2>
      <button className={styles.button}>
        <span className={styles.buttonText}>Start Your Journey — It's Free</span>
        <div className={styles.shimmer}></div>
      </button>
    </section>
  );
};
