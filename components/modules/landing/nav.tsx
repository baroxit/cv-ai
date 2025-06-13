'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { GalleryHorizontalEnd } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useCurrentUserImage } from '@/hooks/use-current-user-image'
import { useCurrentUserName } from '@/hooks/use-current-user-name'

import packageJson from '@/package.json'

const Navbar: React.FC<{ user: User | null }> = ({ user }) => {
	const [scrolled, setScrolled] = useState(false)
	const image = useCurrentUserImage()
	const name = useCurrentUserName()

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 0)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const getFirstName = (name: string | null) => {
		if (!name) return ''
		return name.split(' ')[0]
	}

	return (
		<nav
			className={`sticky top-0 z-40 border-b transition duration-200 ease-in-out animate-header-slide-down-fade ${
				scrolled ? 'border-white/20' : 'border-transparent'
			}`}
		>
			<div className='flex px-4 justify-between h-[58px] items-center mx-auto w-full max-w-screen-lg backdrop-blur-md'>
				<div className='flex items-center'>
					<GalleryHorizontalEnd className='mr-2 opacity-85' />
					<span className='text-lg font-semibold tracking-wide'>{packageJson.name}</span>
				</div>

				<div className='flex gap-2 items-center'>
					{user ? (
						<>
							<div className='flex gap-1.5 items-center text-[15px] font-medium'>
								<span>Hey there,</span>
								<Avatar className='ml-0.5 size-6 rounded-full'>
									{image && <AvatarImage src={image} alt={name || ''} />}
								</Avatar>
								<span>{getFirstName(name)}!</span>
							</div>
							<Link href='/dashboard/experiences'>
								<Button className='bg-gray-50 hover:bg-white group flex justify-between rounded-lg text-[13px] py-0 font-semibold shadow-[0_0_0_2px_rgba(0,0,0,0.5),0_0_14px_0_hsla(0,0%,100%,0.19),inset_0_-1px_0.4px_0_rgba(0,0,0,0.2),inset_0_1px_0.4px_0_#fff]'>
									Dashboard
								</Button>
							</Link>
						</>
					) : (
						<>
							<Link href='/login'>
								<Button variant='outline' className='rounded-full text-sm font-semibold px-4 py-2'>
									Login
								</Button>
							</Link>
							<Link href='/auth/signup'>
								<Button className='bg-gray-50 hover:bg-white group flex justify-between rounded-lg text-[13px] py-0 font-semibold shadow-[0_0_0_2px_rgba(0,0,0,0.5),0_0_14px_0_hsla(0,0%,100%,0.19),inset_0_-1px_0.4px_0_rgba(0,0,0,0.2),inset_0_1px_0.4px_0_#fff]'>
									Signup
								</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Navbar
