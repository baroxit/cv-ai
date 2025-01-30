import React from 'react';
import { SheetTitle, SheetDescription } from '@/components/ui/sheet';
import EducationCard from '@/components/education-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { EducationSchema } from '@/utils/schemas';
import { NewEducationDialog } from '@/components/new-education-dialog';

// React Server Component (async is allowed here)
const CvSidebarEducation: React.FC<{ educations: EducationSchema[] }> = ({ educations }) => {

    return (
        <>
            <SheetTitle>Education</SheetTitle>
            {educations && educations.length &&
                educations.map((education) => (
                    <EducationCard key={education.id} education={education} />
                ))
            }

            <Card className="flex flex-col justify-center items-center text-center">
                <CardHeader>
                    <CardTitle>Add a new experience</CardTitle>
                    <CardDescription>
                        Share your work and learning experiences to highlight your skills.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <NewEducationDialog />
                </CardContent>
            </Card>
        </>
    );
};

export default CvSidebarEducation;
