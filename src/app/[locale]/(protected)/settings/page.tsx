'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import styles from './Settings.module.scss'
import apiClient from '@/infrastructure/api/client'
import {
  FiCamera,
  FiLock,
  FiMail,
  FiUser,
  FiCheckCircle,
  FiXCircle,
  FiUpload,
  FiAlertCircle,
} from 'react-icons/fi'
import { Header } from '@/components/Header'

const profileSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .optional()
    .or(z.literal('')),
  avatarUrl: z.string().optional(),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type ProfileFormData = z.infer<typeof profileSchema>
type PasswordFormData = z.infer<typeof passwordSchema>

interface UserProfile {
  id: string
  email: string
  name: string
  username?: string
  avatarUrl?: string
  emailVerified: boolean
}

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [originalValues, setOriginalValues] = useState<ProfileFormData>({
    name: '',
    username: '',
    avatarUrl: '',
  })

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', username: '', avatarUrl: '' },
    mode: 'onChange',
  })

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isProfileSubmitting },
    setValue: setProfileValue,
    watch: watchProfile,
    reset: resetProfile,
    setError: setProfileError,
  } = profileForm

  const watchedAvatarUrl = watchProfile('avatarUrl')
  const watchedName = watchProfile('name')
  const watchedUsername = watchProfile('username')

  const hasProfileChanges =
    watchedName !== originalValues.name ||
    watchedUsername !== originalValues.username ||
    watchedAvatarUrl !== originalValues.avatarUrl

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
    mode: 'onChange',
  })

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting, isValid: isPasswordValid },
    reset: resetPassword,
    watch: watchPassword,
    setError: setPasswordError,
  } = passwordForm

  const watchedCurrentPassword = watchPassword('currentPassword')
  const watchedNewPassword = watchPassword('newPassword')
  const watchedConfirmPassword = watchPassword('confirmPassword')

  const hasPasswordInput =
    watchedCurrentPassword.length > 0 ||
    watchedNewPassword.length > 0 ||
    watchedConfirmPassword.length > 0

  const loadProfile = async () => {
    try {
      const response = await apiClient.get('/account/profile')
      const data = response.data
      setProfile(data)

      const formValues: ProfileFormData = {
        name: data.name || '',
        username: data.username || '',
        avatarUrl: data.avatarUrl || '',
      }

      resetProfile(formValues)
      setOriginalValues(formValues)
    } catch {
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProfile()
  }, [])

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      setProfileError('root', { message: 'File size must be less than 2MB' })
      return
    }

    if (!file.type.startsWith('image/')) {
      setProfileError('root', { message: 'Please select an image file' })
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await apiClient.post('/upload/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setProfileValue('avatarUrl', response.data.url, { shouldDirty: true })
      toast.success('Avatar uploaded! Click "Save Changes" to apply.')
    } catch (error: any) {
      setProfileError('root', {
        message: error.response?.data?.message || 'Failed to upload avatar',
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      await apiClient.patch('/account/profile', {
        name: data.name,
        username: data.username || null,
        avatarUrl: data.avatarUrl || null,
      })

      toast.success('Profile updated successfully!')
      setOriginalValues(data)
      await loadProfile()
    } catch (error: any) {
      const errorMessage = error.response?.data?.message

      if (errorMessage?.includes('username') && errorMessage?.includes('taken')) {
        setProfileError('username', { message: 'This username is already taken' })
      } else {
        setProfileError('root', { message: errorMessage || 'Failed to update profile' })
      }
    }
  }

  const onSubmitPassword = async (data: PasswordFormData) => {
    try {
      await apiClient.patch('/account/password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      })

      toast.success('Password changed successfully!')
      resetPassword()
    } catch (error: any) {
      const errorMessage = error.response?.data?.message

      if (errorMessage?.includes('current') || errorMessage?.includes('incorrect')) {
        setPasswordError('currentPassword', { message: 'Current password is incorrect' })
      } else {
        setPasswordError('root', { message: errorMessage || 'Failed to change password' })
      }
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
        <div className={styles.background}>
          <div className={styles.grid} />
          <div className={styles.orbitalPrimary} />
          <div className={styles.orbitalSecondary} />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={styles.beam}
              style={{ left: `${20 + i * 30}%`, animationDelay: `${i * 2.5}s` }}
            />
          ))}
        </div>

        <div className={styles.container}>
          <div className={styles.settingsGrid}>
            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Profile Information</h2>
                <p className={styles.sectionDescription}>
                  Update your personal details and profile picture
                </p>
              </div>

              {profileErrors.root && (
                <div className={`${styles.message} ${styles.error}`}>
                  <FiXCircle size={18} />
                  <span>{profileErrors.root.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmitProfile(onSubmitProfile)} className={styles.form}>
                <div className={styles.avatarSection}>
                  <div
                    className={styles.avatarWrapper}
                    onClick={() => fileInputRef.current?.click()}
                    style={{ cursor: uploading ? 'wait' : 'pointer' }}
                  >
                    {watchedAvatarUrl ? (
                      <img src={watchedAvatarUrl} alt="Profile" className={styles.avatar} />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        <FiUser size={40} />
                      </div>
                    )}
                    <div className={styles.avatarOverlay}>
                      {uploading ? <div className={styles.buttonSpinner} /> : <FiCamera size={20} />}
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

                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Full Name
                  </label>
                  <div className={`${styles.inputWrapper} ${profileErrors.name ? styles.inputError : ''}`}>
                    <FiUser className={styles.inputIcon} size={18} />
                    <input
                      id="name"
                      type="text"
                      {...registerProfile('name')}
                      placeholder="John Doe"
                      className={styles.input}
                    />
                  </div>
                  {profileErrors.name && (
                    <p className={styles.errorText}>
                      <FiAlertCircle size={14} />
                      {profileErrors.name.message}
                    </p>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="username" className={styles.label}>
                    Username / Handle
                  </label>
                  <div className={`${styles.inputWrapper} ${profileErrors.username ? styles.inputError : ''}`}>
                    <span className={styles.inputPrefix}>@</span>
                    <input
                      id="username"
                      type="text"
                      {...registerProfile('username')}
                      placeholder="johndoe"
                      className={`${styles.input} ${styles.inputWithPrefix}`}
                    />
                  </div>
                  {profileErrors.username ? (
                    <p className={styles.errorText}>
                      <FiAlertCircle size={14} />
                      {profileErrors.username.message}
                    </p>
                  ) : (
                    <p className={styles.inputHint}>Letters, numbers, and underscores only</p>
                  )}
                </div>

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

                <button
                  type="submit"
                  disabled={isProfileSubmitting || !hasProfileChanges || uploading}
                  className={styles.button}
                >
                  {isProfileSubmitting ? (
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

            <section className={styles.section}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Security</h2>
                <p className={styles.sectionDescription}>Update your password and secure your account</p>
              </div>

              {passwordErrors.root && (
                <div className={`${styles.message} ${styles.error}`}>
                  <FiXCircle size={18} />
                  <span>{passwordErrors.root.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmitPassword(onSubmitPassword)} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label htmlFor="currentPassword" className={styles.label}>
                    Current Password
                  </label>
                  <div
                    className={`${styles.inputWrapper} ${passwordErrors.currentPassword ? styles.inputError : ''}`}
                  >
                    <FiLock className={styles.inputIcon} size={18} />
                    <input
                      id="currentPassword"
                      type="password"
                      {...registerPassword('currentPassword')}
                      placeholder="Enter current password"
                      className={styles.input}
                    />
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className={styles.errorText}>
                      <FiAlertCircle size={14} />
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="newPassword" className={styles.label}>
                    New Password
                  </label>
                  <div className={`${styles.inputWrapper} ${passwordErrors.newPassword ? styles.inputError : ''}`}>
                    <FiLock className={styles.inputIcon} size={18} />
                    <input
                      id="newPassword"
                      type="password"
                      {...registerPassword('newPassword')}
                      placeholder="Enter new password"
                      className={styles.input}
                    />
                  </div>
                  {passwordErrors.newPassword ? (
                    <p className={styles.errorText}>
                      <FiAlertCircle size={14} />
                      {passwordErrors.newPassword.message}
                    </p>
                  ) : (
                    <p className={styles.inputHint}>Min 8 chars, 1 uppercase, 1 lowercase, 1 number</p>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="confirmPassword" className={styles.label}>
                    Confirm New Password
                  </label>
                  <div
                    className={`${styles.inputWrapper} ${passwordErrors.confirmPassword ? styles.inputError : ''}`}
                  >
                    <FiLock className={styles.inputIcon} size={18} />
                    <input
                      id="confirmPassword"
                      type="password"
                      {...registerPassword('confirmPassword')}
                      placeholder="Confirm new password"
                      className={styles.input}
                    />
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className={styles.errorText}>
                      <FiAlertCircle size={14} />
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPasswordSubmitting || !isPasswordValid || !hasPasswordInput}
                  className={`${styles.button} ${styles.buttonSecondary}`}
                >
                  {isPasswordSubmitting ? (
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
