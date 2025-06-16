'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { Star, StarOff, CheckCircle2, Clock, AlertCircle, ChevronRight, Mail, Hourglass, Send, XCircle, ChevronsUp, ChevronUp, ChevronDown } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface SavingTimePlaceholderProps {
    className?: string;
}

const companies = [
    { name: 'Apple', logo: 'apple.com', status: 'Interview Scheduled', priority: 'high', role: 'Senior Product Engineer' },
    { name: 'Google', logo: 'google.com', status: 'No Response', priority: 'very high', role: 'Software Engineer' },
    { name: 'Microsoft', logo: 'microsoft.com', status: 'Waiting for Response', priority: 'medium', role: 'AI Developer' },
    { name: 'Meta', logo: 'meta.com', status: 'Application Sent', priority: 'very high', role: 'Frontend Engineer' },
    { name: 'Amazon', logo: 'amazon.com', status: 'Rejected', priority: 'low', role: 'Backend Developer' },
    { name: 'Netflix', logo: 'netflix.com', status: 'Interview Scheduled', priority: 'high', role: 'AI Engineer' },
    { name: 'Spotify', logo: 'spotify.com', status: 'No Response', priority: 'low', role: 'Mobile Developer' },
    { name: 'Twitter', logo: 'twitter.com', status: 'Waiting for Response', priority: 'low', role: 'DevOps Engineer' },
    { name: 'LinkedIn', logo: 'linkedin.com', status: 'Interview Scheduled', priority: 'high', role: 'ML Engineer' },
    { name: 'Uber', logo: 'uber.com', status: 'Application Sent', priority: 'high', role: 'Data Engineer' },
    { name: 'Airbnb', logo: 'airbnb.com', status: 'Waiting for Response', priority: 'low', role: 'Product Manager' },
    { name: 'Stripe', logo: 'stripe.com', status: 'No Response', priority: 'very high', role: 'Security Engineer' },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Interview':
            return 'bg-green-500/20 text-green-400';
        case 'Screening':
            return 'bg-yellow-500/20 text-yellow-400';
        case 'Application Sent':
            return 'bg-blue-500/20 text-blue-400';
        case 'Rejected':
            return 'bg-red-500/20 text-red-400';
        case 'No Response':
            return 'bg-gray-500/20 text-gray-400';
        case 'Waiting for Response':
            return 'bg-purple-500/20 text-purple-400';
        case 'Application Sent':
            return 'bg-indigo-500/20 text-indigo-400';
        default:
            return 'bg-gray-500/20 text-gray-400';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Interview Scheduled':
            return <CheckCircle2 size={16} />;
        case 'Waiting for Response':
            return <Clock size={16} />;
        case 'Application Sent':
            return <AlertCircle size={16} />;
        case 'Rejected':
            return <XCircle size={16} />;
        case 'No Response':
            return <Mail size={16} />;
        case 'Waiting for Response':
            return <Hourglass size={16} />;
        case 'Application Sent':
            return <Send size={16} />;
        default:
            return null;
    }
};

const getPriorityStars = (priority: string) => {
    switch (priority) {
        case 'very high':
            return (
                <div className="flex items-center gap-1 pl-1 pr-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px]">
                    <ChevronsUp size={14} />
                    Very High Priority
                </div>
            );
        case 'high':
            return (
                <div className="flex items-center gap-1 pl-1 pr-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[11px]">
                    <ChevronUp size={14} />
                    High Priority
                </div>
            );
        case 'medium':
            return (
                <div className="flex items-center gap-1 pl-1 pr-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 text-[11px]">
                    <ChevronRight size={14} />
                    Medium Priority
                </div>
            );
        case 'low':
            return (
                <div className="flex items-center gap-1 pl-1 pr-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 text-[11px]">
                    <ChevronDown size={14} />
                    Low Priority
                </div>
            );
        default:
            return null;
    }
    };

const SavingTimePlaceholder: React.FC<SavingTimePlaceholderProps> = ({ className }) => {
    return (
        <div className={cn('w-full h-[400px] relative overflow-hidden space-y-5', className)}>
            {/* First carousel */}
            <div className="relative flex w-full items-center overflow-hidden px-5 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] md:px-0">
                {[...Array(2)].map((_, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "flex w-max min-w-max items-center gap-5 pl-5",
                            "motion-safe:animate-infinite-scroll [--scroll:-100%] motion-safe:[animation-duration:60s]",
                        )}
                        aria-hidden={idx !== 0}
                    >
                        {companies.slice(0, 4).map((company) => (
                            <div 
                                key={company.name} 
                                className="flex items-center group gap-4 p-4 rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30"
                            >
                                <Avatar className="size-16 bg-white/5 rounded-xl p-0.5 border border-white/20">
                                    <AvatarImage
                                        src={`https://cdn.brandfetch.io/${company.logo}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`}
                                        alt={company.name}
                                        className="size-full rounded-lg"
                                    />
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-medium text-md leading-none">{company.name}</span>
                                    <span className="text-sm text-muted-foreground">{company.role}</span>
                                    <div className="flex gap-1 mt-1 items-center">
                                        {getPriorityStars(company.priority)}
                                    </div>
                                </div>
                                <ChevronRight className="text-muted-foreground/50 group-hover:text-gray-400 transition-colors duration-300 ml-8" size={18} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* Second carousel */}
            <div className="relative flex w-full items-center overflow-hidden px-5 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] md:px-0">
                {[...Array(2)].map((_, idx) => (    
                    <div
                        key={idx}
                        className={cn(
                            "flex w-max min-w-max items-center gap-5 pl-5",
                            "motion-safe:animate-infinite-scroll [--scroll:-100%] motion-safe:[animation-duration:70s]",
                        )}
                        aria-hidden={idx !== 0}
                        style={{ animationDirection: 'reverse' }}
                    >
                        {companies.slice(4, 8).map((company) => (
                            <div 
                                key={company.name} 
                                className="flex items-center group gap-4 p-4 rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30"
                            >
                                <Avatar className="size-16 bg-white/5 rounded-xl p-0.5 border border-white/20">
                                    <AvatarImage
                                        src={`https://cdn.brandfetch.io/${company.logo}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`}
                                        alt={company.name}
                                        className="size-full rounded-lg"
                                    />
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-medium text-md leading-none">{company.name}</span>
                                    <span className="text-sm text-muted-foreground">{company.role}</span>
                                    <div className="flex gap-1 mt-1 items-center">
                                        {getPriorityStars(company.priority)}
                                    </div>
                                </div>
                                <ChevronRight className="text-muted-foreground/50 group-hover:text-gray-400 transition-colors duration-300 ml-8" size={18} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {/* Third carousel */}
            <div className="relative flex w-full items-center overflow-hidden px-5 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] md:px-0">
                {[...Array(2)].map((_, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "flex w-max min-w-max items-center gap-5 pl-5",
                            "motion-safe:animate-infinite-scroll [--scroll:-100%] motion-safe:[animation-duration:60s]",
                        )}
                        aria-hidden={idx !== 0}
                    >
                        {companies.slice(8, 12).map((company) => (
                            <div 
                                key={company.name} 
                                className="flex items-center group gap-4 p-4 rounded-xl transition-all duration-300 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30"
                            >
                                <Avatar className="size-16 bg-white/5 rounded-xl p-0.5 border border-white/20">
                                    <AvatarImage
                                        src={`https://cdn.brandfetch.io/${company.logo}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`}
                                        alt={company.name}
                                        className="size-full rounded-lg"
                                    />
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="font-medium text-md leading-none">{company.name}</span>
                                    <span className="text-sm text-muted-foreground">{company.role}</span>
                                    <div className="flex gap-1 mt-1 items-center">
                                        {getPriorityStars(company.priority)}
                                    </div>
                                </div>
                                <ChevronRight className="text-muted-foreground/50 group-hover:text-gray-400 transition-colors duration-300 ml-8" size={18} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>


        </div>
    );
};

export default SavingTimePlaceholder; 