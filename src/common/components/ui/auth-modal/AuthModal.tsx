'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useLocale } from '@/common/hooks';
import { useLogin, useRegister } from '@/modules/auth';
import type { LoginFormData, RegisterFormData } from '@/modules/auth/types/auth.types';
import styles from './AuthModal.module.scss';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const locale = useLocale();
  const tAuth = useTranslations('auth');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const login = useLogin({ skipRedirect: true });
  const registerMutation = useRegister({ skipRedirect: true });

  const loginForm = useForm<LoginFormData>({ mode: 'onTouched' });
  const registerForm = useForm<RegisterFormData>({ mode: 'onTouched' });

  const handleLoginSubmit = (data: LoginFormData) => {
    login.mutate(data, {
      onSuccess: () => {
        onClose();
        loginForm.reset();
        onSuccess?.();
      },
    });
  };

  const handleRegisterSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        onClose();
        registerForm.reset();
        onSuccess?.();
      },
    });
  };

  const handleClose = () => {
    onClose();
    setAuthMode('login');
    loginForm.reset();
    registerForm.reset();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={handleClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {authMode === 'login' ? tAuth('login.welcome') : tAuth('register.createAccount')}
          </h2>
          <p className={styles.modalSubtitle}>
            {authMode === 'login' 
              ? (locale === 'ua' ? 'Увійдіть, щоб відстежувати прогрес' : 'Sign in to track your progress')
              : (locale === 'ua' ? 'Створіть акаунт, щоб почати' : 'Create an account to get started')
            }
          </p>
        </div>

        <div className={styles.modalBody}>
          {authMode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className={styles.authForm}>
              {login.error && (
                <div className={styles.formError}>
                  {login.error?.response?.data?.message || login.error?.message}
                </div>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="email">{tAuth('login.email')}</label>
                <input
                  id="email"
                  type="email"
                  placeholder={tAuth('login.emailPlaceholder')}
                  {...loginForm.register('email', { required: true })}
                  className={loginForm.formState.errors.email ? styles.inputError : ''}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">{tAuth('login.password')}</label>
                <input
                  id="password"
                  type="password"
                  placeholder={tAuth('login.passwordPlaceholder')}
                  {...loginForm.register('password', { required: true })}
                  className={loginForm.formState.errors.password ? styles.inputError : ''}
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={login.isPending}
              >
                {login.isPending ? (
                  <svg className={styles.spinner} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="60" strokeDashoffset="20" />
                  </svg>
                ) : tAuth('login.submit')}
              </button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} className={styles.authForm}>
              {registerMutation.error && (
                <div className={styles.formError}>
                  {registerMutation.error?.response?.data?.message || registerMutation.error?.message}
                </div>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="name">{tAuth('register.name')}</label>
                <input
                  id="name"
                  type="text"
                  placeholder={tAuth('register.namePlaceholder')}
                  {...registerForm.register('name', { required: true })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="reg-email">{tAuth('register.email')}</label>
                <input
                  id="reg-email"
                  type="email"
                  placeholder={tAuth('register.emailPlaceholder')}
                  {...registerForm.register('email', { required: true })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="reg-password">{tAuth('register.password')}</label>
                <input
                  id="reg-password"
                  type="password"
                  placeholder={tAuth('register.passwordPlaceholder')}
                  {...registerForm.register('password', { required: true })}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="reg-confirm-password">{tAuth('register.confirmPassword')}</label>
                <input
                  id="reg-confirm-password"
                  type="password"
                  placeholder={tAuth('register.confirmPasswordPlaceholder')}
                  {...registerForm.register('confirmPassword', { required: true })}
                />
              </div>

              <button 
                type="submit" 
                className={styles.submitButton}
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? (
                  <svg className={styles.spinner} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="60" strokeDashoffset="20" />
                  </svg>
                ) : tAuth('register.submit')}
              </button>
            </form>
          )}

          <div className={styles.authSwitch}>
            {authMode === 'login' ? (
              <>
                <span>{tAuth('login.noAccount')}</span>
                <button type="button" onClick={() => setAuthMode('register')}>
                  {tAuth('signUp')}
                </button>
              </>
            ) : (
              <>
                <span>{tAuth('register.haveAccount')}</span>
                <button type="button" onClick={() => setAuthMode('login')}>
                  {tAuth('signIn')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
