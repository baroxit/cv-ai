'use client'

import { useState } from 'react'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { uploadAvatar } from '@/api/about/serverActions'
import { PersonalSchema } from '@/utils/schemas'
import { PersonalDialog } from './personal-dialog'
import Link from 'next/link'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

const PersonalCard = ({ personal }: { personal: PersonalSchema }) => {
	const [avatarUrl, setAvatarUrl] = useState<string | null>(personal.avatar || null)
	const [uploading, setUploading] = useState(false)

	const downloadImage = async (path: string): Promise<string> => {
		const response = await fetch(path)
		if (!response.ok) {
			throw new Error('Failed to download image')
		}
		const blob = await response.blob()
		const url = URL.createObjectURL(blob)
		return url
	}

	const handleDownloadImage = async (path: string) => {
		try {
			const url = await downloadImage(path)
			setAvatarUrl(url)
			console.log('Avatar downloaded:', url)
		} catch (error) {
			console.error('Error downloading image:', error)
		}
	}

	const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
		try {
			setUploading(true)
			const files = event.target.files
			if (!files || files.length === 0) {
				throw new Error('You must select an image to upload.')
			}
			const file = files[0]
			const filePath = await uploadAvatar(file)
			setAvatarUrl(filePath)
		} catch (error) {
			console.log(error)
			alert('Error uploading avatar!')
		} finally {
			setUploading(false)
		}
	}

	return (
		<Card>
			<div className='flex flex-col md:flex-row justify-between p-6 gap-4'>
				{/* Left Section */}
				<div className='w-full md:w-3/5 relative flex items-center gap-4'>
					<Avatar className='h-16 w-16 rounded-lg'>
						{avatarUrl ? (
							<AvatarImage src={avatarUrl} alt='Avatar' />
						) : (
							<AvatarFallback>{personal.name?.charAt(0) || 'A'}</AvatarFallback>
						)}
					</Avatar>

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
						<div className='truncate'>
							<CardDescription>Email</CardDescription>
							<p className='break-all'>{personal.email}</p>
						</div>
					)}
					{personal.phone && (
						<div>
							<CardDescription>Phone</CardDescription>
							<p>{personal.phone}</p>
						</div>
					)}
					{personal.linkedin && (
						<div className='truncate'>
							<CardDescription>LinkedIn</CardDescription>
							<Link href={personal.linkedin} target='_blank' className='break-all'>
								{personal.linkedin}
							</Link>
						</div>
					)}
				</div>
			</div>
		</Card>
	)
}

export default PersonalCard
