export type Difficulty = 'JUNIOR' | 'MIDDLE' | 'SENIOR'
export type Locale = 'en' | 'ua'

export interface Category {
	id: string
	slug: string
	nameEn: string
	nameUa: string
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
	titleEn: string
	titleUa: string
	descriptionEn?: string
	descriptionUa?: string
	contentMarkdownEn: string // Markdown content in English
	contentMarkdownUa: string // Markdown content in Ukrainian
	difficulty: Difficulty
	order: number
	prevSlug?: string | null
	nextSlug?: string | null
	prevCategorySlug?: string | null
	nextCategorySlug?: string | null
	categoryId: string
	category?: Category
	tags?: Tag[]
	createdAt: string
	updatedAt: string
}

// Helper functions to get localized values
export function getLocalizedTitle(question: Question, locale: Locale): string {
	return locale === 'ua' ? question.titleUa : question.titleEn
}

export function getLocalizedDescription(question: Question, locale: Locale): string | undefined {
	return locale === 'ua' ? question.descriptionUa : question.descriptionEn
}

export function getLocalizedCategoryName(category: Category, locale: Locale): string {
	return locale === 'ua' ? category.nameUa : category.nameEn
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
