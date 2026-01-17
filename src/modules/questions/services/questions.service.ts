import apiClient from '@/infrastructure/api/client'
import type {
	Category,
	Question,
	PaginatedResult,
	QuestionsQueryParams,
} from '../types/questions.types'

export const questionsService = {
	// Categories
	async getCategories(params?: { page?: number; limit?: number }): Promise<PaginatedResult<Category>> {
		const response = await apiClient.get<PaginatedResult<Category>>('/categories', { params })
		return response.data
	},

	async getCategoryBySlug(slug: string): Promise<Category> {
		const response = await apiClient.get<Category>(`/categories/${slug}`)
		return response.data
	},

	// Questions
	async getQuestions(params?: QuestionsQueryParams): Promise<PaginatedResult<Question>> {
		const response = await apiClient.get<PaginatedResult<Question>>('/questions', { params })
		return response.data
	},

	async getQuestionsByCategory(
		categorySlug: string,
		params?: QuestionsQueryParams
	): Promise<PaginatedResult<Question>> {
		const response = await apiClient.get<PaginatedResult<Question>>(
			`/questions/category/${categorySlug}`,
			{ params }
		)
		return response.data
	},

	async getQuestionBySlug(slug: string): Promise<Question> {
		const response = await apiClient.get<Question>(`/questions/${slug}`)
		return response.data
	},
}

export default questionsService
