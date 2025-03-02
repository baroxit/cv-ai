import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CreateCvCtaProps {
    className?: string;
}

const CreateCvCta: React.FC<CreateCvCtaProps> = ({ className }) => {
    return (
        <div className={className}>
            <div className={cn('p-1 pl-4 w-fit mx-auto rounded-full flex gap-6 items-center justify-between bg-muted text-foreground font-medium')}>
                <p className='text-xs leading-tight text-muted-foreground underline text-balance'>Have you entered all your relevant information?</p>
                <Link href="/cv/create">
                    <Button className='rounded-full py-1' size={'sm'}>
                        Let's create your CV
                    </Button>
                </Link>
            </div>
        </div>

    );
};

export default CreateCvCta;