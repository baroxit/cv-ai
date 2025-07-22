'use server'

import { createClient } from '@/utils/supabase/server'
import { generateObject, streamText } from 'ai'
import { cvSchema, improveDescriptionSchema, userDataSchema } from '@/utils/cvSchema'
import { openai } from '@ai-sdk/openai'
import { createStreamableValue } from 'ai/rsc'
import { object } from 'zod'
import { getUserData } from '@/api/about/serverActions'
import { google } from '@ai-sdk/google'

interface FormData {
	companyName: string
	companySize: string
	industry: string
	companyInfo: string
	jobRole: string
	jobDescription: string
	includeSensitiveInfo: boolean
}

export async function createCv(formData: FormData) {
	try {
		const user = await getUserData()

		if (!user) {
			throw new Error('User data could not be retrieved. Please ensure you are logged in.')
		}

		if (!user.experiences || user.experiences.length === 0) {
			throw new Error('No work experiences found. Please add your experiences before creating a CV.')
		}

		try {
			const workExperiences = user.experiences.map((exp) => ({
				id: exp.id,
				role: exp.role,
				company_name: exp.company.name,
				description: exp.description
			}))

			const userPersonal = {
				title: user.personal.title,
				description: user.personal.description
			}

			const jobPosition = Object.fromEntries(Object.entries(formData).filter(([key]) => key !== 'includeSensitiveInfo'))

			const finalData = {
				cv_data: { userPersonal, workExperiences },
				job_position: jobPosition
			}

			const { object } = await generateObject({
				model: openai('gpt-4o'),
				system: `
					You are a highly skilled AI Resume Generator. Given detailed information about a job role, target company, and a candidate's resume, update the resume content to better align with the role — while preserving authenticity and showcasing real-world value.

					Apply the following strict rules:

					Constraints:
					- Never mention the name of the company the candidate is applying to or refer to the job posting directly.
					- You may use the names of past projects, products, tools, or systems (e.g. "IO app") mentioned in the original resume, especially if they demonstrate concrete impact or technical depth.
					- Each work experience must be no longer than 2 sentences.
					- Use concise, technical language to highlight domain expertise, key contributions, and measurable results.
					- If real-world outcomes are mentioned (e.g. "used by millions", "reduced technical debt", "generated official documents"), incorporate them to clearly show capability and scope.
					- Automatically infer and reflect the candidate's seniority level based on experience length and responsibility.
					- Incorporate relevant keywords from the job role for ATS optimization — subtly and naturally, without direct copying.

					The goal is to produce a highly tailored, professional, and technically rich CV that aligns closely with the expectations of the target role and company. The tone must remain company-neutral, formal, and results-oriented. All text must be in English unless otherwise specified.

					Output a valid JSON object following the provided schema, with updated descriptions for job title, company, experiences, and the user's general profile/summary.
					`,
				schema: cvSchema,
				prompt: JSON.stringify(finalData)
			})

			if (!object) {
				throw new Error('Failed to generate CV data. Please try again.')
			}

			const newExperiences = user.experiences.map((exp) => {
				const updatedExp = object.experiences.find((updated) => updated.id === exp.id)
				return {
					...exp,
					role: updatedExp ? updatedExp.role : exp.role,
					description: updatedExp ? updatedExp.description : exp.description
				}
			})

			const personal = {
				title: user.personal.title,
				description: user.personal.description,
				showEmail: formData.includeSensitiveInfo,
				showPhone: formData.includeSensitiveInfo,
				showLinkedin: formData.includeSensitiveInfo,
				showAvatar: false
			}

			const dataToUpload = {
				experiences: newExperiences,
				education: user.education,
				personal,
				job_role: formData.jobRole,
				company_name: formData.companyName,
				title: `${user.personal.name} <> ${formData.companyName || 'General'}`
			}

			const supabase = await createClient()
			const { error, data } = await supabase.from('cvs').insert(dataToUpload).select('id')

			if (error) {
				console.error('Database error:', error)
				throw new Error('Failed to save CV to the database. Please try again later.')
			}

			if (!data || data.length === 0) {
				throw new Error('Unexpected error: No data returned from the database.')
			}

			return data[0].id
		} catch (error: unknown) {
			console.error('Error creating CV:', error)
			throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred while creating the CV.')
		}
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : 'Failed to create CV, please try again.')
	}
}

export async function generateDescription(prompt: string, currentDesc: string) {
	try {
		const stream = createStreamableValue('')

		;(async () => {
			const { textStream } = streamText({
				model: openai('gpt-4o-mini'),
				prompt: `Rewrite the following resume description to be more compelling and relevant. Only return the improved text, with no extra words and no quotation marks. Prompt: "${prompt}". Current description: "${currentDesc}". New description:`
			})

			for await (const delta of textStream) {
				stream.update(delta)
				console.log(delta)
			}

			stream.done()
		})()

		return { output: stream.value }
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : 'Failed to generate description, please try again.')
	}
}

export async function improveDescription(currentDesc: string) {
	try {
		const { object } = await generateObject({
			model: openai('gpt-4o-mini'),
			schema: improveDescriptionSchema,
			prompt:
				'Evaluate the following resume bullet point based on clarity, impact, and effectiveness. Provide a score from 1 to 4 and assess the following aspects with True/False values: Spelling, Grammar, Metrics, and Keywords. Then, rewrite the sentence into three stronger versions, ensuring they include action verbs, quantifiable impact, and a clear timeframe when possible. If specific numbers or timeframes are missing, replace them with variables like X, Y, Z (e.g., "Increased efficiency by X% in Y months"). Here is the sentence: "' +
				currentDesc +
				'"'
		})
		console.log(object)
		return object
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : 'Failed to improve the description, please try again.')
	}
}

export async function uploadCV(file: File) {
	try {
		const fileBuffer = await file.arrayBuffer()

		const { object } = await generateObject({
			model: google('gemini-1.5-flash-002'),
			messages: [
				{
					role: 'user',
					content: [
						{
							type: 'text',
							text: "Analyze the following PDF and extract the user's information. Please do not add any extra text or comments. If the value is missing and the filed required please put 'Missing', if the field is not required put 'null'."
						},
						{
							type: 'file',
							data: fileBuffer,
							mimeType: 'application/pdf'
						}
					]
				}
			],
			schema: userDataSchema
		})

		if (!object) {
			throw new Error('Failed to process the CV. The AI model did not return any data.')
		}
		console.log(object)
		const validatedData = transformNullStrings(object)
		console.log(validatedData)
		return validatedData
	} catch (error: any) {
		console.error('Error processing CV:', error)

		if (error.message.includes('file')) {
			throw new Error(
				error instanceof Error
					? error.message
					: 'The uploaded file could not be processed. Please ensure it is a valid PDF.'
			)
		}
		throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred while processing the CV')
	}
}

function transformNullStrings(data: any): any {
	if (Array.isArray(data)) {
		return data.map(transformNullStrings)
	} else if (data && typeof data === 'object') {
		return Object.fromEntries(
			Object.entries(data).map(([key, value]) => {
				if (key === 'start_period' || key === 'end_period') {
					return [key, value] // Skip transformation for these keys (date fields)
				}
				if (value === 'null') {
					return [key, null] // Replace 'null' string with actual null
				}
				return [key, transformNullStrings(value)]
			})
		)
	}
	return data
}
