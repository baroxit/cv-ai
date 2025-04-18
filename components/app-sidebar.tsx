'use client'

import * as React from 'react'
import { useState, useEffect } from 'react'

import {
	BicepsFlexed,
	BriefcaseBusiness,
	Folder,
	GalleryHorizontalEnd,
	LifeBuoy,
	Pen,
	Plus,
	Send,
	Settings,
	User
} from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import { NavProjects } from '@/components/nav-projects'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'
import { createClient } from '@/utils/supabase/client'
import { getUserMetadata } from '@/api/about/serverActions'

import packageJson from '@/package.json'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [user, setUser] = useState<any | null>(null)
	const supabase = createClient()

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data, error } = await supabase.auth.getSession()

				if (error) {
					console.error('Error fetching user:', error)
					throw new Error('Failed to fetch user data. Please refresh the page.')
				} else if (!data.session) {
					console.error('No session found')
					throw new Error('No session found. Please log in again.')
				}
				setUser(data.session.user)
			} catch (error: any) {
				console.error('Error in AppSidebar:', error)
			}
		}

		fetchUser()
	}, [])

	const data = {
		navMain: [
			{
				title: 'New CV',
				url: '/dashboard/cv/create/company',
				icon: Pen
			},
			{
				title: 'Your CVs',
				url: '/dashboard/cv',
				icon: Folder
			},
			{
				title: 'About you',
				url: '/dashboard/experiences',
				icon: User
			}
		],
		navSecondary: [
			{
				title: 'Settings',
				url: '/dashboard/settings',
				icon: Settings
			},
			{
				title: 'Support',
				url: 'mailto:jack11.bari@gmail.com',
				icon: LifeBuoy
			},
			{
				title: 'Feedback',
				url: 'https://www.linkedin.com/in/giacomo-barilari/',
				icon: Send
			}
		]
	}

	return (
		<Sidebar variant='inset' {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size='lg' asChild>
							<a href='#'>
								<div className='flex aspect-square size-10 items-center justify-center rounded-lg bg-background border'>
									<GalleryHorizontalEnd className='size-5' />
								</div>
								<div className='grid flex-1 text-left text-sm leading-tight'>
									<span className='truncate font-semibold'>{packageJson.name}</span>
									<span className='truncate text-xs'>v{packageJson.version}</span>
								</div>
							</a>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavSecondary items={data.navSecondary} className='mt-auto' />
			</SidebarContent>
			<SidebarFooter>
				{user && <NavUser user={{ email: user.email, name: user.user_metadata.display_name }} />}
			</SidebarFooter>
		</Sidebar>
	)
}
