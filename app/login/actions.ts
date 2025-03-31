'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) throw error;

    revalidatePath('/', 'layout')
}

export async function signInWithLinkedIn() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'linkedin_oidc',
      options: {
        scopes: 'r_fullprofile',
        redirectTo:'https://cv-ai-mu.vercel.app/auth/callback',
      },
    })

    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    }
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
            data: {
              display_name: formData.get('name') as string
            }
        }
    }

    const { data: result, error } = await supabase.auth.signUp(data)

    if (error) throw error;

    await supabase.from('personal').insert({
        user_id: result.user?.id,
        name: data.options.data.display_name,
        email: data.email,
    })

    revalidatePath('/', 'layout')
}


