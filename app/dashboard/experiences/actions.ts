'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import {EducationSchema, ExperienceSchema} from "@/utils/schemas";

export async function createExperience(data: ExperienceSchema) {
    const supabase = await createClient()

    console.log(data)
    if(data.id != null) {
        const { error } = await supabase
            .from("experiences")
            .update(data)
            .eq('id', data.id);
        if (error) {
            console.log(error)
        }
    } else {
        delete data.id
        const { error } = await supabase.from("experiences").insert(data);
        if (error) {
            console.log(error)
        }
    }

    revalidatePath('/', 'layout')

}


export async function createEducation(data: EducationSchema) {
    const supabase = await createClient()

    if(data.id != null) {
        const { error } = await supabase
            .from("education")
            .update(data)
            .eq('id', data.id);
        if (error) {
            console.log(error)
        }
    } else {
        delete data.id
        const { error } = await supabase.from("education").insert(data);
        if (error) {
            console.log(error)
        }
    }

    revalidatePath('/', 'layout')

}


export async function deleteExperience(id: number): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
        .from("experiences")
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting experience:', error);
    } else {
        console.log('Experience deleted successfully');
    }
    revalidatePath('/', 'layout')

}

export async function deleteEducation(id: number): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
        .from("education")
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting education:', error);
    } else {
        console.log('Education deleted successfully');
    }
    revalidatePath('/', 'layout')

}