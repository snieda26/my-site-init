/**
 * Type-safe localStorage wrapper
 */
export const storage = {
	get<T>(key: string, fallback?: T): T | null {
		if (typeof window === 'undefined') return fallback ?? null

		try {
			const item = localStorage.getItem(key)
			return item ? JSON.parse(item) : fallback ?? null
		} catch {
			return fallback ?? null
		}
	},

	set<T>(key: string, value: T): void {
		if (typeof window === 'undefined') return

		try {
			localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			console.error('Error saving to localStorage:', error)
		}
	},

	remove(key: string): void {
		if (typeof window === 'undefined') return
		localStorage.removeItem(key)
	},

	clear(): void {
		if (typeof window === 'undefined') return
		localStorage.clear()
	},
}

export default storage
