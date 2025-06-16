"use client";

import React, { useState, useEffect } from 'react';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Tags from '@/components/ui/tags';
import { cn } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Check, Loader2 } from 'lucide-react';
import TiltedCard from '@/components/ui/tilted-card';

interface EnhancingAIPlaceholderProps {
    className?: string;
}

const EnhancingAIPlaceholder: React.FC<EnhancingAIPlaceholderProps> = ({ className }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [typingFinished, setTypingFinished] = useState<boolean>(false);

    useEffect(() => {
        if (typingFinished) {
            setLoading(false);
        }
    }, [typingFinished]);

    return (
        <div className={cn(className, 'flex flex-col items-center max-sm:scale-75')}>

                <TiltedCard
                    rotateAmplitude={16}
                    scaleOnHover={1.1}
                    showMobileWarning={false}
                    showTooltip={true}
                    displayOverlayContent={true}
                >
                    <div className='flex flex-col p-6 pb-2'>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 w-full">
                                <Avatar className="size-12 border rounded-lg overflow-hidden">
                                    <AvatarImage src={`https://cdn.brandfetch.io/openai.com/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`} alt="" />
                                    <AvatarFallback className="rounded-lg">OP</AvatarFallback>
                                </Avatar>
                                <div className="w-full">
                                    <CardTitle className="text-lg font-semibold rounded-md tracking-tight pl-1 mb-0"><span className="align-middle inline-block">Product Designer</span></CardTitle>
                                    <CardDescription className="text-base pl-1 mt-[-6px]">OpenAI</CardDescription>
                                </div>
                            </div>
                        </div>
                        <Separator className="mt-2" />
                    </div>
                        <div className="text-sm px-6">
                        {loading ?
                            (<TypingAnimation startOnView={true} onFinished={() => setTypingFinished(true)} className="text-sm font-normal h-[176px]" duration={10}>
                                As a Product Designer at OpenAI, I was responsible for creating user-centered designs for various digital products. My role involved conducting user research, creating wireframes and prototypes, and collaborating with cross-functional teams to ensure the final product met user needs and business goals. I also played a key role in developing and maintaining design systems to ensure consistency across all digital touchpoints. One of the models I worked with was GPT-4o-mini.
                            </TypingAnimation>) :
                            (<p className="text-sm font-normal h-[176px]">As a Product Designer at OpenAI, I was responsible for creating user-centered designs for various digital products. My role involved conducting user research, creating wireframes and prototypes, and collaborating with cross-functional teams to ensure the final product met user needs and business goals. I also played a key role in developing and maintaining design systems to ensure consistency across all digital touchpoints. One of the models I worked with was GPT-4o-mini.</p>)}
                            <div className={'w-full flex flex-wrap gap-2 items-center pt-3 text-sm h-[44px]'}>
                                {!loading &&
                                    <>
                                        <div className='animate-fade py-1 px-2 text-sm rounded bg-secondary'>Wireframing</div>
                                        <div className='animate-fade py-1 px-2 text-sm rounded bg-secondary opacity-0 delay-150'>UX</div>
                                        <div className='animate-fade py-1 px-2 text-sm rounded bg-secondary opacity-0 delay-300'>Design System</div>
                                    </>}
                            </div>
                        </div>

                        <div className='flex pl-2.5 ml-2 pr-3 mt-3 py-1 bg-blue-900 text-blue-300 w-fit text-xs font-semibold font-mono items-center gap-1.5 rounded-full'>
                                {loading ? <Loader2 className="animate-spin" size={12} strokeWidth={3} /> : <Check size={12} strokeWidth={3} />}
                                { loading ? 'Enhancing...' : 'Enhanced' }
                        </div>
        </TiltedCard>
            



                    

       
    </div>
            )
};

export default EnhancingAIPlaceholder;