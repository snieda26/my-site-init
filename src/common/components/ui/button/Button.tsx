import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react'
import { FaSpinner } from 'react-icons/fa'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
	size?: 'sm' | 'md' | 'lg'
	isLoading?: boolean
	isIcon?: boolean
	fullWidth?: boolean
	children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = 'primary',
			size = 'md',
			isLoading = false,
			isIcon = false,
			fullWidth = false,
			className,
			children,
			disabled,
			...props
		},
		ref
	) => {
		return (
			<button
				ref={ref}
				className={clsx(
					'button',
					`button--${variant}`,
					`button--${size}`,
					{
						'button--loading': isLoading,
						'button--icon': isIcon,
						'button--full': fullWidth,
					},
					className
				)}
				disabled={disabled || isLoading}
				{...props}
			>
				{isLoading ? (
					<>
						<FaSpinner className="button__spinner" />
						{children}
					</>
				) : (
					children
				)}
			</button>
		)
	}
)

Button.displayName = 'Button'

export default Button
