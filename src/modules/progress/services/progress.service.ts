import apiClient from '@/infrastructure/api/client'
import type { Question, PaginatedResult } from '@/modules/questions/types/questions.types'
import type { Problem } from '@/modules/problems/types/problems.types'
import type {
	ProgressOverview,
	CategoryProgressDetail,
	UserProgress,
	UpdateProgressDto,
	Bookmark,
	CreateBookmarkDto,
} from '../types/progress.types'

export const progressService = {
	// Progress
	async getProgressOverview(): Promise<ProgressOverview> {
		const response = await apiClient.get<ProgressOverview>('/progress')
		return response.data
	},

	async getCategoryProgress(categorySlug: string): Promise<CategoryProgressDetail> {
		const response = await apiClient.get<CategoryProgressDetail>(
			`/progress/category/${categorySlug}`
		)
		return response.data
	},

	async updateProgress(data: UpdateProgressDto): Promise<UserProgress> {
		const response = await apiClient.post<UserProgress>('/progress/update', data)
		return response.data
	},

	async getCompletedQuestions(params?: {
		page?: number
		limit?: number
	}): Promise<PaginatedResult<Question>> {
		const response = await apiClient.get<PaginatedResult<Question>>('/progress/completed', {
			params,
		})
		return response.data
	},

	// Bookmarks
	async getBookmarks(params?: {
		page?: number
		limit?: number
	}): Promise<PaginatedResult<Bookmark>> {
		const response = await apiClient.get<PaginatedResult<Bookmark>>('/bookmarks', { params })
		return response.data
	},

	async getQuestionBookmarks(params?: {
		page?: number
		limit?: number
	}): Promise<PaginatedResult<Question>> {
		const response = await apiClient.get<PaginatedResult<Question>>('/bookmarks/questions', {
			params,
		})
		return response.data
	},

	async getProblemBookmarks(params?: {
		page?: number
		limit?: number
	}): Promise<PaginatedResult<Problem>> {
		const response = await apiClient.get<PaginatedResult<Problem>>('/bookmarks/problems', {
			params,
		})
		return response.data
	},

	async createBookmark(data: CreateBookmarkDto): Promise<Bookmark> {
		const response = await apiClient.post<Bookmark>('/bookmarks', data)
		return response.data
	},

	async deleteBookmark(id: string): Promise<{ message: string }> {
		const response = await apiClient.delete<{ message: string }>(`/bookmarks/${id}`)
		return response.data
	},
}

export default progressService
