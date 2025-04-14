'use client'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useTheme } from 'next-themes'

export function ChangeThemeSwitch() {
	const { theme, setTheme } = useTheme()

	const changeTheme = (checked: boolean) => {
		setTheme(checked ? 'dark' : 'light')
	}

	return (
		<div className='flex flex-row items-center justify-between rounded-lg border p-3 mt-1.5 shadow-sm'>
			<Label>Dark mode</Label>
			<Switch checked={theme === 'dark'} onCheckedChange={(checked) => changeTheme(checked)} />
		</div>
	)
}
