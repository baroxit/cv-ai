import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface HeroSectionProps {
	className?: string
}

interface HeroSectionProps {
	className?: string
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
	return (
		<div className={cn('container', className)}>
			<div className='w-fit mx-auto cursor-pointer group hover:border-white/20 hover:divide-white/20 border bg-muted/70 backdrop-blur-sm flex divide rounded-full border bg-dark text-xs font-medium drop-shadow-sm transition-all duration-150 sm:divide-x animate-slide-up-fade [--offset:10px] [animation-delay:0ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in'>
				<span className='py-1.5 pl-3 sm:pr-2.5 flex items-center'>Welcome to the first beta</span>
				<span className='flex items-center gap-1.5 p-1.5 pl-2.5 pr-2 text-zinc-300'>
					<span className='hidden sm:block group-hover:underline'>Read more</span>
					<div className='rounded-full p-0.5 bg-white/10'>
						<ArrowUpRight size={16} strokeWidth={2} />
					</div>
				</span>
			</div>
			<div className='my-4 font-display effect-font-styling text-[3.5rem] md:text-[4rem] leading-[4.35rem] md:leading-[4rem] tracking-tight gradient-text hero-text text-center md:text-center w-1/2 mx-auto leading tight'>
				Tailor your CV for every opportunity
			</div>
			<div className='md:w-3/3 pt-6'>
				<div className='text-lg md:text-lg text-center tracking-tight leading-tight mt-1 text-balance text-[18px] w-1/2 mx-auto'>
					Stop sending the same CV everywhere.
					Create targeted versions that speak directly to each opportunity.
				</div>
			</div>
			<div className='flex justify-center space-x-4 mt-8'>
				<Link href='/auth/signup'>
					<Button className='bg-gray-200 hover:bg-white group flex justify-between rounded-lg text-[15px] font-semibold shadow-[0_0_0_2px_rgba(0,0,0,0.5),0_0_14px_0_hsla(0,0%,100%,0.19),inset_0_-1px_0.4px_0_rgba(0,0,0,0.2),inset_0_1px_0.4px_0_#fff]'>
                    	Create your CV now <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5}/>
					</Button>
				</Link>
				<Link href='/auth/signup'>
					<Button variant='outline' className='bg-transparent transition-all duration-700 text-white group flex justify-between rounded-lg text-[15px] font-medium bg-[linear-gradient(180deg,hsla(0,0%,100%,.03),hsla(0,0%,100%,.1))] shadow-[0_0_0_1px_hsla(0,0%,100%,.2)] hover:shadow-[inset_0_1px_0_0_hsla(0,0%,100%,.05),0_0_0_1px_hsla(0,0%,100%,.4),inset_0_-1px_0_0_rgba(0,0,0,.2)]'>
						Test your current CV
					</Button>
				</Link>
			</div>

		</div>
	)
}

export default HeroSection
