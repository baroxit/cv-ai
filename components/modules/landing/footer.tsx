import { Separator } from '@/components/ui/separator';
import { GalleryHorizontalEnd } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full pt-24">
            <Separator className='[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]' />
            <div className="px-8 pt-12 pb-8 bg-white dark:bg-neutral-950 w-full relative overflow-hidden">
                <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start md:px-8">
                    <div>
                        <div className="mr-0 md:mr-4 md:flex mb-4">
                            <div className="flex items-center text-white text-sm mr-4 px-2 py-1 relative z-20">
                                <GalleryHorizontalEnd className="mr-2 opacity-85" />
                                <span className="text-lg font-semibold tracking-wide gradient-text">promptCv</span>
                            </div>
                        </div>
                        <div className="mt-2 ml-2">© copyright promptCv 2025. All rights reserved.</div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-10 items-start mt-10 sm:mt-0 md:mt-0">
                        <div className="flex justify-center space-y-4 flex-col">
                            <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">Socials</p>
                            <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
                                <li className="list-none"><a className="transition-colors hover:text-text-neutral-800" href="/products">LinkedIn</a></li>
                            </ul>
                        </div>
                        <div className="flex justify-center space-y-4 flex-col">
                            <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">Legal</p>
                            <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
                                <li className="list-none"><a className="transition-colors hover:text-text-neutral-800" href="/products">Privacy Policy</a></li>
                                <li className="list-none"><a className="transition-colors hover:text-text-neutral-800" href="/products">Terms of Service</a></li>
                                <li className="list-none"><a className="transition-colors hover:text-text-neutral-800" href="/products">Cookie Policy</a></li>
                            </ul>
                        </div>
                        <div className="flex justify-center space-y-4 flex-col">
                            <p className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold">Register</p>
                            <ul className="transition-colors hover:text-text-neutral-800 text-neutral-600 dark:text-neutral-300 list-none space-y-4">
                                <li className="list-none"><Link className="transition-colors hover:text-text-neutral-800" href="/auth/signup">Sign Up</Link></li>
                                <li className="list-none"><Link className="transition-colors hover:text-text-neutral-800" href="/login">Login</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-center mt-0 text-7xl md:text-9xl lg:text-[12rem] xl:text-[13rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">
                promptCv
            </p>
        </footer>
    );
};

export default Footer;