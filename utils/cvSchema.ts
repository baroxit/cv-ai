import { z } from "zod";

export const cvSchema = z.object({

    experiences: z.array(
        z.object({
            id: z.number().optional().describe("The unique identifier of the experience. Not change it"),
            role: z.string().describe("The role of the individual in the company"),
            description: z.string().describe("Job responsibilities and achievements"),
        }).strict()
    ).describe("List of work experiences"),
}).strict();
