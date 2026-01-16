import { useState, useEffect, useCallback } from 'react'

/**
 * Hook for syncing state with localStorage
 * @param key - The localStorage key
 * @param initialValue - Initial value if not found in localStorage
 */
export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
	// Get initial value from localStorage or use provided initialValue
	const readValue = useCallback((): T => {
		if (typeof window === 'undefined') {
			return initialValue
		}

		try {
			const item = localStorage.getItem(key)
			return item ? (JSON.parse(item) as T) : initialValue
		} catch {
			return initialValue
		}
	}, [key, initialValue])

	const [storedValue, setStoredValue] = useState<T>(readValue)

	// Set value in state and localStorage
	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			try {
				const newValue = value instanceof Function ? value(storedValue) : value
				setStoredValue(newValue)

				if (typeof window !== 'undefined') {
					localStorage.setItem(key, JSON.stringify(newValue))
				}
			} catch (error) {
				console.error(`Error setting localStorage key "${key}":`, error)
			}
		},
		[key, storedValue]
	)

	// Remove from localStorage
	const removeValue = useCallback(() => {
		try {
			setStoredValue(initialValue)
			if (typeof window !== 'undefined') {
				localStorage.removeItem(key)
			}
		} catch (error) {
			console.error(`Error removing localStorage key "${key}":`, error)
		}
	}, [key, initialValue])

	// Sync with localStorage changes from other tabs
	useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === key && event.newValue !== null) {
				setStoredValue(JSON.parse(event.newValue))
			}
		}

		window.addEventListener('storage', handleStorageChange)
		return () => window.removeEventListener('storage', handleStorageChange)
	}, [key])

	return [storedValue, setValue, removeValue]
}
