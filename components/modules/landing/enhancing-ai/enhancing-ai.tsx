import { cn } from '@/lib/utils';
import React from 'react';
import EnhancingAIPlaceholder from './enhancing-ai-placeholder';
import { Award, CheckCheck, EqualApproximately, Heart, Keyboard, KeyRound, Languages, PenLine } from 'lucide-react';

interface EnhancingAIProps {
    className?: string;
}

const features = [
    {
        icon: PenLine,
        title: 'Rewrite Experiences',
        description: 'Transform your work history into <span class="text-white/90">powerful achievement narratives</span> that capture attention instantly.',
    },
    {
        icon: KeyRound,
        title: 'Analyze Keywords',
        description: 'Never miss crucial terms with <span class="text-white/90">automatic scanning</span> and integration of <span class="text-white/90">industry-specific language</span> from job postings.',
    },
    {
        icon: Languages,
        title: 'Optimize Language',
        description: 'Seamlessly <span class="text-white/90">adapt your resume\'s terminology</span> to reflect each company\'s <span class="text-white/90">unique culture and expectations</span>.',
    },
    {
        icon: Award,
        title: 'Highlight Achievements',
        description: 'Showcase your <span class="text-white/90">quantifiable wins</span> with metrics that <span class="text-white/90">immediately demonstrate</span> your impact and value.',
    },
    {
        icon: CheckCheck,
        title: 'Match Skills',
        description: 'Instantly align your capabilities with job requirements for <span class="text-white/90">maximum relevance</span> and <span class="text-white/90">improved screening success</span>.',
    },
];

const EnhancingAI: React.FC<EnhancingAIProps> = ({ className }) => {
    return (
        <div className={cn(className)}>

            <div className='mb-3 font-display effect-font-styling text-[2.5rem] md:text-[3rem] leading-[2.35rem] md:leading-[3rem] tracking-tight gradient-text hero-text text-center md:text-center mx-auto leading tight'>
                AI-powered CV enhancement
			</div>
            <div className='text-md md:text-md text-center tracking-tight leading-tight text-balance mx-auto'>
                Our AI analyzes your CV and provides suggestions to improve it.
            </div>


            <EnhancingAIPlaceholder className='mb-2' />

            <div className='grid w-full grid-cols-1 gap-12 sm:grid-cols-2 md:flex-row md:gap-20 lg:grid-cols-3'>
                {features.map((feature, index) => (
                    <div key={index} className="flex w-full flex-col gap-3 md:gap-2">
                        <feature.icon size={22} strokeWidth={2} className='' />
                        <div className="item-center flex flex-row gap-3 md:flex-col md:gap-4">
                            <h4 className="font-display effect-font-styling text-lg leading-[32px] md:leading-none">{feature.title}</h4>
                        </div>
                        <p className="text-sm leading-[1.6] text-muted-foreground font-normal" dangerouslySetInnerHTML={{ __html: feature.description }}></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EnhancingAI;