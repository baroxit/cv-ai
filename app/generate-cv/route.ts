import { NextRequest, NextResponse } from "next/server";
import {createCV} from "@/utils/openai"

export async function GET(req: NextRequest) {
    try {


        const cv = await createCV();

        return NextResponse.json(
            { error: "Missing userId or company parameter" + cv }
        );

    } catch (error) {
        console.error("Error generating CV:", error);
        return NextResponse.json(
            { error: "Missing userId or company parameterr" }
        );
    }
}
