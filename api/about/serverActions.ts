'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { PersonalSchema, userDataSchema } from './../../utils/schemas'
import { createClient } from '@/utils/supabase/server'
import { EducationSchema, ExperienceSchema } from '@/utils/schemas'
import { uploadCV } from '../openai/serverActions'
import { create } from 'domain'

async function getData(table: string) {
	const supabase = await createClient()

	const { data } = await supabase.from(table).select('*').order('id', { ascending: false })

	return data
}

async function upsertData(table: string, data: any) {
	const supabase = await createClient()

	if (data.id != null) {
		const { error } = await supabase.from(table).update(data).eq('id', data.id)
		if (error) {
			console.log(error)
		}
	} else {
		delete data.id
		const { error } = await supabase.from(table).insert(data)
		if (error) {
			console.log(error)
		}
	}

	revalidatePath('/', 'layout')
}

async function deleteData(table: string, id: number): Promise<void> {
	const supabase = await createClient()

	const { error } = await supabase.from(table).delete().eq('id', id)

	if (error) {
		console.error(`Error deleting from ${table}:`, error)
	} else {
		console.log(`Deleted successfully from ${table}`)
	}
	revalidatePath('/', 'layout')
}

export async function getUserData(): Promise<userDataSchema> {
	const supabase = await createClient()

	const { data: experienceData } = await supabase.from('experiences').select('*').order('id', { ascending: false })

	const { data: educationData } = await supabase.from('education').select('*').order('id', { ascending: false })

	const { data: personalData } = await supabase.from('personal').select('*').limit(1).single()

	return {
		personal: personalData,
		experiences: experienceData,
		education: educationData
	}
}

export async function createExperience(data: ExperienceSchema) {
	await upsertData('experiences', data)
}

export async function createEducation(data: EducationSchema) {
	await upsertData('education', data)
}

export async function deleteExperience(id: number): Promise<void> {
	await deleteData('experiences', id)
}

export async function deleteEducation(id: number): Promise<void> {
	await deleteData('education', id)
}

export async function getExperiences(): Promise<ExperienceSchema[]> {
	const data = await getData('experiences')
	return data ?? []
}

export async function getEducations(): Promise<EducationSchema[]> {
	const data = await getData('education')
	return data ?? []
}

export async function updatePersonal(data: PersonalSchema) {
	const supabase = await createClient()
	const { data: previous } = await supabase.from('personal').select('id').limit(1).single()

	if (!previous) {
		throw new Error('No personal data found')
	}

	await supabase.from('personal').update(data).eq('id', previous.id)
	revalidatePath('/', 'layout')
}

export async function uploadAvatar(file: File): Promise<string> {
	const supabase = await createClient()
	const {
		data: { user }
	} = await supabase.auth.getUser()
	if (user == null) {
		throw new Error('User not found')
	}

	const fileExt = file.name.split('.').pop()
	const filePath = `${user.id}-${Math.random()}.${fileExt}`

	const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)
	if (uploadError) throw uploadError

	// Get existing personal data
	const { data: personalData } = await supabase.from('personal').select('*').eq('user_id', user.id).single()

	// Update with existing ID to ensure we update rather than insert
	const dataToUpsert = {
		id: personalData?.id,
		avatar: filePath,
		user_id: user.id
	}

	await upsertData('personal', dataToUpsert)

	console.log('Avatar uploaded successfully:', filePath)

	return filePath
}

export async function downloadImage(path: string): Promise<any> {
	try {
		const supabase = createClient()

		const { data, error } = await (await supabase).storage.from('avatars').download(path)
		if (error) throw error

		const buffer = await data.arrayBuffer()
		const base64 = Buffer.from(buffer).toString('base64')
		const mimeType = data.type

		return `data:${mimeType};base64,${base64}`
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : 'Failed to download image, please try again.')
	}
}

export async function getPersonalData(): Promise<PersonalSchema> {
	try {
		const supabase = await createClient()
		const { data, error } = await supabase.from('personal').select('*').limit(1).single()

		if (error) throw error
		return data
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : 'Failed to fetch personal data, please try again.')
	}
}

export async function getUserMetadata() {
	try {
		const supabase = await createClient()
		const {
			data: { user },
			error
		} = await supabase.auth.getUser()

		if (error || !user) {
			throw new Error('User not found')
		}

		const { data: personalData, error: personalError } = await supabase
			.from('personal')
			.select('name, email')
			.eq('user_id', user.id)
			.single()

		if (personalError) throw personalError
		if (!personalData) {
			throw new Error('Personal data not found')
		}

		return {
			name: personalData.name || '',
			email: personalData.email || ''
		}
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : 'Failed to get user information, please try again.')
	}
}

export async function importFromPdf(file: File) {
	try {
		const result = await uploadCV(file)

		if (result.personal) {
			try {
				await updatePersonal(result.personal)
			} catch (error) {
				throw new Error(
					error instanceof Error ? error.message : 'Failed to update personal information, please try again.'
				)
			}
		}

		if (result.experiences && Array.isArray(result.experiences)) {
			for (const experience of result.experiences) {
				try {
					// Take company
					if (experience.company?.name) {
						try {
							const response = await fetch(
								`https://api.brandfetch.io/v2/search/${experience.company.name.replace(/\s+/g, '')}?c=${
									process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY
								}`,
								{
									method: 'GET'
								}
							)

							if (response.ok) {
								const data = await response.json()
								if (data.length > 0) {
									experience.company = {
										name: data[0].name,
										domain: data[0].domain,
										brandId: data[0].brandId
									}
								}
							} else {
								console.warn(
									`Brand fetch API returned status ${response.status} for company: ${experience.company.name}`
								)
							}
						} catch (apiError) {
							console.error('Error fetching company data:', apiError)
							// Continue with original company data
						}
					}

					await createExperience(experience)
				} catch (expError) {
					console.error('Error creating experience:', expError, experience)
					// Continue with other experiences
				}
			}
		}

		if (result.education && Array.isArray(result.education)) {
			for (const education of result.education) {
				try {
					await createEducation(education)
				} catch (eduError) {
					console.error('Error creating education:', eduError, education)
					// Continue with other education entries
				}
			}
		}

		revalidatePath('/', 'layout')
		return { success: true }
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : 'Failed to import data from PDF, please try again.')
	}
}
