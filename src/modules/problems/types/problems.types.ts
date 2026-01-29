import type { Difficulty, PaginatedResult, Tag } from '@/modules/questions/types/questions.types'

export type SolveStatus = 'ATTEMPTED' | 'SOLVED'

export interface Company {
	id: string
	name: string
	logo?: string
	_count?: {
		problems: number
	}
}

export type ProblemCategory = 'javascript' | 'react' | 'typescript' | 'other'

export interface Problem {
	id: string
	slug: string
	title: string
	description: string
	difficulty: Difficulty
	category: ProblemCategory
	starterCode: string
	solution: string
	testCases: string
	companies?: Company[]
	tags?: Tag[]
	_count?: {
		solved: number
	}
	createdAt: string
	updatedAt: string
}

export interface SolvedProblem {
	id: string
	accountId: string
	problemId: string
	code: string
	status: SolveStatus
	solvedAt: string
}

export interface ProblemsQueryParams {
	page?: number
	limit?: number
	search?: string
	difficulty?: Difficulty
	tag?: string
	sortBy?: string
	sortOrder?: 'asc' | 'desc'
}

export interface SubmitSolutionDto {
	code: string
}

export interface SubmitSolutionResponse {
	message: string
	status: SolveStatus
}

export { Difficulty, PaginatedResult }
