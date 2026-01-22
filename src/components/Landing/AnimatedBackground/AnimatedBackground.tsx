'use client';

import React from 'react';
import styles from './AnimatedBackground.module.scss';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className={styles.background}>
      {/* Deep Dark Foundation */}
      <div className={styles.foundation}></div>
      
      {/* Static Grid for Precision Feel */}
      <div className={styles.grid}></div>
      
      {/* Scanning Beams */}
      <div className={styles.beam} style={{ left: '20%', animationDelay: '0s' }}></div>
      <div className={styles.beam} style={{ left: '50%', animationDelay: '3s' }}></div>
      <div className={styles.beam} style={{ left: '80%', animationDelay: '6s' }}></div>
      
      {/* Floating Orbital Light Beams */}
      <div className={styles.orbitalPrimary}></div>
      <div className={styles.orbitalSecondary}></div>
      
      {/* Atmospheric Beams */}
      <div className={styles.atmosphericWhite}></div>
      <div className={styles.atmosphericIndigo}></div>

      {/* Subtle Noise Texture for Depth */}
      <div className={styles.noise}></div>
    </div>
  );
};
