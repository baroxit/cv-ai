import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import React from 'react';

const Focus: React.FC = () => {
    return (
        <div className="my-auto p-8">
            <div className='border px-4 py-3 rounded-lg shadow-md bg-muted/40 backdrop-blur-sm '>
                <div className='text-sm text-zinc-400'>
                    <div className='flex gap-3 group-hover:blur-sm mb-1 items-center transition-filter duration-300 text-zinc-300'>
                        <div className='rounded-md overflow-hidden size-9'>
                            <Avatar>
                                <AvatarImage src={`https://cdn.brandfetch.io/vodafone.com/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`} alt="" />
                            </Avatar>
                        </div>
                        <div>
                            <div className='text-lg font-medium'>Product Engineer</div>
                            <div className='font-medium mt-[-6px]'>Vodafone</div>
                        </div>
                    </div>
                    <span className='group-hover:blur-sm transition-filter duration-300'>
                    Developed and maintained web applications using modern technologies like {" "}
                    </span>
                    <div className='group-hover:font-medium group-hover:text-white inline relative'>
                        JavaScript
                        <div className="absolute top-[-2px] left-[-6px] w-1.5 h-1.5 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute top-[-2px] right-[-7px] w-1.5 h-1.5 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-[-2px] left-[-6px] w-1.5 h-1.5 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-[-2px] right-[-7px] w-1.5 h-1.5 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <span className='group-hover:blur-sm transition-filter duration-300'>{" "} with cross-functional 
                    teams to deliver several key 
                    features, significantly improving. Utilized modern frameworks like {" "}</span>
                    <div className='group-hover:font-medium group-hover:text-white inline relative'>
                        React
                        <div className="absolute top-[-2px] left-[-6px] w-1.5 h-1.5 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute top-[-2px] right-[-7px] w-1.5 h-1.5 border-t-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-[-2px] left-[-6px] w-1.5 h-1.5 border-b-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-[-2px] right-[-7px] w-1.5 h-1.5 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <span className='group-hover:blur-sm transition-filter duration-300'>
                    {" "}to build scalable and maintainable applications.
                    </span>
                </div>
            </div>

        </div>


    );
};

export default Focus;