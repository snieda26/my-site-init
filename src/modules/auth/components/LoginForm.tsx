'use client'

import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { Input, Button } from '@/common/components/ui'
import type { LoginFormData } from '../types/auth.types'
import { useLogin } from '../hooks/use-auth'

interface LoginFormProps {
	onSubmit?: (data: LoginFormData) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
	const t = useTranslations('auth.login')
	const tValidation = useTranslations('auth.validation')
	const login = useLogin()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const handleFormSubmit = (data: LoginFormData) => {
		if (onSubmit) {
			onSubmit(data)
		} else {
			login.mutate(data)
		}
	}

	return (
		<form className="auth-card__form" onSubmit={handleSubmit(handleFormSubmit)}>
			<Input
				label={t('email')}
				type="email"
				placeholder={t('emailPlaceholder')}
				error={errors.email?.message}
				{...register('email', {
					required: tValidation('emailRequired'),
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: tValidation('emailInvalid'),
					},
				})}
			/>

			<Input
				label={t('password')}
				type="password"
				placeholder={t('passwordPlaceholder')}
				error={errors.password?.message}
				{...register('password', {
					required: tValidation('passwordRequired'),
					minLength: {
						value: 6,
						message: tValidation('passwordMinLength'),
					},
				})}
			/>

			<Button
				type="submit"
				variant="primary"
				fullWidth
				isLoading={login.isPending}
			>
				{t('submit')}
			</Button>
		</form>
	)
}
