'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LuMenu, LuX, LuSearch } from 'react-icons/lu';
import { useLocale, useLocalePath } from '@/common/hooks';
import styles from './LandingNavbar.module.scss';

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const localePath = useLocalePath();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href={`/${locale}`} className={styles.logo}>
            <div className={styles.logoIcon}>
              <span>D</span>
            </div>
            <span className={styles.logoText}>DevPrep</span>
          </Link>
          
          <div className={styles.desktopMenu}>
            <Link href={localePath('/interview-questions')} className={styles.navLink}>
              Питання
            </Link>
            <Link href={localePath('/problems')} className={styles.navLink}>
              Задачі
            </Link>
            <Link href={localePath('/check-knowledge')} className={styles.navLink}>
              Перевірка знань
            </Link>
          </div>
        </div>

        <div className={styles.right}>
          <button className={styles.searchBtn}>
            <LuSearch size={20} />
          </button>
          <Link href={localePath('/auth/login')} className={styles.loginLink}>
            Увійти
          </Link>
          <Link href={localePath('/auth/register')} className={styles.signupBtn}>
            Реєстрація
          </Link>
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
          <Link href={localePath('/interview-questions')} className={styles.mobileNavLink} onClick={closeMobileMenu}>
            Питання
          </Link>
          <Link href={localePath('/problems')} className={styles.mobileNavLink} onClick={closeMobileMenu}>
            Задачі
          </Link>
          <Link href={localePath('/check-knowledge')} className={styles.mobileNavLink} onClick={closeMobileMenu}>
            Перевірка знань
          </Link>
          <hr className={styles.divider} />
          <Link href={localePath('/auth/login')} className={styles.mobileLoginLink} onClick={closeMobileMenu}>
            Увійти
          </Link>
          <Link href={localePath('/auth/register')} className={styles.mobileSignupBtn} onClick={closeMobileMenu}>
            Реєстрація
          </Link>
        </div>
      </div>
    </nav>
  );
};
