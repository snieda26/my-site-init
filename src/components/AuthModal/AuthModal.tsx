'use client';

import { useState } from 'react';
import { Modal } from '../Modal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import styles from './AuthModal.module.scss';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
  message?: string;
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login', message }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.brandName}>ITLead</h1>
          {message && <p className={styles.message}>{message}</p>}
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'login' ? styles.active : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Увійти
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'register' ? styles.active : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Реєстрація
          </button>
        </div>

        <div className={styles.content}>
          {activeTab === 'login' ? (
            <LoginForm onSuccess={handleSuccess} />
          ) : (
            <RegisterForm onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </Modal>
  );
}
