import type { Question, Category, Difficulty, PaginatedResult } from '@/modules/questions/types/questions.types'
import type { Problem } from '@/modules/problems/types/problems.types'

export type ProgressStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'

export interface CategoryProgress {
	id: string
	slug: string
	name: string
	icon?: string
	color?: string
	totalQuestions: number
	completedQuestions: number
	inProgressQuestions: number
	progressPercentage: number
}

export interface ProgressOverview {
	categories: CategoryProgress[]
	summary: {
		totalQuestions: number
		totalCompleted: number
		overallPercentage: number
	}
}

export interface QuestionProgress {
	id: string
	slug: string
	titleEn?: string
	titleUa?: string
	title?: string
	difficulty: Difficulty
	status: ProgressStatus
}

export interface CategoryProgressDetail {
	category: {
		id: string
		slug: string
		name: string
		icon?: string
		color?: string
	}
	questions: QuestionProgress[]
	summary: {
		total: number
		completed: number
		inProgress: number
		notStarted: number
		progressPercentage: number
	}
}

export interface UserProgress {
	id: string
	accountId: string
	categoryId?: string
	questionId?: string
	status: ProgressStatus
	updatedAt: string
	question?: Question
}

export interface UpdateProgressDto {
	questionId: string
	status: ProgressStatus
}

export interface Bookmark {
	id: string
	accountId: string
	questionId?: string
	problemId?: string
	question?: Question
	problem?: Problem
	createdAt: string
}

export interface CreateBookmarkDto {
	questionId?: string
	problemId?: string
}

export { PaginatedResult }
