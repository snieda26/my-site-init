'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FiTwitter, FiYoutube, FiLinkedin, FiGithub } from 'react-icons/fi';
import { useLocale, useLocalePath } from '@/common/hooks';
import styles from './LandingFooter.module.scss';

export const LandingFooter: React.FC = () => {
  const t = useTranslations('landing.footer');
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
              {t('description')}
            </p>
            <div className={styles.socials}>
              <SocialIcon icon={<FiTwitter size={20} />} />
              <SocialIcon icon={<FiYoutube size={20} />} />
              <SocialIcon icon={<FiLinkedin size={20} />} />
              <SocialIcon icon={<FiGithub size={20} />} />
            </div>
          </div>
          
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>{t('products')}</h4>
            <ul className={styles.linksList}>
              <li>
                <Link href={localePath('/interview-questions')} className={styles.link}>
                  {t('questions')}
                </Link>
              </li>
              <li>
                <Link href={localePath('/problems')} className={styles.link}>
                  {t('problems')}
                </Link>
              </li>
              <li>
                <Link href={localePath('/check-knowledge')} className={styles.link}>
                  {t('knowledgeCheck')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>{t('copyright')}</p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>{t('terms')}</a>
            <a href="#" className={styles.legalLink}>{t('privacy')}</a>
            <a href="#" className={styles.legalLink}>{t('security')}</a>
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
