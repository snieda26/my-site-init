'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { LuMenu, LuX, LuSearch } from 'react-icons/lu';
import { FiSun, FiMoon, FiBarChart2, FiLogOut } from 'react-icons/fi';
import { useLocale, useLocalePath } from '@/common/hooks';
// import { useTheme } from '@/common/hooks';
// import { useAuth, useLogout } from '@/modules/auth/hooks/use-auth';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import styles from './LandingNavbar.module.scss';

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const localePath = useLocalePath();
  
  // Commented out for now - uncomment when needed
  // const { theme, toggleTheme } = useTheme();
  // const { user, isAuthenticated, isLoading } = useAuth();
  // const logout = useLogout();
  // const [userMenuOpen, setUserMenuOpen] = useState(false);
  // const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Commented out - uncomment when user menu is needed
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
  //       setUserMenuOpen(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href={`/${locale}`} className={styles.logo}>
            <div className={styles.logoIcon}>
              <span>D</span>
            </div>
            <span className={styles.logoText}>ITLead</span>
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

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle - Commented out for now */}
          {/* <button
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button> */}

          {/* User Menu - Commented out for now */}
          {/* {isLoading ? (
            <div className={styles.avatarSkeleton} />
          ) : isAuthenticated ? (
            <div className={styles.userMenu} ref={userMenuRef}>
              <button
                className={styles.avatarBtn}
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-label="User menu"
              >
                <img
                  src={user?.avatarUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=128'}
                  alt={user?.name || 'User'}
                  className={styles.avatar}
                />
              </button>
              
              {userMenuOpen && (
                <div className={styles.dropdown}>
                  <Link
                    href={localePath('/dashboard')}
                    className={styles.dropdownItem}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FiBarChart2 size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    className={styles.dropdownItem}
                    onClick={() => {
                      logout.mutate();
                      setUserMenuOpen(false);
                    }}
                  >
                    <FiLogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : ( */}
            <Link href={localePath('/auth/login')} className={styles.loginLink}>
              Увійти
            </Link>
            <Link href={localePath('/auth/register')} className={styles.signupBtn}>
              Реєстрація
            </Link>
          {/* )} */}
        </div>

        {/* Mobile controls: Language Switcher + Burger Menu */}
        <div className={styles.mobileControls}>
          <div className={styles.mobileLanguageSwitcher}>
            <LanguageSwitcher />
          </div>
          <button 
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
          </button>
        </div>
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

          {/* Mobile Menu - Auth or User Links */}
          {/* {isAuthenticated ? (
            <>
              <Link href={localePath('/dashboard')} className={styles.mobileNavLink} onClick={closeMobileMenu}>
                Dashboard
              </Link>
              <button
                className={styles.mobileNavLink}
                onClick={() => {
                  logout.mutate();
                  closeMobileMenu();
                }}
              >
                Logout
              </button>
            </>
          ) : ( */}
            <>
              <Link href={localePath('/auth/login')} className={styles.mobileLoginLink} onClick={closeMobileMenu}>
                Увійти
              </Link>
              <Link href={localePath('/auth/register')} className={styles.mobileSignupBtn} onClick={closeMobileMenu}>
                Реєстрація
              </Link>
            </>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
};
