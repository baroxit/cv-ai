import { cn } from '@/lib/utils';
import { Eye, EyeClosed } from 'lucide-react';
import React from 'react';
import PrivacyPlaceholder from './privacy-placeholder';

export default function Privacy({
    className
} : {
    className?: string;
}) {
    return (
        <div className={cn(className, 'group border rounded-2xl flex flex-col h-full hover:border-zinc-500 transition-colors duration-300')}>
            <div className='mx-6 h-[230px] flex flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] [mask-image:linear-gradient(black_70%,transparent)]'>
                <PrivacyPlaceholder />
            </div>
            <div className='px-8 py-4 pt-0 text-foreground flex flex-col flex-grow'>
                <div className="text-lg flex items-center">
                    <Eye className='mr-2 group-hover:hidden' size={20} />
                    <EyeClosed className='mr-2 hidden group-hover:block' size={20} />
                    You're in control of your privacy
                </div>
                <p className='text-sm mt-4 text-muted-foreground'>
                    Seamlessly manage sensitive information across all your CV versions.
                    Create public and private variants with one click.<br />
                    Perfect for confidential job searches or public portfolio sharing.          
                </p>
                <p className='text-sm pt-4 flex items-center place-self-start-end mt-auto'>
                </p>
            </div>
        </div>
    );
};
