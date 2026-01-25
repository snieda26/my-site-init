'use client';

import { useState, FormEvent } from 'react';
import { useRegister } from '@/modules/auth/hooks/use-auth';
import styles from './AuthModal.module.scss';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const registerMutation = useRegister();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await registerMutation.mutateAsync({ email, username, password });
      onSuccess?.();
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="register-email" className={styles.label}>
          Email
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className={styles.input}
          required
          autoComplete="email"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="register-username" className={styles.label}>
          Ім'я
        </label>
        <input
          id="register-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className={styles.input}
          required
          autoComplete="username"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="register-password" className={styles.label}>
          Пароль
        </label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className={styles.input}
          required
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? (
          <div className={styles.spinner} />
        ) : (
          'Створити акаунт'
        )}
      </button>

      <div className={styles.divider}>
        <span>або</span>
      </div>

      <button type="button" className={styles.googleButton}>
        <svg viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
        Google
      </button>
    </form>
  );
}
