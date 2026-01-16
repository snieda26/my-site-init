'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import styles from './LoginForm.module.scss';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const t = useTranslations('auth.register');
  const tValidation = useTranslations('auth.validation');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    // TODO: Implement registration logic
    console.log('Register attempt:', data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>
            {t('name')}
          </label>
          <input
            id="name"
            type="text"
            placeholder={t('namePlaceholder')}
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            aria-invalid={errors.name ? 'true' : 'false'}
            {...register('name', {
              required: tValidation('nameRequired'),
              minLength: {
                value: 2,
                message: tValidation('nameMinLength'),
              },
              maxLength: {
                value: 50,
                message: tValidation('nameMaxLength'),
              },
            })}
          />
          {errors.name && (
            <span className={styles.errorMessage} role="alert">
              {errors.name.message}
            </span>
          )}
        </div>

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
                value: 8,
                message: tValidation('passwordMinLengthRegister'),
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: tValidation('passwordComplexity'),
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
