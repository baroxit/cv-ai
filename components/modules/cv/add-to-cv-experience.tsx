"use client";

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExperienceSchema } from '@/utils/schemas';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CvTooltip } from './cv-tooltip';
import Link from 'next/link';

interface AddToCvExperienceProps {
    experiences: ExperienceSchema[] | null;
    onAddToCv: (experience: ExperienceSchema) => void;
}

const AddToCvExperience: React.FC<AddToCvExperienceProps> = ({ experiences, onAddToCv }) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-card" size={'sm'}>
                        <Plus />
                        Add
                    </Button>
                </PopoverTrigger>
            <PopoverContent className='p-3 divide-y space-y-1'>
                {experiences && experiences.map((experience) => (
                    <CvTooltip key={experience.id} content="Click to add to CV">
                        <Card
                            onClick={() => onAddToCv(experience)} 
                            className='p-2 border-0 hover:bg-muted rounded-sm cursor-pointer group'>
                            <CardHeader className='p-0'>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="size-11 rounded-lg">
                                            <AvatarImage className="transition-all duration-400 group-hover:scale-105" src={`https://cdn.brandfetch.io/${experience.company?.domain}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`} alt="" />
                                            <AvatarFallback className="rounded-lg">{experience.company.name.slice(2,0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <CardTitle>{experience.role}</CardTitle>
                                            <CardDescription>{experience.company?.name}</CardDescription>
                                        </div>

                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </CvTooltip>
                ))}
                <div className='text-sm text-muted-foreground text-center pt-2'>
                    Do you want to create a new work experience? <Link className='underline' href='/dashboard/experiences'>Click here</Link>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default AddToCvExperience;