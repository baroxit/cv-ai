"use client"

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import {useState} from 'react';

interface TagsProps {
    tags: string[] | undefined;
    className?: string; // Add className prop
}

const Tags: React.FC<TagsProps> = ({ tags = [], className }) => {

    return (
        <div className={cn('w-full flex flex-wrap gap-2 items-center py-1.5 text-sm', className)}>
            {tags.map((tag, index) => (               
                    <div key={index} className='flex items-center rounded bg-secondary data-[state=active]:ring-ring data-[state=active]:ring-2 data-[state=active]:ring-offset-2 ring-offset-background'>
                        <div className='py-1 px-2 text-sm rounded bg-transparent'>{tag}</div>
                    </div>
                ))}
        </div>
    );
};

export default Tags;