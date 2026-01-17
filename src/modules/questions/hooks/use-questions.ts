import { useQuery } from '@tanstack/react-query'
import { questionsService } from '../services/questions.service'
import type { QuestionsQueryParams } from '../types/questions.types'

/**
 * Hook to get all categories
 */
export function useCategories(params?: { page?: number; limit?: number }) {
	return useQuery({
		queryKey: ['categories', params],
		queryFn: () => questionsService.getCategories(params),
	})
}

/**
 * Hook to get a single category by slug
 */
export function useCategory(slug: string) {
	return useQuery({
		queryKey: ['category', slug],
		queryFn: () => questionsService.getCategoryBySlug(slug),
		enabled: !!slug,
	})
}

/**
 * Hook to get all questions with filters
 */
export function useQuestions(params?: QuestionsQueryParams) {
	return useQuery({
		queryKey: ['questions', params],
		queryFn: () => questionsService.getQuestions(params),
	})
}

/**
 * Hook to get questions by category
 */
export function useQuestionsByCategory(categorySlug: string, params?: QuestionsQueryParams) {
	return useQuery({
		queryKey: ['questions', 'category', categorySlug, params],
		queryFn: () => questionsService.getQuestionsByCategory(categorySlug, params),
		enabled: !!categorySlug,
	})
}

/**
 * Hook to get a single question by slug
 */
export function useQuestion(slug: string) {
	return useQuery({
		queryKey: ['question', slug],
		queryFn: () => questionsService.getQuestionBySlug(slug),
		enabled: !!slug,
	})
}
