'use client'

import { useState, useRef } from 'react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { uploadAvatar } from '@/api/about/serverActions'
import { PersonalSchema } from '@/utils/schemas'
import { PersonalDialog } from './personal-dialog'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Mail, Linkedin, Phone, Upload, Pencil } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const PersonalCard = ({ personal }: { personal: PersonalSchema }) => {
	const [avatarUrl, setAvatarUrl] = useState<string | null>(personal.avatar || null)
	const [uploading, setUploading] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setUploading(true)
			const files = event.target.files
			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.')
			}
			const file = files[0]
			const filePath = await uploadAvatar(file)
			console.log('Uploaded file path:', filePath)
			setAvatarUrl(filePath)
		} catch (error) {
			console.log(error)
			alert('Error uploading avatar!')
		} finally {
			setUploading(false)
		}
	}

	const triggerFileInput = () => {
		fileInputRef.current?.click()
	}

	return (
		<Card>
			<div className='flex flex-col md:flex-row justify-between p-6 gap-4'>
				{/* Left Section */}
				<div className='w-full md:w-3/5 relative flex items-center gap-4'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className='relative group'>
									<Avatar
										className='h-16 w-16 rounded-lg cursor-pointer transition-opacity hover:opacity-80'
										onClick={triggerFileInput}
									>
										{avatarUrl ? (
											<AvatarImage src={avatarUrl} alt='Avatar' />
										) : (
											<AvatarFallback>{personal.name?.charAt(0) || 'A'}</AvatarFallback>
										)}
										{uploading && (
											<div className='absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg'>
												<span className='loading loading-spinner loading-sm text-white'></span>
											</div>
										)}
										<div className='absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity'>
											<Upload className='h-6 w-6 text-white' />
										</div>
										<div className='absolute -top-2 -right-2 bg-primary rounded-full p-1 shadow-md border-2 border-background'>
											<Pencil className='h-3 w-3 text-white' />
										</div>
									</Avatar>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Click to change avatar</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<input type='file' accept='image/*' ref={fileInputRef} onChange={handleUploadAvatar} className='hidden' />

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
