"use server"

import { createClient } from "@/utils/supabase/server";

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
