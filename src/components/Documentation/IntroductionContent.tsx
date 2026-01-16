'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale, useLocalePath } from '@/common/hooks';
import { Breadcrumb } from './Breadcrumb';
import styles from './IntroductionContent.module.scss';

export const IntroductionContent = () => {
  const t = useTranslations('docs.introduction');
  const locale = useLocale();
  const localePath = useLocalePath();

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumbWrapper}>
        <Breadcrumb
          items={[
            { label: t('breadcrumb.documentation') },
          ]}
        />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('title')}</h1>

        <div className={styles.typography}>
          <p>
            Welcome to <strong>Hack Frontend</strong> — {t('welcome')}
          </p>
          <p>{t('description')}</p>
          <p>
            <strong>{t('platformName')}</strong> {t('platformDescription')}
          </p>

          <hr />

          <h2 id="what-do-we-offer">
            <a href="#what-do-we-offer" className={styles.anchor}>
              <span className={styles.anchorIcon}>#</span>
            </a>
            {t('whatDoWeOffer.title')}
          </h2>

          <h3 id="knowledge-base">
            <a href="#knowledge-base" className={styles.anchor}>
              <span className={styles.anchorIcon}>#</span>
            </a>
            📚 {t('whatDoWeOffer.knowledgeBase.title')}
          </h3>
          <p>
            <Link href={localePath('/interview-questions')} className={styles.link}>
              {t('whatDoWeOffer.knowledgeBase.description')}
            </Link>{' '}
            {t('whatDoWeOffer.knowledgeBase.text')}
          </p>
          <p>
            <strong>{t('whatDoWeOffer.knowledgeBase.mainSections')}</strong>
          </p>
          <ul>
            <li>
              <Link href={localePath('/interview-questions/javascript')} className={styles.link}>
                JavaScript
              </Link>{' '}
              — {t('whatDoWeOffer.knowledgeBase.javascript')}
            </li>
            <li>
              <Link href={localePath('/interview-questions/html-and-css')} className={styles.link}>
                HTML & CSS
              </Link>{' '}
              — {t('whatDoWeOffer.knowledgeBase.htmlCss')}
            </li>
            <li>
              <Link href={localePath('/interview-questions/react')} className={styles.link}>
                React
              </Link>{' '}
              — {t('whatDoWeOffer.knowledgeBase.react')}
            </li>
            <li>
              <Link href={localePath('/interview-questions/angular')} className={styles.link}>
                Angular
              </Link>{' '}
              — {t('whatDoWeOffer.knowledgeBase.angular')}
            </li>
            <li>
              <Link href={localePath('/interview-questions/vue')} className={styles.link}>
                Vue
              </Link>{' '}
              — {t('whatDoWeOffer.knowledgeBase.vue')}
            </li>
            <li>
              <Link href={localePath('/interview-questions/typescript')} className={styles.link}>
                TypeScript
              </Link>{' '}
              — {t('whatDoWeOffer.knowledgeBase.typescript')}
            </li>
            <li>
              <Link href={localePath('/interview-questions/general-questions')} className={styles.link}>
                {t('whatDoWeOffer.knowledgeBase.generalQuestions')}
              </Link>{' '}
              — {t('whatDoWeOffer.knowledgeBase.generalQuestionsDesc')}
            </li>
            <li>
              <Link href={localePath('/interview-questions/architecture')} className={styles.link}>
                {t('whatDoWeOffer.knowledgeBase.architecture')}
              </Link>{' '}
              — {t('whatDoWeOffer.knowledgeBase.architectureDesc')}
            </li>
            <li>
              <Link href={localePath('/interview-questions/principles')} className={styles.link}>
                {t('whatDoWeOffer.knowledgeBase.principles')}
              </Link>{' '}
              — {t('whatDoWeOffer.knowledgeBase.principlesDesc')}
            </li>
            <li>
              <Link href={localePath('/interview-questions/patterns')} className={styles.link}>
                {t('whatDoWeOffer.knowledgeBase.patterns')}
              </Link>{' '}
              — {t('whatDoWeOffer.knowledgeBase.patternsDesc')}
            </li>
          </ul>

          <h3 id="problems-database">
            <a href="#problems-database" className={styles.anchor}>
              <span className={styles.anchorIcon}>#</span>
            </a>
            💻 {t('whatDoWeOffer.problemsDatabase.title')}
          </h3>
          <p>
            <Link href="/problems" className={styles.link}>
              {t('whatDoWeOffer.problemsDatabase.description')}
            </Link>{' '}
            {t('whatDoWeOffer.problemsDatabase.text')}
          </p>
          <ul>
            <li>
              <Link href="/problems" className={styles.link}>
                {t('whatDoWeOffer.problemsDatabase.jsProblems')}
              </Link>{' '}
              — {t('whatDoWeOffer.problemsDatabase.jsProblemsDesc')}
            </li>
            <li>
              <Link href="/problems/quizzes" className={styles.link}>
                {t('whatDoWeOffer.problemsDatabase.quizzes')}
              </Link>{' '}
              — {t('whatDoWeOffer.problemsDatabase.quizzesDesc')}
            </li>
            <li>
              <Link href="/problems/react-problems" className={styles.link}>
                {t('whatDoWeOffer.problemsDatabase.reactProblems')}
              </Link>{' '}
              — {t('whatDoWeOffer.problemsDatabase.reactProblemsDesc')}
            </li>
          </ul>
          <p>
            <strong>{t('whatDoWeOffer.problemsDatabase.features')}</strong>
          </p>
          <ul>
            <li>{t('whatDoWeOffer.problemsDatabase.feature1')}</li>
            <li>{t('whatDoWeOffer.problemsDatabase.feature2')}</li>
            <li>{t('whatDoWeOffer.problemsDatabase.feature3')}</li>
            <li>{t('whatDoWeOffer.problemsDatabase.feature4')}</li>
          </ul>

          <h3 id="knowledge-check">
            <a href="#knowledge-check" className={styles.anchor}>
              <span className={styles.anchorIcon}>#</span>
            </a>
            📝 {t('whatDoWeOffer.knowledgeCheck.title')}
          </h3>
          <p>
            <Link href="/check-knowledge" className={styles.link}>
              {t('whatDoWeOffer.knowledgeCheck.description')}
            </Link>{' '}
            {t('whatDoWeOffer.knowledgeCheck.text')}
          </p>
          <p>
            <strong>{t('whatDoWeOffer.knowledgeCheck.whatYouGet')}</strong>
          </p>
          <ul>
            <li>
              <strong>{t('whatDoWeOffer.knowledgeCheck.questionsCount')}</strong>{' '}
              {t('whatDoWeOffer.knowledgeCheck.questionsDesc')}
            </li>
            <li>{t('whatDoWeOffer.knowledgeCheck.categories')}</li>
            <li>{t('whatDoWeOffer.knowledgeCheck.progress')}</li>
            <li>{t('whatDoWeOffer.knowledgeCheck.mark')}</li>
          </ul>

          <hr />

          <h2 id="why-choose-hack-frontend">
            <a href="#why-choose-hack-frontend" className={styles.anchor}>
              <span className={styles.anchorIcon}>#</span>
            </a>
            {t('whyChoose.title')}
          </h2>
          <ul>
            <li>
              <strong>{t('whyChoose.upToDate')}</strong> {t('whyChoose.upToDateDesc')}
            </li>
            <li>
              <strong>{t('whyChoose.practical')}</strong> {t('whyChoose.practicalDesc')}
            </li>
            <li>
              <strong>{t('whyChoose.convenience')}</strong> {t('whyChoose.convenienceDesc')}
            </li>
            <li>
              <strong>{t('whyChoose.free')}</strong> {t('whyChoose.freeDesc')}
            </li>
          </ul>

          <hr />

          <h2 id="how-to-get-started">
            <a href="#how-to-get-started" className={styles.anchor}>
              <span className={styles.anchorIcon}>#</span>
            </a>
            {t('howToGetStarted.title')}
          </h2>
          <ol>
            <li>
              <strong>{t('howToGetStarted.step1')}</strong> {t('howToGetStarted.step1Desc')}
            </li>
            <li>
              <strong>{t('howToGetStarted.step2')}</strong> {t('howToGetStarted.step2Desc')}
            </li>
            <li>
              <strong>{t('howToGetStarted.step3')}</strong> {t('howToGetStarted.step3Desc')}
            </li>
            <li>
              <strong>{t('howToGetStarted.step4')}</strong> {t('howToGetStarted.step4Desc')}
            </li>
          </ol>
          <p>
            {t('howToGetStarted.telegram')}{' '}
            <Link href="https://t.me/frontend_hackers" target="_blank" className={styles.link}>
              {t('howToGetStarted.telegramLink')}
            </Link>{' '}
            — {t('howToGetStarted.telegramDesc')}
          </p>
          <p>
            {t('howToGetStarted.youtube')}{' '}
            <Link
              href="https://www.youtube.com/@Hack-Frontend"
              target="_blank"
              className={styles.link}
            >
              {t('howToGetStarted.youtubeLink')}
            </Link>{' '}
            — {t('howToGetStarted.youtubeDesc')}
          </p>

          <hr />

          <div className={styles.tip}>
            <p className={styles.tipTitle}>{t('tip.title')}</p>
            <p>{t('tip.text')}</p>
          </div>
        </div>

        <div className={styles.navigation}>
          <div></div>
          <div>
            <Link href={localePath('/interview-questions/frontend-interview-preparation-guide')} className={styles.forwardBtn}>
              <p>{t('navigation.forward')}</p>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className={styles.forwardIcon}
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
