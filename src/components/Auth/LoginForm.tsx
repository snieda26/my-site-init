'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import styles from './LoginForm.module.scss';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const t = useTranslations('auth.login');
  const tValidation = useTranslations('auth.validation');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    // TODO: Implement login logic
    console.log('Login attempt:', data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t('emailPlaceholder')}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: tValidation('emailRequired'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: tValidation('emailInvalid'),
              },
            })}
          />
          {errors.email && (
            <span className={styles.errorMessage} role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            {t('password')}
          </label>
          <input
            id="password"
            type="password"
            placeholder={t('passwordPlaceholder')}
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', {
              required: tValidation('passwordRequired'),
              minLength: {
                value: 6,
                message: tValidation('passwordMinLength'),
              },
            })}
          />
          {errors.password && (
            <span className={styles.errorMessage} role="alert">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>

      <button 
        type="submit" 
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? tValidation('submitting') : t('submit')}
      </button>
    </form>
  );
};
