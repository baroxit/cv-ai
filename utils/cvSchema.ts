import { z } from "zod";

export const cvSchema = z.object({
    userPersonal: z.object({
        title: z.string().describe("The title of the user for this CV"),
        description: z.string().describe("A brief description of the user"),
    }).strict().describe("Information about the user"),
    experiences: z.array(
        z.object({
            id: z.number().optional().describe("The unique identifier of the experience. Not change it"),
            role: z.string().describe("The role of the individual in the company"),
            description: z.array(
                z.string().describe("Sentence")
            ).describe("Job responsibilities and achievements"),
        }).strict()
    ).describe("List of work experiences"),
}).strict();


export const improveDescriptionSchema = z.object({
    score: z.number().int().min(1).max(4),
    spelling: z.boolean(),
    grammar: z.boolean(),
    metrics: z.boolean(),
    keywords: z.boolean(),
    betterVersions: z.array(z.string()).length(3)
  });