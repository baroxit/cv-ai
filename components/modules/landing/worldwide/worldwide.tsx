import React from 'react';
import Flags from './flags';
import { Globe, Languages } from 'lucide-react';

const Worldwide: React.FC = ({
    className
} : {
    className?: string;
}) => {
    return (
        <div className='group border rounded-2xl flex flex-col h-full hover:border-zinc-500 transition-colors duration-300'>
            <div className='h-[230px] flex flex-col items-center justify-center [mask-image:linear-gradient(black_70%,transparent)]'>
                <Flags className="mb-2 [&_*]:delay-75" />
                <Flags className="my-2 [&_*]:delay-1500" reverse={true} />
                <Flags className="my-2 [&_*]:delay-2500" />
            </div>
            <div className='px-8 py-4 pt-0 text-foreground flex flex-col flex-grow'>
                <div className="text-lg flex items-center">
                    <Globe className='mr-2' size={20} />
                    Your career has no borders 
                </div>
                <p className='text-sm mt-4 text-muted-foreground'>
                    Transform your CV for any opportunity worldwide, with automatic adaptation of formats, languages, standards and best practices – from local startups to global enterprises
                </p>
                <p className='text-sm pt-4 flex items-center place-self-start-end mt-auto'>
                    <Languages size={16} className='inline mr-2' />
                    Over 50 languages supported
                </p>
            </div>
        </div>
    );
};

export default Worldwide;