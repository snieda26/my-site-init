'use client'

import { useQuery } from '@tanstack/react-query'
import { questionsService } from '../services/questions.service'
import type { Category, Question } from '../types/questions.types'

export interface CategoryWithQuestions extends Category {
	questions: Question[]
}

export function useCategoriesWithQuestions() {
	return useQuery<CategoryWithQuestions[]>({
		queryKey: ['categories-with-questions'],
		queryFn: async () => {
			// Fetch all categories
			const categoriesResult = await questionsService.getCategories({ limit: 100 })
			const categories = categoriesResult.data

			// For each category, fetch its questions
			const categoriesWithQuestions = await Promise.all(
				categories.map(async (category) => {
					try {
						const questionsResult = await questionsService.getQuestionsByCategory(category.slug, {
							limit: 100,
						})
						return {
							...category,
							questions: questionsResult.data,
						}
					} catch (error) {
						console.error(`Failed to fetch questions for category ${category.slug}:`, error)
						return {
							...category,
							questions: [],
						}
					}
				})
			)

			return categoriesWithQuestions
		},
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
	})
}
