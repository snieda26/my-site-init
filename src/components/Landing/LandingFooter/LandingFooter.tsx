'use client';

import React from 'react';
import Link from 'next/link';
import { FiTwitter, FiYoutube, FiLinkedin, FiGithub } from 'react-icons/fi';
import { useLocale, useLocalePath } from '@/common/hooks';
import styles from './LandingFooter.module.scss';

export const LandingFooter: React.FC = () => {
  const locale = useLocale();
  const localePath = useLocalePath();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <Link href={`/${locale}`} className={styles.logo}>
              <div className={styles.logoIcon}>
                <span>D</span>
              </div>
              <span className={styles.logoText}>ITLead</span>
            </Link>
            <p className={styles.brandDescription}>
              Надихаємо нове покоління інженерів будувати краще майбутнє, одна співбесіда за раз!
            </p>
            <div className={styles.socials}>
              <SocialIcon icon={<FiTwitter size={20} />} />
              <SocialIcon icon={<FiYoutube size={20} />} />
              <SocialIcon icon={<FiLinkedin size={20} />} />
              <SocialIcon icon={<FiGithub size={20} />} />
            </div>
          </div>
          
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Продукти</h4>
            <ul className={styles.linksList}>
              <li>
                <Link href={localePath('/interview-questions')} className={styles.link}>
                  Питання
                </Link>
              </li>
              <li>
                <Link href={localePath('/problems')} className={styles.link}>
                  Задачі
                </Link>
              </li>
              <li>
                <Link href={localePath('/check-knowledge')} className={styles.link}>
                  Перевірка знань
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2024 ITLead Inc. Всі права захищені.</p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Умови використання</a>
            <a href="#" className={styles.legalLink}>Політика конфіденційності</a>
            <a href="#" className={styles.legalLink}>Безпека</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialIconProps {
  icon: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon }) => (
  <a href="#" className={styles.socialIcon}>
    {icon}
  </a>
);
