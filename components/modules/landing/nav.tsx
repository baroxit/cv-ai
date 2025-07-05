'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GalleryHorizontalEnd, LogIn, FileText, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { useCurrentUserImage } from '@/hooks/use-current-user-image'
import { useCurrentUserName } from '@/hooks/use-current-user-name'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import packageJson from '@/package.json'

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
	return (
		<li {...props} className='p-2 transition-all duration-400 border border-transparent hover:border-transparent rounded-lg hover:bg-accent/40'>
			<NavigationMenuLink asChild >
				<Link href={href}>
					<div className="text-sm leading-none font-medium">{title}</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	)
}

const Navbar: React.FC = () => {
	const [scrolled, setScrolled] = useState(false)
	const image = useCurrentUserImage()
	const name = useCurrentUserName()
	const pathname = usePathname()

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
		<nav className={`sticky z-40 top-3 px-4 lg:px-0`}>
			<div className={`flex px-6 py-5 transition-all duration-500 ease-in-out animate-header-slide-down-fade rounded-xl justify-between items-center mx-auto w-full max-w-screen-lg backdrop-blur-md border relative ${scrolled ? 'bg-[linear-gradient(137deg,rgba(17,18,20,.08)_4.87%,rgba(12,13,15,.12)_75.88%)] border-[hsla(0,0%,100%,.16)]' : 'border-transparent'}`}>
				<div className='flex items-center'>
					<GalleryHorizontalEnd className='mr-2 opacity-85' />
					<span className='text-lg font-semibold tracking-wide'>{packageJson.name}</span>
				</div>

				<div className='absolute left-1/2 transform -translate-x-1/2'>
					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
						<NavigationMenuItem>
							<NavigationMenuTrigger className={pathname === '/' ? 'bg-accent/50' : ''}>Product</NavigationMenuTrigger>
							<NavigationMenuContent className=''>
								<ul className="grid gap-2 md:w-[400px] lg:w-[600px] lg:grid-cols-[.75fr_1fr] gap-2 p-4">
								<li className="row-span-3">
									<NavigationMenuLink asChild>
									<Link href="/">
										<div
											className="from-[rgba(25,26,28,0.8)] to-[rgba(12,13,15,0.9)] border border-white/10 flex h-full w-full flex-col justify-end rounded-lg bg-gradient-to-b p-6 no-underline outline-hidden select-none focus:shadow-md hover:from-[rgba(30,31,33,0.85)] hover:to-[rgba(15,16,18,0.95)] transition-all duration-400 cursor-pointer"
										>
											<GalleryHorizontalEnd className='opacity-90' />
											<div className="mt-1 mb-2 text-lg font-medium">
											{packageJson.name}
											</div>
											<p className="text-muted-foreground text-sm leading-tight">
											Tailor your CV for every opportunity
											</p>
										</div>
									</Link>
									</NavigationMenuLink>
								</li>
								<ListItem href="#features" title="Features">
									Re-usable components built using Radix UI and Tailwind CSS.
								</ListItem>
								<ListItem href="#ai" title="AI-powered CV enhancement">
									Our AI analyzes your CV and provides suggestions to improve your resume.
								</ListItem>
								</ul>
							</NavigationMenuContent>
							</NavigationMenuItem>
							{/*
							<NavigationMenuItem>
								<NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
									<Link href="/test-your-cv" className={`bg-transparent text-white hover:bg-white/10 data-[state=open]:bg-white/10 ${pathname === '/test-your-cv' ? 'bg-accent/50' : ''}`}>
										Test your resume
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
							
							<NavigationMenuItem>
								<NavigationMenuTrigger className={pathname.startsWith('/about') ? 'bg-accent/50' : ''}>About</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[300px] gap-2 p-2">
										<ListItem href="/about/team" title="The team">
											Meet the team behind the project.
										</ListItem>
										<ListItem href="/about/manifesto" title="Manifesto">
											Read about our mission and values.
										</ListItem>
										<ListItem href="/about/next-steps" title="Next steps">
											What's next for the project.
										</ListItem>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
							*/}
						</NavigationMenuList>
					</NavigationMenu>
				</div>

				<div className='flex gap-2 items-center'>
					{name !== '?' ? (
						<>
							<Link href='/dashboard/experiences'>
								<Button className='bg-gray-50 h-9 hover:bg-white group flex items-center justify-between rounded-lg py-0 font-semibold shadow-[0_0_0_2px_rgba(0,0,0,0.5),0_0_14px_0_hsla(0,0%,100%,0.19),inset_0_-1px_0.4px_0_rgba(0,0,0,0.2),inset_0_1px_0.4px_0_#fff]'>
									{image && 
										<Avatar className='size-5 rounded-full'>
											<AvatarImage src={image} alt={name || ''} />
										</Avatar>
									}
									Dashboard
								</Button>
							</Link>
						</>
					) : (
						<>
							<Link href='/login'>
								<Button variant='outline' className='bg-transparent transition-all duration-500 text-white group flex justify-between rounded-lg text-[15px] py-0 font-medium bg-[linear-gradient(180deg,hsla(0,0%,100%,.03),hsla(0,0%,100%,.1))] shadow-[0_0_0_1px_hsla(0,0%,100%,.2)] hover:shadow-[inset_0_1px_0_0_hsla(0,0%,100%,.05),0_0_0_1px_hsla(0,0%,100%,.4),inset_0_-1px_0_0_rgba(0,0,0,.2)]'>
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
