"use client"


import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
  import { Button } from "@/components/ui/button"
  import { cn } from "@/lib/utils"
import { useState } from "react"
import { CvSidebarButtons } from "@/components/modules/cv/sidebar/buttons"
import Experiences from "@/components/modules/cv/sidebar/experiences";
import Education from "@/components/modules/cv/sidebar/education";
import Languages from "@/components/modules/cv/sidebar/languages";
import Volunteer from "@/components/modules/cv/sidebar/volunteer";
import Projects from "@/components/modules/cv/sidebar/projects";
import { userDataSchema } from "@/utils/schemas"

interface Page {
    page: string;
    content: (userData: any) => React.ReactNode;
}

const pages: Page[] = [
    {
        page: 'experiences',
        content: (userData) => <Experiences experiences={userData['experiences']} />,
    },
    {
        page: 'education',
        content: (userData) => <Education educations={userData['education']} />,
    },
    {
        page: 'languages',
        content: (userData) => <Languages />,
    },
    {
        page: 'volunteer',
        content: (userData) => <Volunteer />,
    },
    {
        page: 'projects',
        content: (userData) => <Projects />,
    },
];
  
export const CvSidebarSheet = ({
    open = "false",
    userData,
    }: { open?: string, userData: userDataSchema }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState('experiences');
    const currentPage = pages.find(p => p.page === page)?.content(userData) || pages[0].content(userData);

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                
        <CvSidebarButtons
            onChange={(value) => { setIsOpen(true); setPage(value); }} 
            page={page} 
            isOpen={isOpen} 
            className="fixed right-0 top-[90%] transform origin-top-right"
        />

        <SheetContent className="border-0"  side="right">
        <div className="flex w-full">
            <div className="w-10 relative">
                <CvSidebarButtons 
                    onChange={(value) => { setIsOpen(true); setPage(value); }} 
                    page={page} 
                    isOpen={isOpen} 
                    className="absolute top-[90%] transform origin-top-right" 
                    style={{right: '-1px'}}
                />
            </div>
            <div className="border-l pl-4 pr-1 h-screen overflow-y-scroll w-full bg-background pt-8 pb-4">
            <SheetHeader> 
            {currentPage && currentPage}

            </SheetHeader>
            </div>
        </div>

        </SheetContent>
        </Sheet>
    );
}