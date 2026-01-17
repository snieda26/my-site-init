'use client'

import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { Input, Button } from '@/common/components/ui'
import type { RegisterFormData, RegisterDto } from '../types/auth.types'
import { useRegister } from '../hooks/use-auth'
import styles from './AuthForms.module.scss'

interface RegisterFormProps {
	onSubmit?: (data: RegisterFormData) => void
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
	const t = useTranslations('auth.register')
	const tValidation = useTranslations('auth.validation')
	const registerMutation = useRegister()

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterFormData>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const password = watch('password')

	const handleFormSubmit = (data: RegisterFormData) => {
		if (onSubmit) {
			onSubmit(data)
		} else {
			// Transform to RegisterDto
			const dto: RegisterDto = {
				name: data.name,
				email: data.email,
				password: data.password,
				confirmPassword: data.confirmPassword,
			}
			registerMutation.mutate(dto)
		}
	}

	// Extract error message from mutation error
	const errorMessage = registerMutation.error?.response?.data?.message 
		|| registerMutation.error?.message

	return (
		<form className="auth-card__form" onSubmit={handleSubmit(handleFormSubmit)}>
			{errorMessage && (
				<div className={styles.formError}>
					{errorMessage}
				</div>
			)}

			<Input
				label={t('name')}
				type="text"
				placeholder={t('namePlaceholder')}
				error={errors.name?.message}
				{...register('name', {
					required: tValidation('nameRequired'),
					minLength: {
						value: 2,
						message: tValidation('nameMinLength'),
					},
				})}
			/>

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
						value: 8,
						message: tValidation('passwordMinLength'),
					},
				})}
			/>

			<Input
				label={t('confirmPassword')}
				type="password"
				placeholder={t('confirmPasswordPlaceholder')}
				error={errors.confirmPassword?.message}
				{...register('confirmPassword', {
					required: tValidation('confirmPasswordRequired'),
					validate: (value) =>
						value === password || tValidation('passwordMismatch'),
				})}
			/>

			<Button
				type="submit"
				variant="primary"
				fullWidth
				isLoading={registerMutation.isPending}
			>
				{t('submit')}
			</Button>
		</form>
	)
}
