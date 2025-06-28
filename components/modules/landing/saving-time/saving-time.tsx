'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SavingTimePlaceholder from './saving-time-placeholder';

interface SavingTimeProps {
    className?: string;
}

const SavingTime: React.FC<SavingTimeProps> = ({ className }) => {
    return (
        <div className={cn('md:flex justify-between items-center', className)}>
            <div className='flex flex-col text-center md:text-left'>
                <h2 className='font-display effect-font-styling text-[1.5rem] md:text-[1.7rem] leading-[2.35rem] md:leading-[2rem] tracking-tight gradient-text'>
                    It's not only about saving time
                </h2>
                <h2 className='text-[1.5rem] md:text-[1.7rem] leading-[2.35rem] md:leading-[2rem] tracking-tight text-muted-foreground'>
                    It's about landing your dream job
                </h2>
                <Link href="/auth/signup">
                    <Button className='bg-gray-200 mt-8 hover:bg-white group flex justify-between rounded-lg text-[15px] font-semibold shadow-[0_0_0_2px_rgba(0,0,0,0.5),0_0_14px_0_hsla(0,0%,100%,0.19),inset_0_-1px_0.4px_0_rgba(0,0,0,0.2),inset_0_1px_0.4px_0_#fff] w-fit mx-auto md:mx-0 mb-8 md:mb-0'>
                        Grab your next job 
                    </Button>
                </Link>
            </div>
            <div className='flex items-center justify-cente md:w-1/2'>
                <SavingTimePlaceholder />
            </div>
        </div>
    );
};

export default SavingTime;
