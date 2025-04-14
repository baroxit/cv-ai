'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

const LightPreview = () => (
	<div className='space-y-2 rounded-lg bg-[#ecedef] p-2'>
		<div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
			<div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
			<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
		</div>
		<div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
			<div className='h-4 w-4 rounded-full bg-[#ecedef]' />
			<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
		</div>
		<div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
			<div className='h-4 w-4 rounded-full bg-[#ecedef]' />
			<div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
		</div>
	</div>
)

const DarkPreview = () => (
	<div className='space-y-2 rounded-lg bg-[#0f111a] p-2'>
		<div className='space-y-2 rounded-md bg-[#1a1d2a] p-2 shadow-sm'>
			<div className='h-2 w-[80px] rounded-lg bg-[#4b5563]' />
			<div className='h-2 w-[100px] rounded-lg bg-[#4b5563]' />
		</div>
		<div className='flex items-center space-x-2 rounded-md bg-[#1a1d2a] p-2 shadow-sm'>
			<div className='h-4 w-4 rounded-full bg-[#4b5563]' />
			<div className='h-2 w-[100px] rounded-lg bg-[#4b5563]' />
		</div>
		<div className='flex items-center space-x-2 rounded-md bg-[#1a1d2a] p-2 shadow-sm'>
			<div className='h-4 w-4 rounded-full bg-[#4b5563]' />
			<div className='h-2 w-[100px] rounded-lg bg-[#4b5563]' />
		</div>
	</div>
)

const SystemPreview = () => (
	<div className='space-y-2 rounded-lg bg-gradient-to-r from-[#ecedef] to-[#0f111a] p-2'>
		<div className='space-y-2 rounded-md bg-gradient-to-r from-white to-[#1a1d2a] p-2 shadow-sm'>
			<div className='h-2 w-[80px] rounded-lg bg-gradient-to-r from-[#ecedef] to-[#4b5563]' />
			<div className='h-2 w-[100px] rounded-lg bg-gradient-to-r from-[#ecedef] to-[#4b5563]' />
		</div>
		<div className='flex items-center space-x-2 rounded-md bg-gradient-to-r from-white to-[#1a1d2a] p-2 shadow-sm'>
			<div className='h-4 w-4 rounded-full bg-gradient-to-r from-[#ecedef] to-[#4b5563]' />
			<div className='h-2 w-[100px] rounded-lg bg-gradient-to-r from-[#ecedef] to-[#4b5563]' />
		</div>
		<div className='flex items-center space-x-2 rounded-md bg-gradient-to-r from-white to-[#1a1d2a] p-2 shadow-sm'>
			<div className='h-4 w-4 rounded-full bg-gradient-to-r from-[#ecedef] to-[#4b5563]' />
			<div className='h-2 w-[100px] rounded-lg bg-gradient-to-r from-[#ecedef] to-[#4b5563]' />
		</div>
	</div>
)

const themes = [
	{
		name: 'Light',
		value: 'light',
		borderClass: 'border-black',
		preview: <LightPreview />
	},
	{
		name: 'Dark',
		value: 'dark',
		borderClass: 'border-white',
		preview: <DarkPreview />
	},
	{
		name: 'System',
		value: 'system',
		borderClass: 'border-gray-500',
		preview: <SystemPreview />
	}
]

export function ThemeModeSelectorPreview() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return (
		<div className='flex flex-wrap gap-4 justify-center'>
			{themes.map((item) => (
				<div key={item.value} className='flex flex-col items-center'>
					<Card
						onClick={() => setTheme(item.value)}
						className={cn(
							'cursor-pointer p-1 rounded-xl border-2 transition-all hover:border-accent',
							theme === item.value ? item.borderClass : 'border-transparent'
						)}
					>
						<div className='w-full sm:w-40 h-28 rounded-lg overflow-hidden'>{item.preview}</div>
					</Card>
					<p className='text-center text-sm mt-2'>{item.name}</p>
				</div>
			))}
		</div>
	)
}
