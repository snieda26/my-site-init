'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from '@/common/hooks';
import { Breadcrumb } from './Breadcrumb';
import { QuestionActionButtons } from './QuestionActionButtons';
import { QuestionContent } from './QuestionContent';
import { QuestionNavigation } from './QuestionNavigation';
import styles from './QuestionPageContent.module.scss';

interface QuestionPageContentProps {
  section: string;
  question: string;
}

export const QuestionPageContent = ({ section, question }: QuestionPageContentProps) => {
  const t = useTranslations('docs.questions');
  const locale = useLocale();

  // Generate breadcrumb items
  let questionTitle = question.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  try {
    const questionT = useTranslations(`docs.questions.questions.${section}.${question}`);
    questionTitle = questionT('title');
  } catch (e) {
    // Use default title
  }

  const breadcrumbItems = [
    { label: t('breadcrumb.documentation'), href: `/interview-questions/${locale}` },
    { label: t(`sections.${section}`) || section, href: `/interview-questions/${section}/${locale}` },
    { label: questionTitle },
  ];

  return (
    <div className={styles.container}>
      <QuestionActionButtons section={section} />
      
      <div className={styles.breadcrumbWrapper}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className={styles.content}>
        <QuestionContent section={section} question={question} />
      </div>

      <QuestionNavigation section={section} question={question} />
    </div>
  );
};
