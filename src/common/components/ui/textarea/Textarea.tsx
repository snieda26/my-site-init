import clsx from 'clsx'
import { TextareaHTMLAttributes, forwardRef } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string
	error?: string
	hint?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, error, hint, className, id, ...props }, ref) => {
		const textareaId = id || props.name

		return (
			<div className="input-group">
				{label && (
					<label htmlFor={textareaId} className="input-group__label">
						{label}
					</label>
				)}
				<textarea
					ref={ref}
					id={textareaId}
					className={clsx('textarea', { 'textarea--error': error }, className)}
					{...props}
				/>
				{error && <span className="input-group__error">{error}</span>}
				{hint && !error && <span className="input-group__hint">{hint}</span>}
			</div>
		)
	}
)

Textarea.displayName = 'Textarea'

export default Textarea
