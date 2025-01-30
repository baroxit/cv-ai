import { z } from "zod";

export const cvSchema = z.object({

    work_experiences: z.array(
        z.object({
            job_title: z.string().describe("The job title held by the individual"),
            company_name: z.string().describe("The name of the company"),
            description: z.string().describe("Job responsibilities and achievements"),
        }).strict()
    ),
}).strict();
