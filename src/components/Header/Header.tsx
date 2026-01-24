'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { LuMenu, LuX } from 'react-icons/lu';
import { FiBarChart2, FiLogOut, FiSettings } from 'react-icons/fi';
import { useTranslations } from 'next-intl';
import { useLocale, useLocalePath } from '@/common/hooks';
import { useAuth, useLogout } from '@/modules/auth/hooks/use-auth';
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher';
import styles from './Header.module.scss';

export const Header: React.FC = () => {
  const t = useTranslations('landing.navbar');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const locale = useLocale();
  const localePath = useLocalePath();
  const { user, isAuthenticated, isLoading } = useAuth();
  const logout = useLogout();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    
    // Check initial scroll position on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
            <span className={styles.logoText}>ITLead</span>
          </Link>
          
          <div className={styles.desktopMenu}>
            <Link href={localePath('/interview-questions')} className={styles.navLink}>
              {t('questions')}
            </Link>
            <Link href={localePath('/problems')} className={styles.navLink}>
              {t('problems')}
            </Link>
            <Link href={localePath('/check-knowledge')} className={styles.navLink}>
              {t('knowledgeCheck')}
            </Link>
          </div>
        </div>

        <div className={styles.right}>
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* User Menu */}
          {isLoading ? (
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
                  <div className={styles.dropdownHeader}>
                    <div className={styles.userInfo}>
                      <span className={styles.userName}>{user?.name}</span>
                      <span className={styles.userEmail}>{user?.email}</span>
                    </div>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <Link
                    href={localePath('/dashboard')}
                    className={styles.dropdownItem}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FiBarChart2 size={18} />
                    <span>{locale === 'ua' ? 'Панель керування' : 'Dashboard'}</span>
                  </Link>
                  <Link
                    href={localePath('/settings')}
                    className={styles.dropdownItem}
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <FiSettings size={18} />
                    <span>{locale === 'ua' ? 'Налаштування' : 'Settings'}</span>
                  </Link>
                  <div className={styles.dropdownDivider} />
                  <button
                    className={styles.dropdownItem}
                    onClick={() => {
                      logout.mutate();
                      setUserMenuOpen(false);
                    }}
                  >
                    <FiLogOut size={18} />
                    <span>{locale === 'ua' ? 'Вийти' : 'Logout'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href={localePath('/auth/login')} className={styles.loginLink}>
                {t('login')}
              </Link>
              <Link href={localePath('/auth/register')} className={styles.signupBtn}>
                {t('signup')}
              </Link>
            </>
          )}
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
          <div className={styles.mobileMenuNav}>
            <Link href={localePath('/interview-questions')} className={styles.mobileNavLink} onClick={closeMobileMenu}>
              {t('questions')}
            </Link>
            <Link href={localePath('/problems')} className={styles.mobileNavLink} onClick={closeMobileMenu}>
              {t('problems')}
            </Link>
            <Link href={localePath('/check-knowledge')} className={styles.mobileNavLink} onClick={closeMobileMenu}>
              {t('knowledgeCheck')}
            </Link>
          </div>

          {/* Mobile Menu - Auth or User Links */}
          <div className={styles.mobileMenuAuth}>
            <hr className={styles.divider} />
            {isAuthenticated ? (
              <>
                {user && (
                  <div className={styles.mobileUserInfo}>
                    <div className={styles.mobileAvatar}>
                      <img
                        src={user.avatarUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=128'}
                        alt={user.name || 'User'}
                      />
                    </div>
                    <div className={styles.mobileUserDetails}>
                      <span className={styles.mobileUserName}>{user.name}</span>
                      <span className={styles.mobileUserEmail}>{user.email}</span>
                    </div>
                  </div>
                )}
                <Link href={localePath('/dashboard')} className={styles.mobileNavLink} onClick={closeMobileMenu}>
                  <FiBarChart2 size={20} />
                  <span>{locale === 'ua' ? 'Панель керування' : 'Dashboard'}</span>
                </Link>
                <Link href={localePath('/settings')} className={styles.mobileNavLink} onClick={closeMobileMenu}>
                  <FiSettings size={20} />
                  <span>{locale === 'ua' ? 'Налаштування' : 'Settings'}</span>
                </Link>
                <button
                  className={styles.mobileNavLink}
                  onClick={() => {
                    logout.mutate();
                    closeMobileMenu();
                  }}
                >
                  <FiLogOut size={20} />
                  <span>{locale === 'ua' ? 'Вийти' : 'Logout'}</span>
                </button>
              </>
            ) : (
              <>
                <Link href={localePath('/auth/login')} className={styles.mobileLoginLink} onClick={closeMobileMenu}>
                  {t('login')}
                </Link>
                <Link href={localePath('/auth/register')} className={styles.mobileSignupBtn} onClick={closeMobileMenu}>
                  {t('signup')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
