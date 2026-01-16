'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import styles from './QuestionActionButtons.module.scss';

interface QuestionActionButtonsProps {
  section: string;
}

export const QuestionActionButtons = ({ section }: QuestionActionButtonsProps) => {
  const t = useTranslations('docs.questions');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <Link
          href={`/${locale}/problems/${section}-problems`}
          className={styles.practiceButton}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
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
        </Link>
        <button className={styles.signInButton}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.icon}
          >
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" x2="3" y1="12" y2="12" />
          </svg>
          <span>{t('actions.signInToMark')}</span>
        </button>
      </div>
    </div>
  );
};
