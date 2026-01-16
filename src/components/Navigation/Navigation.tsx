'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FiMenu, FiSearch, FiPlus, FiBell, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme, useLocale, useLocalePath } from '@/common/hooks'
import { Button } from '@/common/components/ui'
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher'
import styles from './Navigation.module.scss'

export const Navigation = () => {
	const t = useTranslations('nav')
	const locale = useLocale()
	const localePath = useLocalePath()
	const { theme, toggleTheme } = useTheme()
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [searchOpen, setSearchOpen] = useState(false)

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
					{/* Search */}
					<div className={styles.search}>
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
					</div>

					{/* Add button */}
					<button className={styles.iconBtn} aria-label="Add">
						<FiPlus size={24} />
					</button>

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

					{/* Notifications */}
					<Link href={localePath('/notifications')} className={styles.iconBtn} aria-label={t('notifications')}>
						<FiBell size={20} />
						<span className={styles.notificationDot} />
					</Link>

					{/* Login button */}
					<Button variant="outline" size="sm">
						<Link href={localePath('/auth/login')}>{t('login')}</Link>
					</Button>
				</div>
			</div>
		</nav>
	)
}
