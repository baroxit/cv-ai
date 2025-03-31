import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Check, Sparkles, WandSparkles, X } from 'lucide-react';
import React, { useState } from 'react';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Skeleton } from '@/components/ui/skeleton';
import { CvTooltip } from '../cv-tooltip';
import { cn } from '@/lib/utils';
import { improveDescription } from '@/api/openai/serverActions';
import { ImproveDescriptionSchema } from '@/utils/schemas';

const aspects: { label: string; key: keyof ImproveDescriptionSchema; tooltip: string }[] = [
    { label: 'Spelling', key: 'spelling', tooltip: 'Ensures there are no typos or misspelled words in the text.' },
    { label: 'Grammar', key: 'grammar', tooltip: 'Verifies proper sentence structure and enhances readability.' },
    { label: 'Metrics', key: 'metrics', tooltip: 'Checks for measurable outcomes, such as percentages, timeframes, or numerical improvements.' },
    { label: 'Keywords', key: 'keywords', tooltip: 'Analyzes the use of impactful action verbs and industry-specific terminology to improve clarity and effectiveness.' }
];
const scores = [
    { label: 'Poor', description: 'Lacks clarity, impact, or measurable outcomes.' },
    { label: 'Fair', description: 'Understandable but lacks strong results or clear impact.' },
    { label: 'Good', description: 'Clear and includes measurable outcomes.' },
    { label: 'Excellent!', description: 'Clear, impactful, and includes quantifiable results.' }
];

interface CvExperienceAiPopoverProps {
    description: string;
    replaceDescription: (value: string) => void;
    className?: string;
}

const CvExperienceAiPopover: React.FC<CvExperienceAiPopoverProps> = ({ description, replaceDescription, className }) => {
    const [result, setResult] = useState<ImproveDescriptionSchema>();

    const handleImproveDescription = async () => {
        try {
            const result = await improveDescription(description);
            setResult(result);
        } catch (error) {
            console.error("Failed to improve description:", error);
        }
    };

    return (
        <Popover modal={true} onOpenChange={(open) => {
            if (open) {
                handleImproveDescription();
            }}}>
            <PopoverTrigger className={cn(className, 'data-[state=open]:visible')} asChild>
                <Button variant="outline" className="bg-card hover:bg-card" size="icon">
                    <WandSparkles className='mx-auto' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit max-w-[450px]" side='right'>
                {result ? (
                    <CvExperienceAiPopoverContent
                        content={result}
                        replaceDescription={replaceDescription}
                    />
                ) : (
                    <CvExperienceAiPopoverSkeleton />        
                )}
            </PopoverContent>
        </Popover>
    );
};

// Popover Content
const CvExperienceAiPopoverContent: React.FC<{
    content: ImproveDescriptionSchema;
    replaceDescription: (value: string) => void;
}> = ({ content, replaceDescription }) => {

    const [radioValue, setRadioValue] = useState<string>('');

    return (
        <div className="space-y-2">
            <h4 className="font-medium leading-none">{scores[content.score - 1].label} </h4>
            {/*<span className="text-sm text-muted-foreground">{scores[content.score - 1].description}</span>*/}
            <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 rounded-[2px] w-full ${
                            content.score > index ? 'bg-primary/90' : 'bg-muted'
                        }`}
                    ></div>
                ))}
            </div>
            <div className='grid grid-cols-2 gap-1 pt-2'>
                {aspects.map((aspect: { label: string; key: keyof ImproveDescriptionSchema; tooltip: string }) => (
                    <CvTooltip key={aspect.key} content={aspect.tooltip}>
                        <div className="flex items-center gap-1">
                            { content[aspect.key] ?
                                <Check className="h-4 w-4" />
                                :
                                <X className="h-4 w-4" />
                            }
                            <span className="text-sm">{aspect.label}</span>
                        </div>
                    </CvTooltip>
                ))}
            </div>
            <h4 className="font-medium text-sm leading-none pt-4">Suggested Versions</h4>
            <div>
                <RadioGroup
                    onValueChange={(value: string) => setRadioValue(value)}
                    className="">
                    {content.betterVersions.map((version, index) => (
                        <div key={index}>
                            <RadioGroupItem
                                value={version}
                                id={`version-${index}`}
                                className="peer sr-only"
                                aria-label={`Version ${index + 1}`}
                            />
                            <Label
                                htmlFor={`version-${index}`}
                                className="flex flex-col text-sm font-normal items-start justify-between rounded-md border border-muted bg-transparent p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                {version}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
                <Button className="mt-2 w-full" disabled={!radioValue} onClick={() => replaceDescription(radioValue)}>
                    Replace
                </Button>
            </div>
        </div>
    );
};

// Skeleton Popover Content
const CvExperienceAiPopoverSkeleton: React.FC = () => {
    return (
        <div className="w-[416px]">
            <Skeleton className="h-5 w-1/4 mb-2" />
            <Skeleton className="h-5 w-3/4 mb-2" />
            <div className="grid grid-cols-4 gap-2 mb-5">
                {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-1.5 w-full rounded-[2px]" />
                ))}
            </div>
            <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-16 w-full"
                    />
                ))}
            </div>
            <Button className="mt-3 w-full" disabled>
                    Replace
            </Button>
        </div>
    );
};

export default CvExperienceAiPopover;