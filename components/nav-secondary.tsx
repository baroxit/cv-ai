import * as React from 'react'
import { type LucideIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'
import { ChangeThemeSwitch } from '@/components/change-theme-switch'
import NavNews from './nav-news'

export function NavSecondary({
	items,
	...props
}: {
	items: {
		title: string
		url: string
		icon: LucideIcon
	}[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
	// Add client-side only theme state
	const [mounted, setMounted] = React.useState(false)
	const { theme } = useTheme()

	// Prevent hydration mismatch
	React.useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<SidebarGroup {...props}>
			<SidebarGroupContent>
				<SidebarMenu>
					<NavNews />
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild size='default'>
								<a href={item.url}>
									<item.icon />
									<span className='text-sm'>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
					{/* Only show theme switch if mounted and theme is not system */}
					{mounted && theme !== 'system' && <ChangeThemeSwitch />}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	)
}
