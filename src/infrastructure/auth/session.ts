import Cookies from 'js-cookie'
import { jwtVerify } from 'jose'

export interface TokenPayload {
	accountId: string
	email: string
	iat: number
	exp: number
}

const JWT_SECRET = new TextEncoder().encode(
	process.env.NEXT_PUBLIC_JWT_SECRET || 'fallback-secret'
)

export async function verifyToken(token: string): Promise<TokenPayload | null> {
	try {
		const { payload } = await jwtVerify(token, JWT_SECRET)
		return payload as unknown as TokenPayload
	} catch {
		return null
	}
}

export function getAccessToken(): string | undefined {
	return Cookies.get('accessToken')
}

export function setAccessToken(token: string): void {
	Cookies.set('accessToken', token, {
		expires: 7, // 7 days
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
	})
}

export function removeAccessToken(): void {
	Cookies.remove('accessToken')
}

export function isAuthenticated(): boolean {
	return !!getAccessToken()
}
