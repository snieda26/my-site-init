'use client'

import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { Input, Button } from '@/common/components/ui'
import type { RegisterFormData } from '../types/auth.types'
import { useRegister } from '../hooks/use-auth'

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
		formState: { errors },
	} = useForm<RegisterFormData>({
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	const handleFormSubmit = (data: RegisterFormData) => {
		if (onSubmit) {
			onSubmit(data)
		} else {
			registerMutation.mutate(data)
		}
	}

	return (
		<form className="auth-card__form" onSubmit={handleSubmit(handleFormSubmit)}>
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
						value: 6,
						message: tValidation('passwordMinLength'),
					},
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
