import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const logos = [
  { src: "campari.com", height: "h-5" },
  { src: "nexigroup.com", height: "h-4" },
  { src: "vodafone.com", height: "h-6" },
  { src: "ferrari.com", height: "h-7" },
  { src: "eni.com", height: "h-6" },
  { src: "revolut.com", height: "h-4" },
  { src: "spotify.com", height: "h-6" },
  { src: "enel.com", height: "h-5" },
  { src: "visa.com", height: "h-5" },
  { src: "posteitaliane.it", height: "h-4" },
  { src: "armani.com", height: "h-5" },
  { src: "amazon.com", height: "h-5" },
];

export default function Logos({
  className,
  copy = "Giving marketing superpowers to world-class companies",
  variant = "default",
  hoverEffect = true
}: {
  className?: string;
  copy?: string | null;
  variant?: "default" | "inline";
  hoverEffect?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative mx-auto block w-full max-w-screen-lg overflow-hidden [&_*]:delay-75",
        variant === "inline" && "sm:flex sm:items-center",
        className,
      )}
    >
      {copy !== null && (
        <p
          className={cn(
            "mx-auto max-w-sm text-balance text-center text-sm transition-[filter,opacity] duration-800 group-hover:opacity-30 group-hover:blur-sm sm:max-w-xl",
            variant === "default"
              ? "transition-[filter,opacity] duration-300 group-hover:opacity-30 group-hover:blur-sm sm:max-w-xl"
              : "sm:text-left",
          )}
        >
          {copy}
        </p>
      )}
      <div className="relative flex w-full items-center overflow-hidden px-5 pb-8 pt-8 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)] md:px-0">
        {[...Array(2)].map((_, idx) => (
          <div
            key={idx}
            className={cn(
              "flex w-max min-w-max items-center gap-16 pl-16",
              "motion-safe:animate-infinite-scroll [--scroll:-100%] motion-safe:[animation-duration:40s]",
              hoverEffect && "transition-[filter,opacity] duration-300 group-hover:opacity-30 group-hover:blur-sm",
            )}
            aria-hidden={idx !== 0}
          >
            {logos.map((logo) => (
              <img
                key={logo.src}
                src={`https://cdn.brandfetch.io/${logo.src}/w/512/h/115/theme/light/logo?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`}
                alt={logo.src.toUpperCase()}
                width={520}
                height={182}
                draggable={false}
                className={cn(
                  "w-auto", logo.height
                )}
              />
            ))}
          </div>
        ))}
      </div>
        <div className={cn(
          "pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300",
          hoverEffect && "group-hover:opacity-100"
        )}>
        <span className="flex items-center text-sm font-medium">
          Join successful job seekers
          <ArrowRight className="ml-1 size-4"/>
        </span>
      </div>
    </div>
  );
}