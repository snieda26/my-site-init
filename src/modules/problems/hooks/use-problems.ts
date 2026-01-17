import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { problemsService } from '../services/problems.service'
import type { ProblemsQueryParams, SubmitSolutionDto } from '../types/problems.types'

/**
 * Hook to get all problems with filters
 */
export function useProblems(params?: ProblemsQueryParams) {
	return useQuery({
		queryKey: ['problems', params],
		queryFn: () => problemsService.getProblems(params),
	})
}

/**
 * Hook to get a single problem by slug
 */
export function useProblem(slug: string) {
	return useQuery({
		queryKey: ['problem', slug],
		queryFn: () => problemsService.getProblemBySlug(slug),
		enabled: !!slug,
	})
}

/**
 * Hook to submit a solution
 */
export function useSubmitSolution(slug: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: SubmitSolutionDto) => problemsService.submitSolution(slug, data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['problem', slug] })
			queryClient.invalidateQueries({ queryKey: ['progress'] })
			toast.success(data.message)
		},
		onError: (error: Error & { response?: { data?: { message?: string } } }) => {
			toast.error(error.response?.data?.message || 'Failed to submit solution')
		},
	})
}

/**
 * Hook to get all companies
 */
export function useCompanies(params?: { page?: number; limit?: number }) {
	return useQuery({
		queryKey: ['companies', params],
		queryFn: () => problemsService.getCompanies(params),
	})
}
