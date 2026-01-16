import { format, formatDistanceToNow, parseISO } from 'date-fns'

/**
 * Format a date string to a readable format
 */
export function formatDate(date: string | Date, formatString = 'MMM d, yyyy'): string {
	const dateObj = typeof date === 'string' ? parseISO(date) : date
	return format(dateObj, formatString)
}

/**
 * Format a date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
	const dateObj = typeof date === 'string' ? parseISO(date) : date
	return formatDistanceToNow(dateObj, { addSuffix: true })
}

/**
 * Format a number with thousands separators
 */
export function formatNumber(num: number): string {
	return new Intl.NumberFormat().format(num)
}

/**
 * Format bytes to human-readable size
 */
export function formatFileSize(bytes: number): string {
	const units = ['B', 'KB', 'MB', 'GB', 'TB']
	let unitIndex = 0

	while (bytes >= 1024 && unitIndex < units.length - 1) {
		bytes /= 1024
		unitIndex++
	}

	return `${bytes.toFixed(1)} ${units[unitIndex]}`
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text
	return text.slice(0, maxLength).trim() + '...'
}

/**
 * Slugify a string (for URLs)
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '')
}
