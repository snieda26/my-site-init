export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

export interface Category {
	id: string
	slug: string
	name: string
	description?: string
	icon?: string
	color?: string
	order: number
	_count?: {
		questions: number
	}
}

export interface Tag {
	id: string
	name: string
}

export interface Question {
	id: string
	slug: string
	title: string
	content: string
	answer: string
	difficulty: Difficulty
	order: number
	categoryId: string
	category?: Category
	tags?: Tag[]
	createdAt: string
	updatedAt: string
}

export interface PaginatedResult<T> {
	data: T[]
	meta: {
		page: number
		limit: number
		total: number
		totalPages: number
		hasNext: boolean
		hasPrev: boolean
	}
}

export interface QuestionsQueryParams {
	page?: number
	limit?: number
	search?: string
	category?: string
	difficulty?: Difficulty
	tag?: string
	sortBy?: string
	sortOrder?: 'asc' | 'desc'
}
