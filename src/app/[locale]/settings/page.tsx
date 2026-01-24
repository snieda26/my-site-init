'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Settings.module.scss'
import apiClient from '@/infrastructure/api/client'
import { FiCamera, FiLock, FiMail, FiUser, FiCheckCircle, FiXCircle, FiUpload } from 'react-icons/fi'
import { Header } from '@/components/Header'

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
	const [uploading, setUploading] = useState(false)
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
	const fileInputRef = useRef<HTMLInputElement>(null)

	// Form states
	const [name, setName] = useState('')
	const [username, setUsername] = useState('')
	const [avatarUrl, setAvatarUrl] = useState('')
	const [avatarFile, setAvatarFile] = useState<File | null>(null)
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	// Original values for comparison
	const [originalName, setOriginalName] = useState('')
	const [originalUsername, setOriginalUsername] = useState('')
	const [originalAvatarUrl, setOriginalAvatarUrl] = useState('')

	useEffect(() => {
		loadProfile()
	}, [])

	const loadProfile = async () => {
		try {
			const response = await apiClient.get('/account/profile')
			setProfile(response.data)
			const profileName = response.data.name || ''
			const profileUsername = response.data.username || ''
			const profileAvatarUrl = response.data.avatarUrl || ''
			
			setName(profileName)
			setUsername(profileUsername)
			setAvatarUrl(profileAvatarUrl)
			
			// Store original values
			setOriginalName(profileName)
			setOriginalUsername(profileUsername)
			setOriginalAvatarUrl(profileAvatarUrl)
		} catch (error: any) {
			if (error.response?.status === 401) {
				router.push('/auth/login')
			}
		} finally {
			setLoading(false)
		}
	}

	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		// Validate file size (2MB)
		if (file.size > 2 * 1024 * 1024) {
			setMessage({ type: 'error', text: 'File size must be less than 2MB' })
			return
		}

		// Validate file type
		if (!file.type.startsWith('image/')) {
			setMessage({ type: 'error', text: 'Please select an image file' })
			return
		}

		setUploading(true)
		setMessage(null)

		try {
			const formData = new FormData()
			formData.append('file', file)

			const response = await apiClient.post('/upload/avatar', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			setAvatarUrl(response.data.url)
			setAvatarFile(file)
			setMessage({ type: 'success', text: 'Avatar uploaded successfully! Click "Save Changes" to apply.' })
		} catch (error: any) {
			setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to upload avatar' })
		} finally {
			setUploading(false)
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
			setAvatarFile(null)
			await loadProfile()
		} catch (error: any) {
			setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to update profile' })
		} finally {
			setSaving(false)
		}
	}

	// Check if profile form has changes
	const hasProfileChanges =
		name !== originalName || username !== originalUsername || avatarUrl !== originalAvatarUrl

	// Check if password form is valid
	const isPasswordValid =
		currentPassword.length > 0 &&
		newPassword.length >= 8 &&
		confirmPassword.length >= 8 &&
		newPassword === confirmPassword

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
		<>
			<Header />
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
								<div
									className={styles.avatarWrapper}
									onClick={() => fileInputRef.current?.click()}
									style={{ cursor: uploading ? 'wait' : 'pointer' }}
								>
									{avatarUrl ? (
										<img src={avatarUrl} alt="Profile" className={styles.avatar} />
									) : (
										<div className={styles.avatarPlaceholder}>
											<FiUser size={40} />
										</div>
									)}
									<div className={styles.avatarOverlay}>
										{uploading ? (
											<div className={styles.buttonSpinner} />
										) : (
											<FiCamera size={20} />
										)}
									</div>
								</div>
								<div className={styles.avatarInfo}>
									<label className={styles.avatarLabel}>Profile Photo</label>
									<p className={styles.avatarHint}>JPG, PNG or GIF. Max size 2MB.</p>
									<button
										type="button"
										onClick={() => fileInputRef.current?.click()}
										disabled={uploading}
										className={styles.uploadButton}
									>
										<FiUpload size={16} />
										<span>{uploading ? 'Uploading...' : 'Upload Photo'}</span>
									</button>
								</div>
								<input
									ref={fileInputRef}
									type="file"
									accept="image/*"
									onChange={handleFileSelect}
									style={{ display: 'none' }}
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
							<button
								type="submit"
								disabled={saving || !hasProfileChanges || uploading}
								className={styles.button}
							>
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
							<button
								type="submit"
								disabled={saving || !isPasswordValid}
								className={`${styles.button} ${styles.buttonSecondary}`}
							>
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
		</>
	)
}
