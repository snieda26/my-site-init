'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useLocale } from '@/common/hooks';
import { useAuth, useLogin, useRegister } from '@/modules/auth';
import { useForm } from 'react-hook-form';
import { progressService } from '@/modules/progress/services/progress.service';
import { questionsService } from '@/modules/questions/services/questions.service';
import type { LoginFormData, RegisterFormData } from '@/modules/auth/types/auth.types';
import styles from './QuestionActionButtons.module.scss';

interface QuestionActionButtonsProps {
  section: string;
  questionSlug?: string;
}

export const QuestionActionButtons = ({ section, questionSlug }: QuestionActionButtonsProps) => {
  const t = useTranslations('docs.questions');
  const tAuth = useTranslations('auth');
  const locale = useLocale();
  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const login = useLogin({ skipRedirect: true });
  const registerMutation = useRegister({ skipRedirect: true });

  const loginForm = useForm<LoginFormData>({ mode: 'onTouched' });
  const registerForm = useForm<RegisterFormData>({ mode: 'onTouched' });

  // Fetch question data to get the ID
  const { data: questionData } = useQuery({
    queryKey: ['question', questionSlug],
    queryFn: () => questionsService.getQuestionBySlug(questionSlug!),
    enabled: !!questionSlug,
  });

  // Fetch progress for this category
  const { data: progressData } = useQuery({
    queryKey: ['category-progress', section],
    queryFn: () => progressService.getCategoryProgress(section),
    enabled: !!section && isAuthenticated,
    retry: false,
  });

  // Check if current question is marked as completed
  const isMarkedAsRead = progressData?.questions?.find(
    q => q.slug === questionSlug
  )?.status === 'COMPLETED';

  // Mutation to update progress
  const updateProgressMutation = useMutation({
    mutationFn: async (status: 'COMPLETED' | 'NOT_STARTED') => {
      if (!questionData?.id) throw new Error('Question ID not found');
      return progressService.updateProgress({
        questionId: questionData.id,
        status,
      });
    },
    onSuccess: () => {
      // Invalidate progress queries to refetch
      queryClient.invalidateQueries({ queryKey: ['category-progress', section] });
      toast.success(isMarkedAsRead ? 'Unmarked as read' : 'Marked as read!');
    },
    onError: (error: any) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        toast.error('Please sign in to track progress');
        setShowAuthModal(true);
      } else {
        toast.error('Failed to update progress');
      }
    },
  });

  const handleMarkAsRead = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    const newStatus = isMarkedAsRead ? 'NOT_STARTED' : 'COMPLETED';
    updateProgressMutation.mutate(newStatus);
  };

  const handleLoginSubmit = (data: LoginFormData) => {
    login.mutate(data, {
      onSuccess: () => {
        setShowAuthModal(false);
        loginForm.reset();
      },
    });
  };

  const handleRegisterSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        setShowAuthModal(false);
        registerForm.reset();
      },
    });
  };

  const closeModal = () => {
    setShowAuthModal(false);
    setAuthMode('login');
    loginForm.reset();
    registerForm.reset();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttons}>
          {/* Practice Problems Button */}
          <Link
            href={`/problems/${section}-problems/${locale}`}
            className={styles.practiceButton}
          >
            <span className={styles.buttonGlow} />
            <span className={styles.buttonContent}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
              >
                <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
              </svg>
              <span>{t('actions.practiceProblems', { section: section.charAt(0).toUpperCase() + section.slice(1) })}</span>
            </span>
            <span className={styles.buttonShine} />
          </Link>

          {/* Mark as Read Button */}
          <button
            className={`${styles.markReadButton} ${isMarkedAsRead ? styles.marked : ''}`}
            onClick={handleMarkAsRead}
            disabled={updateProgressMutation.isPending || authLoading}
          >
            <span className={styles.buttonBorder} />
            <span className={styles.buttonContent}>
              {updateProgressMutation.isPending ? (
                <svg className={styles.spinner} viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="60" strokeDashoffset="20" />
                </svg>
              ) : isMarkedAsRead ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.icon}
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.icon}
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              )}
              <span>
                {isMarkedAsRead ? t('actions.markedAsRead') : t('actions.markAsRead')}
              </span>
            </span>
          </button>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
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
                    <label htmlFor="reg-confirm-password">{locale === 'ua' ? 'Підтвердіть пароль' : 'Confirm Password'}</label>
                    <input
                      id="reg-confirm-password"
                      type="password"
                      placeholder={locale === 'ua' ? 'Підтвердіть пароль' : 'Confirm your password'}
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
                    <span>{locale === 'ua' ? 'Немає акаунту?' : "Don't have an account?"}</span>
                    <button type="button" onClick={() => setAuthMode('register')}>
                      {locale === 'ua' ? 'Зареєструватися' : 'Sign up'}
                    </button>
                  </>
                ) : (
                  <>
                    <span>{locale === 'ua' ? 'Вже є акаунт?' : 'Already have an account?'}</span>
                    <button type="button" onClick={() => setAuthMode('login')}>
                      {locale === 'ua' ? 'Увійти' : 'Sign in'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
