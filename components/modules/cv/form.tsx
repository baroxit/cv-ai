'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, Loader2 } from 'lucide-react'
import CvCompanySearch from './company-search'
import { Badge } from '@/components/ui/badge'
import { createCv } from '@/api/openai/serverActions'
import { toast } from '@/hooks/use-toast'

export const CvForm = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [formData, setFormData] = useState({
		companyName: '',
		companySize: '',
		industry: '',
		companyInfo: '',
		jobRole: '',
		jobDescription: '',
		includeSensitiveInfo: true
	})

	interface FormData {
		companyName: string
		companySize: string
		industry: string
		companyInfo: string
		jobRole: string
		jobDescription: string
		includeSensitiveInfo: boolean
	}

	const handleInputChange = (field: keyof FormData, value: string | boolean) => {
		setFormData((prev) => ({
			...prev,
			[field]: value
		}))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()
		setIsLoading(true)

		try {
			const response = await createCv(formData)

			if (response) {
				router.push(`/dashboard/cv/${response}`)
			} else {
				toast({
					title: 'Submission Error',
					description: 'The server returned an undefined response. Please try again later.',
					variant: 'destructive'
				})
			}
		} catch (error: any) {
			console.error('Error submitting form:', error)

			let errorMessage = 'An unexpected error occurred. Please try again.'
			if (error.message.includes('experiences')) {
				errorMessage = 'No work experiences found. Please add your experiences before creating a CV.'
			} else if (error.message.includes('database')) {
				errorMessage = 'Failed to save CV to the database. Please try again later.'
			}

			toast({
				title: 'Error Submitting Form',
				description: errorMessage,
				variant: 'destructive'
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit} className='max-w-6xl mx-auto p-4'>
			<div className='grid lg:grid-cols-2 gap-4'>
				{/* Company Information Card */}
				<Card>
					<CardHeader>
						<CardTitle>Company Information</CardTitle>
						<CardDescription>Add details about the company to personalize your CV.</CardDescription>
					</CardHeader>
					<CardContent className='grid gap-4'>
						<CvCompanySearch onChange={(company) => handleInputChange('companyName', company)} />

						<div className='flex justify-between items-center'>
							<Label htmlFor='companySize'>Company Size</Label>
							<Select
								value={formData.companySize}
								onValueChange={(value) => handleInputChange('companySize', value)}
								disabled={isLoading}
							>
								<SelectTrigger className='w-3/5'>
									<SelectValue placeholder='E.g. 1-10 employees' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='1-10'>1-10 employees</SelectItem>
									<SelectItem value='11-50'>11-50 employees</SelectItem>
									<SelectItem value='51-200'>51-200 employees</SelectItem>
									<SelectItem value='201-500'>201-500 employees</SelectItem>
									<SelectItem value='501-1000'>501-1,000 employees</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className='flex justify-between items-center'>
							<Label htmlFor='industry'>Industry</Label>
							<Select
								value={formData.industry}
								onValueChange={(value) => handleInputChange('industry', value)}
								disabled={isLoading}
							>
								<SelectTrigger className='w-3/5'>
									<SelectValue placeholder='E.g. Technology' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='technology'>Technology</SelectItem>
									<SelectItem value='finance'>Finance</SelectItem>
									<SelectItem value='healthcare'>Healthcare</SelectItem>
									<SelectItem value='retail'>Retail</SelectItem>
									<SelectItem value='education'>Education</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className='grid w-full gap-1.5'>
							<Label htmlFor='companyInfo'>Additional Information</Label>
							<Textarea
								className='min-h-[200px]'
								placeholder='E.g., The company focuses on sustainability, values innovation, and uses modern cloud technologies.'
								value={formData.companyInfo}
								onChange={(e) => handleInputChange('companyInfo', e.target.value)}
								disabled={isLoading}
							/>
							<p className='text-sm text-muted-foreground'>
								Add any useful details about the company that could help personalize your CV and cover letter.
							</p>
						</div>
					</CardContent>
				</Card>

				<div className='space-y-4'>
					{/* Job Role Card */}
					<Card>
						<CardHeader>
							<CardTitle>Job Information</CardTitle>
							<CardDescription>
								Provide details about the role you are applying for to help AI customize your CV.
							</CardDescription>
						</CardHeader>
						<CardContent className='grid gap-4'>
							<div className='flex justify-between items-center'>
								<Label htmlFor='jobRole'>Role</Label>
								<Input
									className='w-3/5'
									placeholder='E.g. Software Engineer'
									value={formData.jobRole}
									onChange={(e) => handleInputChange('jobRole', e.target.value)}
									disabled={isLoading}
								/>
							</div>

							<div className='grid w-full gap-1.5'>
								<Label htmlFor='jobDescription'>Description</Label>
								<Textarea
									className='min-h-[160px]'
									placeholder='Briefly describe the role and its key responsibilities.'
									value={formData.jobDescription}
									onChange={(e) => handleInputChange('jobDescription', e.target.value)}
									disabled={isLoading}
								/>
							</div>
						</CardContent>
					</Card>

					{/* Advanced Settings Card */}
					<Card>
						<CardHeader>
							<CardTitle>Advanced Settings</CardTitle>
							<CardDescription>Match your preferences, tone, and style.</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
								<div className='space-y-0.5'>
									<Label>Include Sensitive Information</Label>
									<p className='text-[0.8rem] text-muted-foreground'>
										Add phone and email. You can remove them also later.
									</p>
								</div>
								<Switch
									checked={formData.includeSensitiveInfo}
									onCheckedChange={(checked) => handleInputChange('includeSensitiveInfo', checked)}
									disabled={isLoading}
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* Footer Actions */}
			<div className='flex justify-end mt-4 gap-4 items-center'>
				<div className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm gap-5 relative'>
					<Label>Include Cover Letter</Label>
					<Switch checked={false} disabled />
					<Badge variant='secondary' className='text-xs absolute top-[-12px] left-1.5'>
						Coming Soon
					</Badge>
				</div>
				<Button type='submit' className='h-[40px]' disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							Generating...
						</>
					) : (
						<>
							<Sparkles className='mr-2' /> Generate My CV
						</>
					)}
				</Button>
			</div>
		</form>
	)
}

export default CvForm

/*
TONE OF VOICE TO IMPLEMENT

<div className="flex justify-between items-center">
  <Label htmlFor="toneOfVoice">Tone of Voice</Label>
  <Select 
    value={formData.toneOfVoice}
    onValueChange={(value) => handleInputChange('toneOfVoice', value)}
    disabled={isLoading}
  >
    <SelectTrigger className="w-3/5">
      <SelectValue placeholder="E.g. Formal" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="formal">Formal</SelectItem>
      <SelectItem value="professional">Professional</SelectItem>
      <SelectItem value="friendly">Friendly</SelectItem>
      <SelectItem value="creative">Creative</SelectItem>
    </SelectContent>
  </Select>
</div>

*/
