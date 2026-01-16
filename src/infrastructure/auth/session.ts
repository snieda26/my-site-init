import Cookies from 'js-cookie'

export const ACCESS_TOKEN_KEY = 'accessToken'

export const session = {
	getAccessToken: () => Cookies.get(ACCESS_TOKEN_KEY),
	
	setAccessToken: (token: string) => {
		Cookies.set(ACCESS_TOKEN_KEY, token, { expires: 7 })
	},
	
	removeAccessToken: () => {
		Cookies.remove(ACCESS_TOKEN_KEY)
	},
	
	isAuthenticated: () => !!Cookies.get(ACCESS_TOKEN_KEY),
}

export default session
