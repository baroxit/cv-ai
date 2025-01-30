import { userDataSchema } from './../../utils/schemas';
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { EducationSchema, ExperienceSchema } from "@/utils/schemas";

async function upsertData(table: string, data: any) {
    const supabase = await createClient()

    if (data.id != null) {
        const { error } = await supabase
            .from(table)
            .update(data)
            .eq('id', data.id);
        if (error) {
            console.log(error)
        }
    } else {
        delete data.id
        const { error } = await supabase.from(table).insert(data);
        if (error) {
            console.log(error)
        }
    }

    revalidatePath('/', 'layout')
}

async function deleteData(table: string, id: number): Promise<void> {
    const supabase = await createClient()

    const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

    if (error) {
        console.error(`Error deleting from ${table}:`, error);
    } else {
        console.log(`Deleted successfully from ${table}`);
    }
    revalidatePath('/', 'layout')
}

export async function getUserData(): Promise<userDataSchema> {
    
    const supabase = await createClient();

    const { data: experienceData } = await supabase
        .from('experiences')
        .select('*')
        .order('id', { ascending: false });

    const { data: educationData } = await supabase
        .from('education')
        .select('*')
        .order('id', { ascending: false });

    
        return {
            experiences: experienceData,
            education: educationData,
        };
}

export async function createExperience(data: ExperienceSchema) {
    await upsertData("experiences", data);
}

export async function createEducation(data: EducationSchema) {
    await upsertData("education", data);
}

export async function deleteExperience(id: number): Promise<void> {
    await deleteData("experiences", id);
}

export async function deleteEducation(id: number): Promise<void> {
    await deleteData("education", id);
}
