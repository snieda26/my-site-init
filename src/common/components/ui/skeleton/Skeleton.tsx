import clsx from 'clsx'

interface SkeletonProps {
	className?: string
	variant?: 'text' | 'circular' | 'rectangular'
	width?: string | number
	height?: string | number
}

export default function Skeleton({
	className,
	variant = 'text',
	width,
	height,
}: SkeletonProps) {
	return (
		<div
			className={clsx('skeleton', `skeleton--${variant}`, className)}
			style={{
				width: typeof width === 'number' ? `${width}px` : width,
				height: typeof height === 'number' ? `${height}px` : height,
			}}
		/>
	)
}
