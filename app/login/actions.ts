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

export async function signup(formData: FormData) {
    const supabase = await createClient()


    const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) throw error;

    await supabase.from('personal').insert({
        user_id: result.user?.id,
        name: data.name,
        email: data.email,
    })

    revalidatePath('/', 'layout')
}