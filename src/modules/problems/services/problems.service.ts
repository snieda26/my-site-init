import apiClient from '@/infrastructure/api/client'
import type {
	Company,
	Problem,
	PaginatedResult,
	ProblemsQueryParams,
	SubmitSolutionDto,
	SubmitSolutionResponse,
} from '../types/problems.types'

export const problemsService = {
	// Problems
	async getProblems(params?: ProblemsQueryParams): Promise<PaginatedResult<Problem>> {
		const response = await apiClient.get<PaginatedResult<Problem>>('/problems', { params })
		return response.data
	},

	async getProblemBySlug(slug: string): Promise<Problem> {
		const response = await apiClient.get<Problem>(`/problems/${slug}`)
		return response.data
	},

	async submitSolution(slug: string, data: SubmitSolutionDto): Promise<SubmitSolutionResponse> {
		const response = await apiClient.post<SubmitSolutionResponse>(
			`/problems/${slug}/submit`,
			data
		)
		return response.data
	},

	// Companies
	async getCompanies(params?: { page?: number; limit?: number }): Promise<PaginatedResult<Company>> {
		const response = await apiClient.get<PaginatedResult<Company>>('/companies', { params })
		return response.data
	},
}

export default problemsService
