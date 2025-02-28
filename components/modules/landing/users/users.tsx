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
                <div className="font-display gradient-text text-[2.5rem] md:text-[3rem] tracking-tight leading-[120%] hero-text gradient-text mb-3 text-center text-balance">
                    Join Successful Job Seekers
                </div>
                <p className='text-sm mt-8'>
                Our users have landed roles at world-class companies:
                </p>
                <Logos className='mt-0' copy='' hoverEffect={false} variant='default' />
            </div>
            <Link href="/auth/signup">
                <Button className="group mt-8 flex justify-between rounded-full text-[15px] font-semibold py-5 pr-2 pl-4 w-64 mx-auto">
                    Create Your First Version
                    <div className='bg-background rounded-full p-1'>
                        <ArrowRight className="text-white" size={12} strokeWidth={2} />
                    </div>
                </Button>
            </Link>
            
        </div>
    );
};

export default Users;