import { cn } from '@/lib/utils';
import { ArrowRight, Logs } from 'lucide-react';
import React from 'react';
import Logos from '../logos';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UsersProps {
    className?: string;
}

const Users: React.FC<UsersProps> = ({ className }) => {
    return (
        <div className={cn(className, 'text-center max-w-4xl mx-auto')}>
            <div className='px-8 py-4 pt-0 text-foreground flex flex-col flex-grow'>
                <div className='mb-3 font-display effect-font-styling text-[2.5rem] md:text-[3rem] leading-[2.35rem] md:leading-[3rem] tracking-tight gradient-text hero-text text-center md:text-center mx-auto leading tight'>
                    Join Successful Job Seekers
                </div>
                <div className='mt-8 text-md md:text-md text-center tracking-tight leading-tight text-balance mx-auto'>
                    Our users have landed roles at world-class companies:
                </div>
                <Logos className='mt-0' copy='' hoverEffect={false} variant='default' />
            </div>
            <Link href="/auth/signup">
                <Button className='bg-gray-200 mx-auto mt-6 hover:bg-white group flex justify-between rounded-lg text-[15px] font-semibold shadow-[0_0_0_2px_rgba(0,0,0,0.5),0_0_14px_0_hsla(0,0%,100%,0.19),inset_0_-1px_0.4px_0_rgba(0,0,0,0.2),inset_0_1px_0.4px_0_#fff]'>
                    Create your CV now <ArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5}/>
                </Button>
            </Link>
            
        </div>
    );
};

export default Users;