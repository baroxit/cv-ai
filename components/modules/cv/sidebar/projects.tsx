import React from 'react';
import { SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CvSidebarProjects: React.FC = () => {
    return (
        <>
            <SheetTitle>Projects</SheetTitle>
            <SheetDescription>
                This section contains your side-projects.
            </SheetDescription>
            <Card className="max-w-[350px] mt-8 text-center mx-auto">
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription><p className="mb-2">I'm still working on this area.</p> <a href="" className="underline">Do you want to contribute?</a></CardDescription>
                </CardHeader>
            </Card>
        </>
    );
};

export default CvSidebarProjects;