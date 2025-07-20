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


// Zod schema for ExperienceSchema
export const experienceSchema = z.object({
    company: z.object({
        name: z.string(),
        domain: z.string().optional(),
    }),
    location: z.string().nullable(),
    role: z.string(),
    description: z.array(z.string()),
    start_period: z.string().datetime().transform(value => new Date(value)),
    end_period: z.string().datetime().transform(value => new Date(value)),
});

// Zod schema for EducationSchema
export const educationSchema = z.object({
    school: z.string(),
    degree: z.string(),
    field_of_study: z.string(),
    start_period: z.string().datetime().transform(value => new Date(value)),
    end_period: z.string().datetime().transform(value => new Date(value)),
    location: z.string().nullable(),
    description: z.string().nullable(),
    grade: z.string().nullable(),
    max_grade: z.string().nullable()
});

// Zod schema for PersonalSchema
export const personalSchema = z.object({
    name: z.string(),
    title: z.string().nullable(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    linkedin: z.string().nullable(),
    description: z.string().nullable(),
});


// Zod schema for userDataSchema
export const userDataSchema = z.object({
    personal: personalSchema,
    experiences: z.array(experienceSchema).nullable(),
    education: z.array(educationSchema).nullable(),
});