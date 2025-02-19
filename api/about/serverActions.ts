'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { PersonalSchema, userDataSchema } from './../../utils/schemas';
import { createClient } from '@/utils/supabase/server'
import { EducationSchema, ExperienceSchema } from "@/utils/schemas";

async function getData(table: string) {
    const supabase = await createClient()

    const { data } = await supabase
        .from(table)
        .select('*')
        .order('id', { ascending: false });

    return data;

}

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

    const { data: personalData } = await supabase
        .from('personal')
        .select('*')
        .limit(1)
        .single();

    
        return {
            personal: personalData,
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

export async function getExperiences(): Promise<ExperienceSchema[]> {
    const data = await getData("experiences");
    return data ?? [];
}

export async function getEducations(): Promise<EducationSchema[]> {
    const data = await getData("education");
    return data ?? [];}


export async function uploadAvatar(file: File): Promise<string> {
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser()
    if (user == null) {
        throw new Error("User not found");
    }

    const fileExt = file.name.split('.').pop();
    const filePath = `${user.id}-${Math.random()}.${fileExt}`;

    const { error: uploadError } = await (await supabase).storage.from('avatars').upload(filePath, file);
    if (uploadError) throw uploadError;


    const dataToUpsert = {avatar: filePath, user_id: user.id};
    await upsertData("personal", dataToUpsert);


    return filePath;
}

export async function downloadImage(path: string = "ab940a37-b89c-4943-8e03-afa63f5327b9-0.4281232383410962.jpg"): Promise<any> {
    const supabase = createClient();


    const { data, error } = await (await supabase).storage.from('avatars').download(path);
    if (error) throw error;

    const buffer = await data.arrayBuffer(); // Converti il Blob in ArrayBuffer
    const base64 = Buffer.from(buffer).toString('base64'); // Converti in Base64
    const mimeType = data.type; // Recupera il tipo MIME

    return `data:${mimeType};base64,${base64}`;
}

export async function getPersonalData(): Promise<PersonalSchema> {
    const supabase = await createClient();
    const { data } = await supabase.from('personal').select('*').limit(1).single();
    return data;
}