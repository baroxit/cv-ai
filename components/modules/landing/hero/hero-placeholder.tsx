import { cn } from '@/lib/utils';
import React from 'react';

interface HeroPlaceholderProps {
    className?: string;
}

const HeroPlaceholder: React.FC<HeroPlaceholderProps> = ({ className }) => {
    return (
        <div className={cn(className, 'opacity-85 relative [clip-path:inset(-50px_0_0_-50px)] overflow-hidden')}>
            <div 
            style={{ 
                perspective: '4000px', 
                perspectiveOrigin: '100% 0', 
                transformStyle: 'preserve-3d' 
            }} 
            >
            <div 
            className="w-full h-[600px] relative" 
            style={{ 
                //backgroundImage: '/cv.svg', 
                //backgroundSize: 'cover', 
                //backgroundPosition: 'center', 
                transform: 'translateX(-2%) rotateX(52deg) rotateY(31deg) rotate(324deg) scale(1)',
                transformOrigin: 'top left',
                backfaceVisibility: 'hidden',
            }}
            >
                  <img className='w-full' src="/cv.svg" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-l from-background/30 to-transparent"></div>
            </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background to-50% to-transparent"></div>
        </div>
    );
};

export default HeroPlaceholder;