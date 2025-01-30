"use server"

import {NextRequest} from "next/server";
import {createClient} from "@/utils/supabase/server";

export async function GET() {
    const supabase = await createClient()

    // Check if a user's logged in
    const {
        data: {user},
    } = await supabase.auth.getUser()

}
