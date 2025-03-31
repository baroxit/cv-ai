"use server"

import {createClient} from "@/utils/supabase/server";
import {generateObject, streamText} from 'ai';
import {cvSchema, improveDescriptionSchema} from "@/utils/cvSchema";
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { object } from "zod";
import { getUserData } from "@/api/about/serverActions";

interface FormData {
    companyName: string;
    companySize: string;
    industry: string;
    companyInfo: string;
    jobRole: string;
    jobDescription: string;
    includeSensitiveInfo: boolean;
}

export async function createCv(formData: FormData) {
        
    const user = await getUserData();


    if (user.experiences && user.experiences.length > 0) {

        const workExperiences = user.experiences.map(exp => ({
                id: exp.id,
                role: exp.role,
                company_name: exp.company.name,
                description: exp.description,
        }));

        const userPersonal = {
            title: user.personal.title,
            description: user.personal.description,
        }

        const jobPosition = Object.fromEntries(
            Object.entries(formData).filter(([key]) => key !== 'includeSensitiveInfo')
        );

        const finalData = { cv_data: {'userPersonal': userPersonal, 'workExperiences': workExperiences}, job_position: jobPosition };


        const { object } = await generateObject({
            model: openai('gpt-4o'),
            system: 'You are a highly skilled AI Resume Generator. Given the following detailed information about a job position role and company, and a person\'s work experiences, update the descriptions to tailor the CV specifically to the job position. Use the company data (such as its sector, size, and mission) and the job role data (such as responsibilities, skills required, and specific technologies) to modify and enhance the job title and description in work experiences. The aim is to create a customized, detailed, and well-structured CV that highlights relevant skills and experiences for this specific role and company. All text should be in English, unless otherwise specified. Your output should be in JSON format, following the provided schema, with updated descriptions for each section (job role, company, and work experiences) and user general title and description. Ensure all updates are aligned with the provided job and company details, making the CV stand out for the target role.',
            schema: cvSchema,
            prompt: JSON.stringify(finalData)
        });

        if (object) {
            console.log(object)
    
            const newExperiences = user.experiences.map((exp) => {
                const updatedExp = object.experiences.find(updated => updated.id === exp.id);
                return {
                ...exp,
                role: updatedExp ? updatedExp.role : exp.role,
                description: updatedExp ? updatedExp.description : exp.description
                };
            });

            const personal = {
                title: user.personal.title,
                description: user.personal.description,
                showEmail: formData.includeSensitiveInfo,
                showPhone: formData.includeSensitiveInfo,
                showLinkedin: formData.includeSensitiveInfo,
                showAvatar: false
            }
    
            const dataToUpload = {
                experiences: newExperiences,
                education: user.education,
                personal: personal,
                job_role: formData.jobRole,
                company_name: formData.companyName,
                title: user.personal.name + ' <> ' + (formData.companyName || 'General')
            }

            console.log(dataToUpload)

            const supabase = await createClient();

            const { error, data } = await supabase.from("cvs").insert(dataToUpload).select('id');

            console.log(data)
            if(error) {
                console.log(error)
            } else if(data) {
                console.log('CV created:', data[0].id);
                return data[0].id;
            }

        }

        

    }

}



export async function generateDescription(prompt: string, currentDesc: string) {

    const stream = createStreamableValue('');


    (async () => {
        const { textStream } = streamText({
            model: openai('gpt-4o-mini'),
            prompt: `Rewrite the following resume description to be more compelling and relevant. Only return the improved text, with no extra words and no quotation marks. Prompt: "${prompt}". Current description: "${currentDesc}". New description:`,
        });

        for await (const delta of textStream) {
            stream.update(delta);
            console.log(delta)
        }

        stream.done();
    })();

    return { output: stream.value };
}

export async function improveDescription(currentDesc: string) {

    const { object } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: improveDescriptionSchema,
        prompt: 'Evaluate the following resume bullet point based on clarity, impact, and effectiveness. Provide a score from 1 to 4 and assess the following aspects with True/False values: Spelling, Grammar, Metrics, and Keywords. Then, rewrite the sentence into three stronger versions, ensuring they include action verbs, quantifiable impact, and a clear timeframe when possible. If specific numbers or timeframes are missing, replace them with variables like X, Y, Z (e.g., "Increased efficiency by X% in Y months"). Here is the sentence: "' + currentDesc + '"',
    });
    console.log(object)
    return object;
    
}