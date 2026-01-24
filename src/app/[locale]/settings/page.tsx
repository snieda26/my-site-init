'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Settings.module.scss'
import apiClient from '@/infrastructure/api/client'
import { FiCamera, FiLock, FiMail, FiUser, FiCheckCircle, FiXCircle } from 'react-icons/fi'

interface UserProfile {
	id: string
	email: string
	name: string
	username?: string
	avatarUrl?: string
	emailVerified: boolean
}

export default function SettingsPage() {
	const router = useRouter()
	const [profile, setProfile] = useState<UserProfile | null>(null)
	const [loading, setLoading] = useState(true)
	const [saving, setSaving] = useState(false)
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

	// Form states
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [avatarUrl, setAvatarUrl] = useState('')
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	useEffect(() => {
		loadProfile()
	}, [])

	const loadProfile = async () => {
		try {
			const response = await apiClient.get('/account/profile')
			setProfile(response.data)
			setName(response.data.name || '')
			setUsername(response.data.username || '')
			setAvatarUrl(response.data.avatarUrl || '')
		} catch (error: any) {
			if (error.response?.status === 401) {
				router.push('/auth/login')
			}
		} finally {
			setLoading(false)
		}
	}

	const handleUpdateProfile = async (e: React.FormEvent) => {
		e.preventDefault()
		setSaving(true)
		setMessage(null)

		try {
			await apiClient.patch('/account/profile', {
				name,
				username,
				avatarUrl: avatarUrl || null,
			})
			setMessage({ type: 'success', text: 'Profile updated successfully!' })
			await loadProfile()
		} catch (error: any) {
			setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' })
		} finally {
			setSaving(false)
		}
	}

	const handleChangePassword = async (e: React.FormEvent) => {
		e.preventDefault()
		setSaving(true)
		setMessage(null)

		if (newPassword !== confirmPassword) {
			setMessage({ type: 'error', text: 'Passwords do not match' })
			setSaving(false)
			return
		}

		try {
			await apiClient.patch('/account/password', {
				currentPassword,
				newPassword,
				confirmPassword,
			})
			setMessage({ type: 'success', text: 'Password changed successfully!' })
			setCurrentPassword('')
			setNewPassword('')
			setConfirmPassword('')
		} catch (error: any) {
			setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to change password' })
		} finally {
			setSaving(false)
		}
	}

	if (loading) {
		return (
			<div className={styles.loadingContainer}>
				<div className={styles.spinner} />
			</div>
		)
	}

	return (
		<div className={styles.settingsPage}>
			{/* Animated Background */}
			<div className={styles.background}>
				<div className={styles.grid} />
				<div className={styles.orbitalPrimary} />
				<div className={styles.orbitalSecondary} />
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className={styles.beam}
						style={{
							left: `${20 + i * 30}%`,
							animationDelay: `${i * 2.5}s`,
						}}
					/>
				))}
			</div>

			<div className={styles.container}>
				{/* Header */}
				<div className={styles.header}>
					<div className={styles.titleGroup}>
						<h1 className={styles.title}>Settings</h1>
						<p className={styles.subtitle}>Manage your account settings and preferences</p>
					</div>
				</div>

				{/* Message */}
				{message && (
					<div className={`${styles.message} ${styles[message.type]}`}>
						{message.type === 'success' ? <FiCheckCircle size={18} /> : <FiXCircle size={18} />}
						<span>{message.text}</span>
					</div>
				)}

				{/* Settings Grid */}
				<div className={styles.settingsGrid}>
					{/* Profile Section */}
					<section className={styles.section}>
						<div className={styles.sectionHeader}>
							<h2 className={styles.sectionTitle}>Profile Information</h2>
							<p className={styles.sectionDescription}>Update your personal details and profile picture</p>
						</div>

						<form onSubmit={handleUpdateProfile} className={styles.form}>
							{/* Avatar */}
							<div className={styles.avatarSection}>
								<div className={styles.avatarWrapper}>
									{avatarUrl ? (
										<img src={avatarUrl} alt="Profile" className={styles.avatar} />
									) : (
										<div className={styles.avatarPlaceholder}>
											<FiUser size={40} />
										</div>
									)}
									<div className={styles.avatarOverlay}>
										<FiCamera size={20} />
									</div>
								</div>
								<div className={styles.avatarInfo}>
									<label htmlFor="avatarUrl" className={styles.avatarLabel}>
										Profile Photo
									</label>
									<p className={styles.avatarHint}>JPG, PNG or GIF. Max size 2MB.</p>
								</div>
							</div>

							{/* Avatar URL Input */}
							<div className={styles.inputGroup}>
								<label htmlFor="avatarUrl" className={styles.label}>
									Avatar URL
								</label>
								<input
									id="avatarUrl"
									type="url"
									value={avatarUrl}
									onChange={e => setAvatarUrl(e.target.value)}
									placeholder="https://example.com/avatar.jpg"
									className={styles.input}
								/>
							</div>

							{/* Full Name */}
							<div className={styles.inputGroup}>
								<label htmlFor="name" className={styles.label}>
									Full Name
								</label>
								<div className={styles.inputWrapper}>
									<FiUser className={styles.inputIcon} size={18} />
									<input
										id="name"
										type="text"
										value={name}
										onChange={e => setName(e.target.value)}
										placeholder="John Doe"
										className={styles.input}
										required
									/>
								</div>
							</div>

							{/* Username */}
							<div className={styles.inputGroup}>
								<label htmlFor="username" className={styles.label}>
									Username / Handle
								</label>
								<div className={styles.inputWrapper}>
									<span className={styles.inputPrefix}>@</span>
									<input
										id="username"
										type="text"
										value={username}
										onChange={e => setUsername(e.target.value)}
										placeholder="johndoe"
										className={`${styles.input} ${styles.inputWithPrefix}`}
									/>
								</div>
								<p className={styles.inputHint}>This will be your unique identifier</p>
							</div>

							{/* Email (Locked) */}
							<div className={styles.inputGroup}>
								<label htmlFor="email" className={styles.label}>
									Email Address
								</label>
								<div className={styles.inputWrapper}>
									<FiMail className={styles.inputIcon} size={18} />
									<input
										id="email"
										type="email"
										value={profile?.email || ''}
										disabled
										className={`${styles.input} ${styles.inputDisabled}`}
									/>
									<div className={styles.inputBadge}>
										{profile?.emailVerified ? (
											<>
												<FiCheckCircle size={14} />
												<span>Verified</span>
											</>
										) : (
											<>
												<FiXCircle size={14} />
												<span>Not Verified</span>
											</>
										)}
									</div>
								</div>
								<p className={styles.inputHint}>Email cannot be changed</p>
							</div>

							{/* Submit Button */}
							<button type="submit" disabled={saving} className={styles.button}>
								{saving ? (
									<>
										<div className={styles.buttonSpinner} />
										<span>Saving...</span>
									</>
								) : (
									<span>Save Changes</span>
								)}
							</button>
						</form>
					</section>

					{/* Security Section */}
					<section className={styles.section}>
						<div className={styles.sectionHeader}>
							<h2 className={styles.sectionTitle}>Security</h2>
							<p className={styles.sectionDescription}>Update your password and secure your account</p>
						</div>

						<form onSubmit={handleChangePassword} className={styles.form}>
							{/* Current Password */}
							<div className={styles.inputGroup}>
								<label htmlFor="currentPassword" className={styles.label}>
									Current Password
								</label>
								<div className={styles.inputWrapper}>
									<FiLock className={styles.inputIcon} size={18} />
									<input
										id="currentPassword"
										type="password"
										value={currentPassword}
										onChange={e => setCurrentPassword(e.target.value)}
										placeholder="Enter current password"
										className={styles.input}
										required
									/>
								</div>
							</div>

							{/* New Password */}
							<div className={styles.inputGroup}>
								<label htmlFor="newPassword" className={styles.label}>
									New Password
								</label>
								<div className={styles.inputWrapper}>
									<FiLock className={styles.inputIcon} size={18} />
									<input
										id="newPassword"
										type="password"
										value={newPassword}
										onChange={e => setNewPassword(e.target.value)}
										placeholder="Enter new password"
										className={styles.input}
										minLength={8}
										required
									/>
								</div>
								<p className={styles.inputHint}>Must be at least 8 characters</p>
							</div>

							{/* Confirm Password */}
							<div className={styles.inputGroup}>
								<label htmlFor="confirmPassword" className={styles.label}>
									Confirm New Password
								</label>
								<div className={styles.inputWrapper}>
									<FiLock className={styles.inputIcon} size={18} />
									<input
										id="confirmPassword"
										type="password"
										value={confirmPassword}
										onChange={e => setConfirmPassword(e.target.value)}
										placeholder="Confirm new password"
										className={styles.input}
										minLength={8}
										required
									/>
								</div>
							</div>

							{/* Submit Button */}
							<button type="submit" disabled={saving} className={`${styles.button} ${styles.buttonSecondary}`}>
								{saving ? (
									<>
										<div className={styles.buttonSpinner} />
										<span>Updating...</span>
									</>
								) : (
									<>
										<FiLock size={16} />
										<span>Change Password</span>
									</>
								)}
							</button>
						</form>
					</section>
				</div>
			</div>
		</div>
	)
}
