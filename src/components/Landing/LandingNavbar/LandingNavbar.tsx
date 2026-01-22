'use client';

import React, { useState, useEffect } from 'react';
import { LuMenu, LuX, LuChevronDown, LuSearch } from 'react-icons/lu';
import styles from './LandingNavbar.module.scss';

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <a href="#" className={styles.logo}>
            <div className={styles.logoIcon}>
              <span>D</span>
            </div>
            <span className={styles.logoText}>DevPrep</span>
          </a>
          
          <div className={styles.desktopMenu}>
            <NavLink label="Courses" hasDropdown />
            <NavLink label="Questions" hasDropdown />
            <NavLink label="Practice" />
            <NavLink label="Coaching" hasDropdown />
            <NavLink label="Pricing" />
          </div>
        </div>

        <div className={styles.right}>
          <button className={styles.searchBtn}>
            <LuSearch size={20} />
          </button>
          <a href="#" className={styles.loginLink}>Log in</a>
          <a href="#" className={styles.signupBtn}>
            Sign up
          </a>
        </div>

        <button 
          className={styles.mobileMenuBtn}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuContent}>
          <MobileNavLink label="Courses" />
          <MobileNavLink label="Questions" />
          <MobileNavLink label="Practice" />
          <MobileNavLink label="Coaching" />
          <MobileNavLink label="Pricing" />
          <hr className={styles.divider} />
          <a href="#" className={styles.mobileLoginLink}>Log in</a>
          <a href="#" className={styles.mobileSignupBtn}>Sign up</a>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ label: string; hasDropdown?: boolean }> = ({ label, hasDropdown }) => (
  <a href="#" className={styles.navLink}>
    <span>{label}</span>
    {hasDropdown && <LuChevronDown size={14} className={styles.chevron} />}
  </a>
);

const MobileNavLink: React.FC<{ label: string }> = ({ label }) => (
  <a href="#" className={styles.mobileNavLink}>
    {label}
  </a>
);
