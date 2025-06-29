import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

export default function NavNews() {
  const ref = useRef<HTMLDivElement>(null);
  const title = 'Multi-language Support';
  const description = 'Now you can create your resume in over 50 languages.';
  const image = '/multi-language-support.png';
  const href = '/updates';
  const dismiss = () => {/* implement dismiss logic if needed */};

  return (
    <div
      ref={ref}
      className={cn(
        "relative select-none gap-2 rounded-lg border bg-background p-3 text-sm group/news mb-4",
        "transition-shadow max-w-[190px]"
      )}
    >
      <div>
        <div className="flex flex-col gap-1">
          <span className="line-clamp-1 font-medium text-foreground">
            {title}
          </span>
          <p className="line-clamp-2 text-[0.8125rem] text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="relative mt-3 aspect-[16/9] w-full shrink-0 overflow-hidden rounded border bg-muted">
          {image && (
            <Image
              src={image}
              alt="Multi-language support"
              fill
              className="rounded object-cover object-center"
              draggable={false}
              style={{ aspectRatio: '16/9', objectFit: 'cover', objectPosition: 'center' }}
            />
          )}
        </div>
        <div
          className={cn(
            "h-0 overflow-hidden opacity-0 transition-[height,opacity] duration-200",
            "group-hover/news:h-7 group-hover/news:opacity-100"
          )}
        >
          <div className="flex items-center justify-between pt-3 text-xs">
            <Link
              href={href}
              target="_blank"
              className="font-medium text-muted-foreground transition-colors duration-75 hover:text-foreground"
            >
              Read more
            </Link>
            {/*
            <button
              type="button"
              onClick={dismiss}
              className="text-muted-foreground transition-colors duration-75 hover:text-foreground"
            >
              Dismiss
            </button>
            */}
          </div>
        </div>
      </div>
    </div>
  );
} 