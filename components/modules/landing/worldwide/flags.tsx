import { cn } from '@/lib/utils';
import React from 'react';


const languages: { name: string, flag: string }[] = [
    { name: "Italiano", flag: "🇮🇹" },
    { name: "English", flag: "🇬🇧" },
    { name: "Español", flag: "🇪🇸" },
    { name: "Français", flag: "🇫🇷" },
    { name: "Deutsch", flag: "🇩🇪" },
    { name: "中文", flag: "🇨🇳" },
    { name: "日本語", flag: "🇯🇵" },
    { name: "한국어", flag: "🇰🇷" },
    { name: "Русский", flag: "🇷🇺" },
    { name: "Português", flag: "🇵🇹" },
    { name: "العربية", flag: "🇸🇦" },
    { name: "Nederlands", flag: "🇳🇱" },
    { name: "Svenska", flag: "🇸🇪" },
    { name: "Polski", flag: "🇵🇱" },
    { name: "Türkçe", flag: "🇹🇷" },
    { name: "Ελληνικά", flag: "🇬🇷" },
    { name: "Magyar", flag: "🇭🇺" },
    { name: "ไทย", flag: "🇹🇭" },
    { name: "हिन्दी", flag: "🇮🇳" },
    { name: "עברית", flag: "🇮🇱" },
    { name: "Українська", flag: "🇺🇦" }
];


const Flags = ({
    className,
    reverse = false
} : {
    className?: string;
    reverse?: boolean;
}) => {

    languages.sort(() => Math.random() - 0.5);

    return (
        <div className={cn("group relative mx-auto block w-full max-w-screen-lg overflow-hidden", className)}>
            
            <div className="absolute top-[-3px] border-t border-1 border-dashed border-gray-500 w-full mt-4 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]"></div>

            <div className="relative flex w-full items-center overflow-hidden px-5 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] md:px-0">
                {[...Array(2)].map((_, idx) => (
                <div
                    key={idx}
                    className={cn(
                    "flex w-max min-w-max items-center gap-3 pl-3",
                    "motion-safe:animate-infinite-scroll [--scroll:-100%] motion-safe:[animation-duration:300s]",
                    "transition-[filter,opacity] duration-300",
                    "group-hover:[animation-play-state:paused]"
                    )}
                    aria-hidden={idx !== 0}
                    style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
                >
                    {languages.map((language) => (
                        <div key={language.name} className='border bg-muted/40 backdrop-blur-sm rounded-xl text-xs px-3 py-1 space-x-2'>
                            <span>{language.flag}</span>
                            <span>{language.name}</span>
                        </div>
                    
                    ))}
                </div>
                ))}
            </div>




        </div>
    );
};

export default Flags;

/*
<img
                        key={language.name}
                        src={`https://cdn.brandfetch.io/${logo}/w/512/h/115/theme/light/logo?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`}
                        alt={logo.toUpperCase()}
                        width={520}
                        height={182}
                        draggable={false}
                        className={cn(
                        "h-6 w-auto"
                        )}
                    />
                    */
