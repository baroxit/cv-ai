'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { PersonalSchema } from '@/utils/schemas'
import { PersonalDialog } from './personal-dialog'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Mail, Linkedin, Phone, Upload, Pencil } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import PersonalCardAvatar from './personal-card-avatar'

const PersonalCard = ({ personal }: { personal: PersonalSchema }) => {

	return (
		<Card>
			<div className='flex flex-col md:flex-row justify-between p-6 gap-4'>
				
				<div className='w-full md:w-3/5 relative flex items-center gap-4'>
					<PersonalCardAvatar />
					<div>
						<CardTitle className='text-2xl truncate'>{personal.name}</CardTitle>
						<CardDescription className='text-xl mb-2 truncate'>{personal.title}</CardDescription>
					</div>

					<PersonalDialog className='absolute top-0 right-0' personal={personal} />
				</div>

				{/* Right Section */}
				<div className='rounded-lg border bg-card text-card-foreground shadow md:w-2/5 p-3 space-y-3'>
					<CardTitle className='text-lg'>Contacts</CardTitle>
					{personal.email && (
						<div className='flex items-center gap-2 truncate'>
							<Mail className='h-4 w-4 text-muted-foreground' />
							<p className='break-all'>{personal.email}</p>
						</div>
					)}
					{personal.phone && (
						<div className='flex items-center gap-2 truncate'>
							<Phone className='h-4 w-4 text-muted-foreground' />
							<p className='break-all'>{personal.phone}</p>
						</div>
					)}
					{personal.linkedin && (
						<div className='flex items-center gap-2 truncate'>
							<Linkedin className='h-4 w-4 text-muted-foreground' />
							<Link href={personal.linkedin} target='_blank' className='break-all'>
								@
								<span className='underline'>
									{personal.linkedin.replace('https://www.linkedin.com/in/', '').replace('/', '')}
								</span>
							</Link>
						</div>
					)}
				</div>
			</div>
		</Card>
	)
}

export default PersonalCard
