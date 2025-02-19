"use client";

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { EducationSchema } from '@/utils/schemas';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CvTooltip } from './cv-tooltip';
import Link from 'next/link';

interface AddToCvEducationProps {
    educations: EducationSchema[] | null;
    onAddToCv: (education: EducationSchema) => void;
}

const AddToCvEducation: React.FC<AddToCvEducationProps> = ({ educations, onAddToCv }) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div>
                    <Button variant="outline" size={'sm'}>
                        <Plus />
                        Add
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className='p-3 divide-y space-y-1'>
                {educations && educations.map((education) => (
                    <CvTooltip key={education.id} content="Click to add to CV">
                        <Card
                            onClick={() => onAddToCv(education)} 
                            className='p-2 border-0 hover:bg-muted rounded-sm cursor-pointer group'>
                            <CardHeader className='p-0'>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <CardTitle>{education.degree} - {education.field_of_study}</CardTitle>
                                            <CardDescription>{education.school}</CardDescription>
                                        </div>

                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </CvTooltip>
                ))}
                <div className='text-sm text-muted-foreground text-center pt-2'>
                    Do you want to add a new education experience? <Link className='underline' href='/dashboard/experiences'>Click here</Link>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default AddToCvEducation;