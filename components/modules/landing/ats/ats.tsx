import React from 'react';
import Focus from './focus';
import { Check, Search } from 'lucide-react';

const Ats: React.FC = ({
    className
} : {
    className?: string;
}) => {
    return (
        <div className='group border rounded-2xl flex flex-col h-full hover:border-zinc-500 transition-colors duration-300'>
            <div className='h-[230px] flex flex-col items-center justify-center [mask-image:linear-gradient(black_70%,transparent)]'>
                <Focus />
            </div>
            <div className='px-8 py-4 pt-0 text-foreground flex flex-col flex-grow'>
                <div className="text-lg flex items-center">
                    <Search className='mr-2' size={20} />
                    Beat the bots, reach the humans 
                </div>
                <p className='text-sm mt-4 text-muted-foreground'>
                Every CV version is automatically optimized for Applicant Tracking Systems with industry-standard formatting, keyword optimization, and clean, parseable layouts to help you get more interviews.
                </p>
                <p className='text-sm pt-4 flex items-center place-self-start-end mt-auto'>
                    <Check size={16} className='inline mr-2' />
                    Perfect compatibility with major ATS platforms
                </p>
            </div>
        </div>
    );
};


export default Ats;