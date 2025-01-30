import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface Button {
    title: string;
    page: string;
}

const buttons: Button[] = [
    { title: 'Experiences', page: 'experiences' },
    { title: 'Education', page: 'education' },
    { title: 'Projects', page: 'projects' },
    { title: 'Languages', page: 'languages' },
    { title: 'Volunteer', page: 'volunteer' },
];
interface CvSidebarButtonsProps {
    page: string;
    className?: string;
    onChange: (page: string) => void;
    isOpen: boolean;
    style?: React.CSSProperties;
}

export const CvSidebarButtons: React.FC<CvSidebarButtonsProps> = ({ page, className, isOpen, onChange, style = {} }) => {


    return (
        <div className={cn(className, "rotate-90")} style={style}>
            <div className='flex space-x-4'>
            {buttons.map((button) => (
                <Button
                    key={button.title}
                    variant="outline"
                    onClick={() => onChange(button.page)}
                    className={cn(
                        "px-6 h-10 rounded-none rounded-br-xl rounded-bl-xl outline-4 outline-red",
                        { "border-t-0": !isOpen},
                        { "border-t-0 hover:bg-background": button.page === page && isOpen }
                    )}>
                        {button.title}
                </Button>
            ))}
            </div>
        </div>
    );
};

export default CvSidebarButtons;