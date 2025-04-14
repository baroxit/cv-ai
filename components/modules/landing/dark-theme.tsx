'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState, useRef } from 'react'

export default function DarkTheme({ children }: { children: React.ReactNode }) {
	const { theme, setTheme } = useTheme()
	const savedThemeRef = useRef<string | undefined>(undefined)

	useEffect(() => {
		// Store the current theme before changing it
		if (theme !== 'dark') {
			savedThemeRef.current = theme
			console.log('Saving current theme:', theme)
		}

		// Set theme to dark for this page
		setTheme('dark')

		// Cleanup function to restore previous theme when unmounting
		return () => {
			if (savedThemeRef.current) {
				console.log('Restoring previous theme:', savedThemeRef.current)
				setTheme(savedThemeRef.current)
			}
		}
	}, [theme, setTheme])

	return <div className='bg-neutral-950'>{children}</div>
}
