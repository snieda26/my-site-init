import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAppSelector } from '@/stores/hooks'
import { progressService } from '../services/progress.service'
import type { UpdateProgressDto, CreateBookmarkDto, ProgressStatus } from '../types/progress.types'

/**
 * Hook to get progress overview
 */
export function useProgressOverview() {
	const { accessToken } = useAppSelector((state) => state.auth)

	return useQuery({
		queryKey: ['progress', 'overview'],
		queryFn: () => progressService.getProgressOverview(),
		enabled: !!accessToken,
	})
}

/**
 * Hook to get category progress
 */
export function useCategoryProgress(categorySlug: string) {
	const { accessToken } = useAppSelector((state) => state.auth)

	return useQuery({
		queryKey: ['progress', 'category', categorySlug],
		queryFn: () => progressService.getCategoryProgress(categorySlug),
		enabled: !!accessToken && !!categorySlug,
	})
}

/**
 * Hook to update progress
 */
export function useUpdateProgress() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: UpdateProgressDto) => progressService.updateProgress(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['progress'] })
		},
		onError: (error: Error & { response?: { data?: { message?: string } } }) => {
			toast.error(error.response?.data?.message || 'Failed to update progress')
		},
	})
}

/**
 * Hook to mark question as completed
 */
export function useMarkQuestionComplete() {
	const { mutate, ...rest } = useUpdateProgress()

	const markComplete = (questionId: string) => {
		mutate({ questionId, status: 'COMPLETED' as ProgressStatus })
	}

	return { markComplete, ...rest }
}

/**
 * Hook to get completed questions
 */
export function useCompletedQuestions(params?: { page?: number; limit?: number }) {
	const { accessToken } = useAppSelector((state) => state.auth)

	return useQuery({
		queryKey: ['progress', 'completed', params],
		queryFn: () => progressService.getCompletedQuestions(params),
		enabled: !!accessToken,
	})
}

/**
 * Hook to get all bookmarks
 */
export function useBookmarks(params?: { page?: number; limit?: number }) {
	const { accessToken } = useAppSelector((state) => state.auth)

	return useQuery({
		queryKey: ['bookmarks', params],
		queryFn: () => progressService.getBookmarks(params),
		enabled: !!accessToken,
	})
}

/**
 * Hook to get question bookmarks
 */
export function useQuestionBookmarks(params?: { page?: number; limit?: number }) {
	const { accessToken } = useAppSelector((state) => state.auth)

	return useQuery({
		queryKey: ['bookmarks', 'questions', params],
		queryFn: () => progressService.getQuestionBookmarks(params),
		enabled: !!accessToken,
	})
}

/**
 * Hook to get problem bookmarks
 */
export function useProblemBookmarks(params?: { page?: number; limit?: number }) {
	const { accessToken } = useAppSelector((state) => state.auth)

	return useQuery({
		queryKey: ['bookmarks', 'problems', params],
		queryFn: () => progressService.getProblemBookmarks(params),
		enabled: !!accessToken,
	})
}

/**
 * Hook to create a bookmark
 */
export function useCreateBookmark() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateBookmarkDto) => progressService.createBookmark(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
			toast.success('Bookmark added')
		},
		onError: (error: Error & { response?: { data?: { message?: string } } }) => {
			toast.error(error.response?.data?.message || 'Failed to add bookmark')
		},
	})
}

/**
 * Hook to delete a bookmark
 */
export function useDeleteBookmark() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => progressService.deleteBookmark(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bookmarks'] })
			toast.success('Bookmark removed')
		},
		onError: (error: Error & { response?: { data?: { message?: string } } }) => {
			toast.error(error.response?.data?.message || 'Failed to remove bookmark')
		},
	})
}
