"use server"

import { createClient } from '@/utils/supabase/server';


export const fetchCV = async (cvId: string) => {

    const supabase = await createClient()

    try {
        const { data, error } = await supabase
            .from("generated_cvs")
            .select("*")
            .eq("id", cvId)
            .single();


        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching CV:", error);
        throw error;
    }
};
