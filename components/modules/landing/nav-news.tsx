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
        "relative select-none gap-2 rounded-lg border border-neutral-200 bg-white p-3 text-sm group mb-4",
        "transition-shadow"
      )}
    >
      <div>
        <div className="flex flex-col gap-1">
          <span className="line-clamp-1 font-medium text-neutral-900">
            {title}
          </span>
          <p className="line-clamp-2 text-[0.8125rem] text-neutral-500">
            {description}
          </p>
        </div>
        <div className="relative mt-3 aspect-[16/9] w-full shrink-0 overflow-hidden rounded border border-neutral-200 bg-neutral-100">
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
            "group-hover:h-7 group-hover:opacity-100"
          )}
        >
          <div className="flex items-center justify-between pt-3 text-xs">
            <Link
              href={href}
              target="_blank"
              className="font-medium text-neutral-700 transition-colors duration-75 hover:text-neutral-900"
            >
              Read more
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="text-neutral-600 transition-colors duration-75 hover:text-neutral-900"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 