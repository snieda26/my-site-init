'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useAppSelector } from '@/stores/hooks'
import { questionsService } from '@/modules/questions/services/questions.service'
import { progressService } from '@/modules/progress/services/progress.service'
import type { Question, Category } from '@/modules/questions/types/questions.types'
import type { 
  LearnedStatus, 
  QuestionWithProgress, 
  KnowledgeCheckQueryParams 
} from '../types/knowledge-check.types'

interface UseKnowledgeCheckQuestionsOptions {
  categorySlug: string
  page?: number
  limit?: number
  status?: LearnedStatus
}

/**
 * Hook to get questions for a category with progress status
 */
export function useKnowledgeCheckQuestions({
  categorySlug,
  page = 1,
  limit = 10,
  status = 'all',
}: UseKnowledgeCheckQuestionsOptions) {
  const { accessToken } = useAppSelector((state) => state.auth)
  const isAuthenticated = !!accessToken

  // Fetch all questions for the category
  const questionsQuery = useQuery({
    queryKey: ['knowledge-check', 'questions', categorySlug],
    queryFn: async () => {
      try {
        // Fetch all questions by making multiple requests if needed
        let allQuestions: any[] = []
        let currentPage = 1
        let hasMore = true
        
        while (hasMore) {
          const result = await questionsService.getQuestionsByCategory(categorySlug, { 
            page: currentPage,
            limit: 50 // Safe limit that the API can handle
          })
          
          allQuestions = [...allQuestions, ...result.data]
          hasMore = result.meta.page < result.meta.totalPages
          currentPage++
          
          // Safety limit to prevent infinite loop
          if (currentPage > 10) break
        }
        
        return allQuestions
      } catch (error: any) {
        console.error('[useKnowledgeCheckQuestions] Error fetching questions:', error?.message)
        throw error
      }
    },
    enabled: !!categorySlug,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  })

  // Fetch progress for authenticated users
  const progressQuery = useQuery({
    queryKey: ['knowledge-check', 'progress', categorySlug],
    queryFn: async () => {
      try {
        const result = await progressService.getCategoryProgress(categorySlug)
        return result.questions
      } catch (error) {
        // Return empty array if progress fetch fails (e.g., API not available)
        console.warn('Failed to fetch progress:', error)
        return []
      }
    },
    enabled: !!categorySlug && isAuthenticated,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  })

  // Combine questions with progress
  const questionsWithProgress = useMemo<QuestionWithProgress[]>(() => {
    if (!questionsQuery.data) return []

    const progressMap = new Map(
      progressQuery.data?.map((q) => [q.id, q.status === 'COMPLETED']) ?? []
    )

    return questionsQuery.data.map((question) => ({
      ...question,
      isLearned: progressMap.get(question.id) ?? false,
    }))
  }, [questionsQuery.data, progressQuery.data])

  // Filter by status
  const filteredQuestions = useMemo(() => {
    if (status === 'all') return questionsWithProgress
    if (status === 'learned') return questionsWithProgress.filter((q) => q.isLearned)
    return questionsWithProgress.filter((q) => !q.isLearned)
  }, [questionsWithProgress, status])

  // Calculate pagination
  const totalPages = Math.ceil(filteredQuestions.length / limit)
  const startIndex = (page - 1) * limit
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + limit)

  // Counts for each status - always provide default values
  const counts = useMemo(() => {
    const all = questionsWithProgress.length;
    const learned = questionsWithProgress.filter((q) => q.isLearned).length;
    return {
      all,
      learned,
      notLearned: all - learned,
    };
  }, [questionsWithProgress]);

  return {
    questions: paginatedQuestions,
    totalQuestions: filteredQuestions.length,
    totalPages: totalPages || 1,
    currentPage: page,
    counts: counts || { all: 0, learned: 0, notLearned: 0 },
    isLoading: questionsQuery.isLoading || (isAuthenticated && progressQuery.isLoading),
    isError: questionsQuery.isError,
    isAuthenticated,
  }
}

/**
 * Hook to toggle learned status for a question
 */
export function useToggleLearned() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ questionId, isLearned }: { questionId: string; isLearned: boolean }) => {
      return progressService.updateProgress({
        questionId,
        status: isLearned ? 'COMPLETED' : 'NOT_STARTED',
      })
    },
    onMutate: async ({ questionId, isLearned }) => {
      // Optimistically update the cache
      await queryClient.cancelQueries({ queryKey: ['knowledge-check', 'progress'] })
      
      const previousProgress = queryClient.getQueriesData({ 
        queryKey: ['knowledge-check', 'progress'] 
      })

      // Update all progress queries optimistically
      queryClient.setQueriesData(
        { queryKey: ['knowledge-check', 'progress'] },
        (old: any) => {
          if (!old) return old
          return old.map((q: any) =>
            q.id === questionId
              ? { ...q, status: isLearned ? 'COMPLETED' : 'NOT_STARTED' }
              : q
          )
        }
      )

      return { previousProgress }
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousProgress) {
        context.previousProgress.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      toast.error('Failed to update progress')
    },
    onSuccess: (data, { isLearned }) => {
      toast.success(isLearned ? 'Marked as learned!' : 'Marked as not learned')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-check', 'progress'] })
      queryClient.invalidateQueries({ queryKey: ['progress'] })
    },
  })
}

/**
 * Hook to get category info
 */
export function useKnowledgeCheckCategory(slug: string) {
  return useQuery({
    queryKey: ['knowledge-check', 'category', slug],
    queryFn: () => questionsService.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 10,
  })
}
