"use client"

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import {useState} from 'react';

interface InputTagsProps {
    tags: string[] | undefined;
    setTags: (tags: string[]) => void;
    className?: string; // Add className prop
}

const InputTags: React.FC<InputTagsProps> = ({ tags = [], setTags, className }) => {
    const [inputValue, setInputValue] = useState('');
    tags = tags || [];

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            setTags([...tags, inputValue.trim()]);
            setInputValue('');
        }
    };

    const handleRemoveTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className={cn('w-full flex flex-wrap gap-2 items-center rounded-md border border-input px-2 py-1.5 text-sm', className)}>
            {tags.map((tag, index) => (               
                    <div key={index} className='flex h-6 items-center rounded bg-secondary data-[state=active]:ring-ring data-[state=active]:ring-2 data-[state=active]:ring-offset-2 ring-offset-background'>
                        <div className='py-1 px-2 text-sm rounded bg-transparent'>{tag}</div>
                        <div className='flex rounded bg-transparent mr-1 cursor-pointer' onClick={() => handleRemoveTag(index)}>
                            <X className='h-4 w-4' />
                        </div>
                    </div>
                ))}
            
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a skill"
                className='text-sm min-h-6 focus:outline-none flex-1 bg-transparent px-1'
            />
        </div>
    );
};

export default InputTags;