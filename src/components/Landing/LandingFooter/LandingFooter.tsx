'use client';

import React from 'react';
import { FiTwitter, FiYoutube, FiLinkedin, FiGithub } from 'react-icons/fi';
import styles from './LandingFooter.module.scss';

export const LandingFooter: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandColumn}>
            <a href="#" className={styles.logo}>
              <div className={styles.logoIcon}>
                <span>D</span>
              </div>
              <span className={styles.logoText}>DevPrep</span>
            </a>
            <p className={styles.brandDescription}>
              Empowering the next generation of engineers to build a better future, one interview at a time.
            </p>
            <div className={styles.socials}>
              <SocialIcon icon={<FiTwitter size={20} />} />
              <SocialIcon icon={<FiYoutube size={20} />} />
              <SocialIcon icon={<FiLinkedin size={20} />} />
              <SocialIcon icon={<FiGithub size={20} />} />
            </div>
          </div>
          
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Products</h4>
            <FooterLinks links={['Pricing', 'Courses', 'Coaching', 'Mock Interviews', 'Referrals']} />
          </div>
          
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Roles</h4>
            <FooterLinks links={['Software Engineer', 'Product Manager', 'System Design', 'Data Science', 'ML Engineer']} />
          </div>
          
          <div className={styles.linksColumn}>
            <h4 className={styles.columnTitle}>Company</h4>
            <FooterLinks links={['About', 'Reviews', 'Blog', 'Contact', 'Privacy']} />
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p className={styles.copyright}>© 2024 DevPrep Inc. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <a href="#" className={styles.legalLink}>Security</a>
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

interface FooterLinksProps {
  links: string[];
}

const FooterLinks: React.FC<FooterLinksProps> = ({ links }) => (
  <ul className={styles.linksList}>
    {links.map((link) => (
      <li key={link}>
        <a href="#" className={styles.link}>
          {link}
        </a>
      </li>
    ))}
  </ul>
);
