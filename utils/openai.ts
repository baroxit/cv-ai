"use server"

import {createClient} from "@/utils/supabase/server";
import {generateObject, streamText} from 'ai';
import {cvSchema} from "@/utils/cvSchema";
import { openai } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { object } from "zod";
import { getUserData } from "@/api/about/serverActions";

export async function createCv() {

        
    const user = await getUserData();

    console.log(user)


    if (user.experiences && user.experiences.length > 0) {

        const workExperiences = user.experiences.map(exp => ({
                id: exp.id,
                role: exp.role,
                company_name: exp.company.name,
                description: exp.description,
        }));


        const finalData = { cv_data: workExperiences, job_position: jobPosition };


        const { object } = await generateObject({
            model: openai('gpt-4o-mini'),
            system: 'You are a highly skilled AI Resume Generator. Given the following detailed information about a job position role and company, and a person\'s work experiences, update the descriptions to tailor the CV specifically to the job position. Use the company data (such as its sector, size, and mission) and the job role data (such as responsibilities, skills required, and specific technologies) to modify and enhance the job title and description in work experiences. You are allowed to update job titles and work experience descriptions to better align them with the job role and company (don\'t be too explicit). The aim is to create a customized, detailed, and well-structured CV that highlights relevant skills and experiences for this specific role and company. All text should be in English, unless otherwise specified. Your output should be in JSON format, following the provided schema, with updated descriptions for each section (job role, company, and work experiences). Ensure all updates are aligned with the provided job and company details, making the CV stand out for the target role.',
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
    
            const dataToUpload = {
                experiences: newExperiences,
                education: user.education,
                job_role: jobPosition.job_role,
                company_name: jobPosition.company_name,
                title: 'Giacomo <> ' + jobPosition.company_name
            }

            console.log(dataToUpload)

            const supabase = await createClient();

            const { error } = await supabase.from("cvs").insert(dataToUpload);

            if(error) {
                console.log(error)
            }

        }

        

    }

}



export async function generateDescription(prompt: string, currentDesc: string) {

    const stream = createStreamableValue('');


    (async () => {
        const { textStream } = streamText({
            model: openai('gpt-4o-mini'),
            prompt: `Improve or rewrite the following resume description based on this prompt: "${prompt}". Current description: "${currentDesc}"`,
        });

        for await (const delta of textStream) {
            stream.update(delta);
            console.log(delta)
        }

        stream.done();
    })();

    return { output: stream.value };
}

