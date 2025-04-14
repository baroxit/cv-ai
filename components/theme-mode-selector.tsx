'use client'

import { useTheme } from 'next-themes'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState } from 'react'

export function ThemeModeSelector() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	// Avoid hydration mismatch by only rendering after client-side mount
	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<Select disabled defaultValue='system'>
				<SelectTrigger className='w-32'>
					<SelectValue placeholder='System' />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='light'>Light</SelectItem>
					<SelectItem value='dark'>Dark</SelectItem>
					<SelectItem value='system'>System</SelectItem>
				</SelectContent>
			</Select>
		)
	}

	return (
		<Select value={theme} onValueChange={setTheme}>
			<SelectTrigger className='w-32'>
				<SelectValue placeholder='Select theme' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='light'>Light</SelectItem>
				<SelectItem value='dark'>Dark</SelectItem>
				<SelectItem value='system'>System</SelectItem>
			</SelectContent>
		</Select>
	)
}
