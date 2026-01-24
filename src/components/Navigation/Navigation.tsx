'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FiMenu, /* FiSearch, */ FiSun, FiMoon, FiBarChart2, FiLogOut, FiSettings } from 'react-icons/fi'
import { useTheme, useLocale, useLocalePath } from '@/common/hooks'
import { useAuth, useLogout } from '@/modules/auth/hooks/use-auth'
import { Button } from '@/common/components/ui'
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher'
import styles from './Navigation.module.scss'

export const Navigation = () => {
	const t = useTranslations('nav')
	const locale = useLocale()
	const localePath = useLocalePath()
	const { theme, toggleTheme } = useTheme()
	const { user, isAuthenticated, isLoading } = useAuth()
	const logout = useLogout()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	// const [searchOpen, setSearchOpen] = useState(false)
	const [userMenuOpen, setUserMenuOpen] = useState(false)
	const userMenuRef = useRef<HTMLDivElement>(null)

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
				setUserMenuOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<nav className={styles.nav}>
			<div className={styles.container}>
				{/* Left side - Logo & Menu */}
				<div className={styles.left}>
					{/* Mobile menu button */}
					<button
						className={styles.mobileMenuBtn}
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle menu"
					>
						<FiMenu size={24} />
					</button>

					{/* Logo */}
					<Link href={`/${locale}`} className={styles.logo}>
						<div className={styles.logoIcon}>👤</div>
						<h1 className={styles.logoText}>{t('logo')}</h1>
					</Link>

					{/* Desktop menu */}
					<div className={styles.desktopMenu}>
						<Link href={localePath('/interview-questions')} className={styles.menuLink}>
							{t('links.questions')}
						</Link>
						<Link href={localePath('/problems')} className={styles.menuLink}>
							{t('links.problems')}
						</Link>
						<Link href={localePath('/check-knowledge')} className={styles.menuLink}>
							{t('links.knowledgeCheck')}
						</Link>
					</div>
				</div>

				{/* Right side - Actions */}
				<div className={styles.right}>
					{/* Search - hidden for now */}
					{/* <div className={styles.search}>
						<button
							className={styles.searchBtnMobile}
							onClick={() => setSearchOpen(!searchOpen)}
							aria-label="Search"
						>
							<FiSearch size={20} />
						</button>
						<div className={styles.searchDesktop}>
							<FiSearch className={styles.searchIcon} size={16} />
							<input
								type="search"
								placeholder={t('search')}
								className={styles.searchInput}
							/>
						</div>
					</div> */}

					{/* Add button - hidden for now */}
					{/* <button className={styles.iconBtn} aria-label="Add">
						<FiPlus size={24} />
					</button> */}

					{/* Language switcher */}
					<LanguageSwitcher />

					{/* Theme toggle */}
					<button
						className={styles.iconBtn}
						onClick={toggleTheme}
						aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
						title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
					>
						{theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
					</button>

				{/* Notifications - hidden for now */}
				{/* <Link href={localePath('/notifications')} className={styles.iconBtn} aria-label={t('notifications')}>
					<FiBell size={20} />
					<span className={styles.notificationDot} />
				</Link> */}

				{/* User Avatar with Dropdown OR Login button */}
				{isLoading ? (
					<div className={styles.avatarSkeleton} />
				) : isAuthenticated ? (
					<div className={styles.userMenu} ref={userMenuRef}>
						<button
							className={styles.avatarBtn}
							onClick={() => setUserMenuOpen(!userMenuOpen)}
							aria-label="User menu"
						>
							<img
								src={user?.avatarUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=128'}
								alt={user?.name || 'User'}
								className={styles.avatar}
							/>
						</button>
						
						{userMenuOpen && (
							<div className={styles.dropdown}>
								<Link
									href={localePath('/dashboard')}
									className={styles.dropdownItem}
									onClick={() => setUserMenuOpen(false)}
								>
									<FiBarChart2 size={18} />
									<span>{t('dashboard')}</span>
								</Link>
								
								<button
									className={styles.dropdownItem}
									onClick={() => {
										logout.mutate()
										setUserMenuOpen(false)
									}}
								>
									<FiLogOut size={18} />
									<span>{t('logout')}</span>
								</button>
							</div>
						)}
					</div>
				) : (
					<Button variant="outline" size="sm">
						<Link href={localePath('/auth/login')}>{t('login')}</Link>
					</Button>
				)}
			</div>
			</div>
		</nav>
	)
}
