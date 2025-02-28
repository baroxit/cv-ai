import { Avatar, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
const PrivacyPlaceholder: React.FC = () => {
    return (
        <div className='grid grid-cols-2 gap-1.5 grid-rows-3 text-zinc-500 font-mono w-[450px] text-sm text-center tracking-wide'>
            <div className='border p-4 rounded-lg'>john.smith@gmail.com</div>
            <div className='border p-4 rounded-lg'><span className='group-hover:blur-sm transition-filter duration-300'><span className='opacity-70'>📍</span> London, UK</span></div>
            <div className='border p-4 rounded-lg'><span className='group-hover:blur-sm transition-filter duration-300'><span className='opacity-70'>🎂</span> 15/03/2001</span></div>
            <div className='border p-4 rounded-lg'>+39 3358585766</div>
            <div className='border p-4 rounded-lg'>link.com/in/johnsmith</div>
            <div className='border p-4 rounded-lg'><span className='group-hover:blur-sm transition-filter duration-300'>@its.john.smith</span></div>
        </div>
    );
};

export default PrivacyPlaceholder;
