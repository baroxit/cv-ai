import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

import React from 'react';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
    className?: string;
}

interface HeroSectionProps {
    className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
    return (
        <div className={cn("container", className)}>
            <div
                className="w-fit cursor-pointer group hover:border-white/20 hover:divide-white/20 border bg-muted/70 backdrop-blur-sm flex divide rounded-full border bg-dark text-xs font-medium drop-shadow-sm transition-all duration-150 sm:divide-x animate-slide-up-fade [--offset:10px] [animation-delay:0ms] [animation-duration:1s] [animation-fill-mode:both] motion-reduce:animate-fade-in"
            >
                <span className="py-1.5 pl-3 sm:pr-2.5 flex items-center">
                    Welcome to the first beta
                </span>
                <span className="flex items-center gap-1.5 p-1.5 pl-2.5 pr-2 text-zinc-300">
                    <span className="hidden sm:block group-hover:underline">Read more</span>
                    <div className="rounded-full p-0.5 bg-white/10">
                        <ArrowUpRight size={16} strokeWidth={2} />
                    </div>
                </span>
            </div>
            <div
                className="my-4 font-display effect-font-styling text-[3.5rem] md:text-6xl leading-[4.35rem] md:leading-[5rem] tracking-tight gradient-text hero-text text-center md:text-left"
            >
                Tailor your CV for every opportunity
            </div>
            <div className="md:w-2/3">
                <div className="text-[21px] tracking-tight leading-tight mt-1 text-balance">
                    Stop sending the same CV everywhere. <br />
                    Create targeted versions that speak directly to each opportunity. <br />
                    Highlight relevant experience, reorganize sections, and fine-tune your story for maximum impact.
                </div>
            </div>
            <Button className="group mt-8 flex justify-between rounded-full text-[15px] font-semibold py-5 pr-2 pl-4 w-56">
                Create your first CV
                <div className='bg-background rounded-full p-1'>
                    <ArrowRight className="text-white" size={12} strokeWidth={2} />
                </div>
            </Button>
        </div>
    );
};

export default HeroSection;