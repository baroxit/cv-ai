'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { GalleryHorizontalEnd } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'

import packageJson from '@/package.json'

const Navbar: React.FC<{ user: User | null }> = ({ user }) => {
	const [scrolled, setScrolled] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 0)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

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
							<span className='text-sm font-medium'>Hello, {user.user_metadata?.display_name || user.email}!</span>
							<Link href='/dashboard/experiences'>
								<Button variant='default' className='rounded-full text-sm font-semibold px-4 py-2'>
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
								<Button variant='default' className='rounded-full text-sm font-semibold px-4 py-2'>
									Sign Up
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
