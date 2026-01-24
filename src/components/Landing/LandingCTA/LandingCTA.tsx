'use client';

import React from 'react';
import styles from './LandingCTA.module.scss';

export const LandingCTA: React.FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>
        Готовий отримати <span className={styles.highlight}>роботу мрії?</span>
      </h2>
      <button className={styles.button}>
        <span className={styles.buttonText}>Приєднюйся — Це безкоштовно!</span>
        <div className={styles.shimmer}></div>
      </button>
    </section>
  );
};
