import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth.slice'
import themeReducer from './theme/theme.slice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		theme: themeReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
