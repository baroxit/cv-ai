'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { GalleryHorizontalEnd, Linkedin, LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login, signInWithLinkedIn } from '@/app/login/actions'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'

// Define the schema using zod
const loginSchema = z.object({
	email: z.string().email('Please enter a valid email address.'),
	password: z.string().min(6, 'Password must be at least 6 characters long.')
})

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const router = useRouter()
	const { toast } = useToast()

	const [loading, setLoading] = useState(false)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)
		const formData = new FormData(event.target as HTMLFormElement)

		// Convert FormData to an object
		const data = {
			email: formData.get('email') as string,
			password: formData.get('password') as string
		}

		// Validate the form data using zod
		const validationResult = loginSchema.safeParse(data)
		if (!validationResult.success) {
			setLoading(false)
			const errorMessage = validationResult.error.errors[0]?.message || 'Invalid input.'
			toast({
				title: 'Validation Error',
				description: errorMessage,
				variant: 'destructive'
			})
			return
		}

		try {
			await login(formData)
			router.push('/dashboard/experiences')
		} catch (error: unknown) {
			console.error(error)
			setLoading(false)

			const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
			toast({
				title: 'Login failed',
				description: errorMessage,
				variant: 'destructive'
			})
		}
	}

	const handleLinkedin = async () => {
		try {
			await signInWithLinkedIn()
		} catch (error) {
			console.log(error)
			setLoading(false)
			toast({
				title: 'Login failed',
				description: 'Please retry or change provider.',
				variant: 'destructive'
			})
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<form onSubmit={handleSubmit}>
				<div className='flex flex-col gap-6'>
					<div className='flex flex-col items-center gap-2'>
						<a href='#' className='flex flex-col items-center gap-2 font-medium'>
							<div className='flex h-8 w-8 items-center justify-center rounded-md'>
								<GalleryHorizontalEnd className='size-6' />
							</div>
							<span className='sr-only'>promptCv</span>
						</a>
						<h1 className='text-xl font-bold'>Welcome to promptCv </h1>
						<div className='text-center text-sm'>
							Don&apos;t have an account?{' '}
							<Link href={'/auth/signup'} className='underline underline-offset-4'>
								Sign up
							</Link>
						</div>
					</div>
					<div className='flex flex-col gap-6'>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								name='email'
								type='email'
								placeholder='john.doe@example.com'
								required
								disabled={loading}
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='password'>Password</Label>
							<Input id='password' type='password' name='password' placeholder='Password' required disabled={loading} />
						</div>
						<Button type='submit' className='w-full' disabled={loading}>
							{loading ? (
								<>
									<LoaderCircle className='animate-spin' />
									Loading
								</>
							) : (
								'Login'
							)}
						</Button>
					</div>
				</div>
			</form>
			<div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  '>
				By clicking continue, you agree to our <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
			</div>
			<div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
				<span className='relative z-10 bg-background px-2 text-muted-foreground'>Or</span>
			</div>
			<div className=''>
				<Button variant='outline' className='w-full' onClick={handleLinkedin}>
					<Linkedin />
					Continue with Linkedin
				</Button>
			</div>
		</div>
	)
}
