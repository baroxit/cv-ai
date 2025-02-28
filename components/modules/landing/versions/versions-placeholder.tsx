"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
    className?: string;
    company?: string;
    domain?: string;
    role?: string;
    date?: string;
  }

const defaultCards: DisplayCardProps[] = [
    {
        company: "Apple",
        domain: "apple.com",
        role: "Product Engineer",
        date: "4 weeks ago",
        className:
            "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 hover:before:opacity-0 before:transition-opacity before:duration-700 before:left-0 before:top-0",
    },
    {
        company: "Linear",
        domain: "linear.app",
        role: "Software Developer",
        date: "2 days ago",
        className:
            "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 hover:before:opacity-0 before:transition-opacity before:duration-700 before:left-0 before:top-0",
    },
    {
        company: "Microsoft",
        domain: "microsoft.com",
        role: "Fullstack Developer",
        date: "Just now",
        className:
            "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
];

export default function VersionsPlaceholder() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center py-20">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={defaultCards} />
      </div>
    </div>
  );
}


function DisplayCard({
  className,
  company = "apple",
  domain = "apple.com",
  role = "Product Engineer",
  date = "Just now",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative h-22 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border bg-muted/70 backdrop-blur-sm px-4 py-4 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div className="items-center flex">
        <Avatar className="h-11 w-11 rounded-lg">
            <AvatarImage src={`https://cdn.brandfetch.io/${domain}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`} alt="" />
            <AvatarFallback className="rounded-lg uppercase">{company.slice(0,2)}</AvatarFallback>
        </Avatar>
        <div className="ml-1">
            <p className={cn("text-lg font-medium mb-[-7px]")}>Giacomo {" <> "} <span className="capitalize">{company}</span></p>
            <p className="text-muted-foreground text-lg">{role}</p>
        </div>
         
      </div>
      <p className="text-muted-foreground pt-4 font-mono tracking-tight">{date}</p>
      
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-20 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}