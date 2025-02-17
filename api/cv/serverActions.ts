"use server"

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache'
import { ExperienceSchema } from '@/utils/schemas';

export const getCv = async (id: string) => {
    
    const supabase = await createClient();

    try {
        const { data, error } = await supabase
            .from("cvs")
            .select("*")
            .eq("id", id)
            .single();


        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching CV:", error);
        throw error;
    }
}

export const updateCv = async (cv: any) => {
    const supabase = await createClient();


    try {
        const { data, error } = await supabase
            .from("cvs")
            .update({
                experiences: cv.experiences,
                education: cv.education,
                projects: cv.projects ?? {},
                company_name: cv.company_name,
                job_role: cv.job_role,
                title: cv.title,
                personal: cv.personal
            })
            .eq('id', cv.id)  // Aggiorna il record con ID specifico

        if (error) throw error;
        return;
    } catch (error) {
        console.error("Error updating CV:", error);
        throw error;
    }
}

export const addExperienceToCv = async (cvId: string, experience: ExperienceSchema) => {
    const supabase = await createClient();

    try {
        // Fetch the current CV
        const { data: cv, error: fetchError } = await supabase
            .from("cvs")
            .select("experiences")
            .eq('id', cvId)
            .single();

        if (fetchError) throw fetchError;

        // Append the new experience to the existing experiences array
        const updatedExperiences = [...(cv.experiences || []), experience];

        // Update the CV with the new experiences array
        const { error: updateError } = await supabase
            .from("cvs")
            .update({ experiences: updatedExperiences })
            .eq('id', cvId);

        if (updateError) throw updateError;

        return;
    } catch (error) {
        console.error("Error adding experience to CV:", error);
        throw error;
    }
}


export const deleteCv = async (id: number) => {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from("cvs")
            .delete()
            .eq('id', id);

            revalidatePath('/', 'layout')
            if (error) throw error;
        return;
    } catch (error) {
        console.error("Error deleting CV:", error);
        throw error;
    }
}