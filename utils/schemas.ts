export interface ExperienceSchema {
    id?: number;
    company: {
        name: string;
        domain: string;
        icon?: string;
    };
    location: string | null;
    role: string;
    description: string;
    start_period: string | null;
    end_period: string | null;
    user_id: string;
}

export interface EducationSchema {
    id?: number;
    school: string;
    degree: string;
    field_of_study: string;
    start_date: string | null;
    end_date: string | null;
    location: string | null;
    description?: string;
}

export interface userDataSchema {
    experiences: ExperienceSchema[] | null;
    education: EducationSchema[] | null;
}