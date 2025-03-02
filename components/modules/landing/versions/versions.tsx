import React from 'react';
import { Check, Folder, FolderOpen, GalleryHorizontalEnd, Layers, Sparkle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import VersionsPlaceholder from './versions-placeholder';

export default function Versions({
    className
} : {
    className?: string;
}) {
    return (
        <div className={cn(className, 'group border rounded-2xl flex flex-col h-full hover:border-zinc-500 transition-colors duration-300')}>
            <div className='h-[230px] overflow-hidden flex flex-col items-center justify-center [mask-image:linear-gradient(black_70%,transparent)]'>
                <VersionsPlaceholder />
            </div>
            <div className='px-8 py-4 pt-0 text-foreground flex flex-col flex-grow text-sm'>
                <div className="text-lg flex items-center">
                    <Layers className='mr-2' size={20} />
                    Master profile, infinite versions
                </div>
                <p className='mt-4 text-sm text-muted-foreground'>
                Build once, apply everywhere. Create a comprehensive master profile of your career data, then generate perfectly tailored CVs for each opportunity with just a few clicks—saving hours of manual editing while ensuring every application showcases your most relevant experience.                </p>
                <p className='text-sm pt-5 flex items-center place-self-start-end mt-auto'>
                    <FolderOpen className='mr-2' size={16} />
                    Everything stored in the archive
                </p>
            </div>
        </div>
    );
};
