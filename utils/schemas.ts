export interface ExperienceSchema {
    id?: number;
    company: {
        name: string;
        domain: string;
        icon?: string;
        brandId?: string;
    };
    location: string | null;
    role: string;
    description: string;
    start_period?: Date | null;
    end_period?: Date | null;
    user_id?: string;
    skills?: string[];
}

export interface EducationSchema {
    id?: number;
    school: string;
    degree: string;
    field_of_study: string;
    start_period?: Date | null;
    end_period?: Date | null;
    location: string | null;
    description?: string;
    grade: string | null;
    max_grade?: string | null;
    showGrade?: boolean;
}

export interface PersonalSchema {
    id: number;
    name: string;
    title: string | null;
    email: string | null;
    phone: string | null;
    avatar?: string | null;
    linkedin: string | null;
    description: string | null;
}

export interface CvPersonalSchema {
    title: string;
    description: string;
    showEmail: boolean;
    showPhone: boolean;
    showLinkedin: boolean;
    showAvatar: boolean;
}

export interface userDataSchema {
    personal: PersonalSchema;
    experiences: ExperienceSchema[] | null;
    education: EducationSchema[] | null;
}