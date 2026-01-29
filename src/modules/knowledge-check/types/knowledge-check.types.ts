import type { Question, Category, PaginatedResult, Locale } from '@/modules/questions/types/questions.types'

export type LearnedStatus = 'all' | 'learned' | 'not-learned'

export interface QuestionWithProgress extends Question {
  isLearned: boolean
}

export interface CategoryQuestionsWithProgress {
  category: Category
  questions: QuestionWithProgress[]
  totalCount: number
  learnedCount: number
  notLearnedCount: number
}

export interface KnowledgeCheckQueryParams {
  page?: number
  limit?: number
  status?: LearnedStatus
}

// Helper to get localized title
export function getLocalizedQuestionTitle(question: Question, locale: Locale): string {
  return locale === 'ua' ? question.titleUa : question.titleEn
}

// Helper to get localized content
export function getLocalizedQuestionContent(question: Question, locale: Locale): string {
  return locale === 'ua' ? question.contentMarkdownUa : question.contentMarkdownEn
}

// Helper to get localized short answer
export function getLocalizedShortAnswer(question: Question, locale: Locale): string | null | undefined {
  return locale === 'ua' ? question.shortAnswerUa : question.shortAnswerEn
}
