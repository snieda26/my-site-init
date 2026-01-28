'use client';

import { useTranslations } from 'next-intl';
import { Breadcrumb } from './Breadcrumb';
import { QuestionActionButtons } from './QuestionActionButtons';
import { QuestionContent } from './QuestionContent';
import { QuestionNavigation } from './QuestionNavigation';
import styles from './QuestionPageContent.module.scss';

interface QuestionPageContentProps {
  section: string;
  question: string;
  title: string;
  content: string;
  prev?: string | null;
  next?: string | null;
  prevCategorySlug?: string | null;
  nextCategorySlug?: string | null;
  locale: string;
}

export const QuestionPageContent = ({ 
  section, 
  question,
  title,
  content,
  prev,
  next,
  prevCategorySlug,
  nextCategorySlug,
  locale,
}: QuestionPageContentProps) => {
  const t = useTranslations('docs.questions');

  // Get section name from translations or fallback to section id
  let sectionTitle = section;
  try {
    sectionTitle = t(`sections.${section}`);
  } catch (e) {
    // Use section id as fallback
    sectionTitle = section.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  const breadcrumbItems = [
    { label: t('breadcrumb.documentation'), href: `/interview-questions/${locale}` },
    { label: sectionTitle, href: `/interview-questions/${section}/${locale}` },
    { label: title },
  ];

  return (
    <div className={styles.container}>
      <QuestionActionButtons section={section} questionSlug={question} />
      
      <div className={styles.breadcrumbWrapper}>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className={styles.content}>
        <QuestionContent title={title} content={content} />
      </div>

      <QuestionNavigation 
        section={section} 
        prev={prev} 
        next={next}
        prevCategorySlug={prevCategorySlug}
        nextCategorySlug={nextCategorySlug}
        locale={locale}
      />
    </div>
  );
};
