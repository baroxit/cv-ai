'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { GalleryHorizontalEnd, LogIn } from 'lucide-react'
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
			setScrolled(window.scrollY > 10)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const getFirstName = (name: string | null) => {
		if (!name) return ''
		return name.split(' ')[0]
	}

	return (
		<nav className={`sticky z-40 top-3`}>
			<div className={`flex px-6 py-5 transition-all duration-500 ease-in-out animate-header-slide-down-fade rounded-xl justify-between items-center mx-auto w-full max-w-screen-lg backdrop-blur-md border ${scrolled ? 'bg-[linear-gradient(137deg,rgba(17,18,20,.75)_4.87%,rgba(12,13,15,.9)_75.88%)] border-[hsla(0,0%,100%,.06)]' : 'border-transparent'}`}>
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
								<Button className='bg-gray-50 h-8 hover:bg-white group flex items-center justify-between rounded-lg text-[13px] py-0 font-semibold shadow-[0_0_0_2px_rgba(0,0,0,0.5),0_0_14px_0_hsla(0,0%,100%,0.19),inset_0_-1px_0.4px_0_rgba(0,0,0,0.2),inset_0_1px_0.4px_0_#fff]'>
									Dashboard
									<LogIn className="transition-transform duration-300 group-hover:translate-x-0.5"/>
								</Button>
							</Link>
						</>
					) : (
						<>
							<Link href='/login'>
								<Button variant='outline' className='bg-transparent transition-all duration-700 text-white group flex justify-between rounded-lg text-[15px] py-0 font-medium bg-[linear-gradient(180deg,hsla(0,0%,100%,.03),hsla(0,0%,100%,.1))] shadow-[0_0_0_1px_hsla(0,0%,100%,.2)] hover:shadow-[inset_0_1px_0_0_hsla(0,0%,100%,.05),0_0_0_1px_hsla(0,0%,100%,.4),inset_0_-1px_0_0_rgba(0,0,0,.2)]'>
									Login
								</Button>
							</Link>
							<Link href='/auth/signup'>
								<Button className='bg-gray-200 hover:bg-white group flex justify-between rounded-lg text-[15px] py-0 font-semibold shadow-[0_0_0_2px_rgba(0,0,0,0.5),0_0_14px_0_hsla(0,0%,100%,0.19),inset_0_-1px_0.4px_0_rgba(0,0,0,0.2),inset_0_1px_0.4px_0_#fff]'>
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
