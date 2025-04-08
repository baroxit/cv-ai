'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export async function login(formData: FormData) {
	const supabase = await createClient();

	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error) {
		switch (error.status) {
			case 400:
				throw new Error('Invalid email or password. Please try again.');
			case 401:
				throw new Error('Unauthorized. Please check your credentials.');
			case 429:
				throw new Error('Too many login attempts. Please try again later.');
			default:
				throw new Error('An unexpected error occurred. Please try again.');
		}
	}

	revalidatePath('/', 'layout');
}

export async function signInWithLinkedIn() {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'linkedin_oidc',
		options: {
			redirectTo: 'https://cv-ai-mu.vercel.app/auth/callback'
		}
	});

	if (data.url) {
		redirect(data.url); // use the redirect API for your server framework
	}
}

export async function signup(formData: FormData) {
	const supabase = await createClient();

	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
		options: {
			data: {
				display_name: formData.get('name') as string
			}
		}
	};

	const { data: result, error } = await supabase.auth.signUp(data);

	if (error) {
		switch (error.status) {
			case 400:
				throw new Error('Invalid input. Please check your email and password.');
			case 409:
				throw new Error('This email is already registered. Please log in.');
			case 429:
				throw new Error('Too many signup attempts. Please try again later.');
			default:
				throw new Error('An unexpected error occurred. Please try again.');
		}
	}

	if (result.user) {
		await supabase.from('personal').insert({
			user_id: result.user.id,
			name: data.options.data.display_name,
			email: data.email
		});
	}

	revalidatePath('/', 'layout');
}
