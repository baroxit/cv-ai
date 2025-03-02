import ExperienceCard from '@/components/modules/about/experience-card';
import { NewExperienceDialog } from '@/components/modules/about/new-experience-dialog';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { ExperienceSchema } from '@/utils/schemas';
import React from 'react';


const CvSidebarExperiences: React.FC<{ experiences: ExperienceSchema[] }> = ({ experiences }) => {
    return (
        <>
            <SheetTitle>Experiences</SheetTitle>
            <SheetDescription>
            </SheetDescription>
            {experiences && experiences.length > 0 &&
                experiences.map((experience) => (
                    <ExperienceCard key={experience.id} experience={experience} />
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
                    <NewExperienceDialog />
                </CardContent>
            </Card>
        </>
    );
};

export default CvSidebarExperiences;