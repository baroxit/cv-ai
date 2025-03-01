"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GalleryHorizontalEnd } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`sticky top-0 z-40 border-b transition duration-200 ease-in-out animate-header-slide-down-fade ${scrolled ? 'border-white/20' : 'border-transparent'}`}>
            <div className="flex justify-between h-[58px] items-center mx-auto w-full max-w-screen-lg backdrop-blur-md">
                <div className="flex items-center">
                    <GalleryHorizontalEnd className="mr-3" />
                    <span className="text-lg font-semibold tracking-wide">CVbyAI</span>
                </div>
                <div className="flex gap-2">
                    <Link href="/login">
                        <Button variant={'outline'} className="rounded-lg text-sm font-semibold p-4 bg-transparent border-0 rounded-full">Login</Button>
                    </Link>
                    <Link href="/auth/signup">
                        <Button variant={'default'} className="rounded-lg text-sm font-semibold p-4 rounded-full">Sign Up</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;