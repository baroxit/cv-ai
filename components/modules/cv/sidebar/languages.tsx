import React from 'react';
import { SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CvSidebarLanguages: React.FC = () => {
    return (
        <>
            <SheetTitle>Languages</SheetTitle>
            <SheetDescription>
                This section contains the languages you speak.
            </SheetDescription>
            <Card className="max-w-[350px] mt-6 text-center mx-auto">
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                  <CardDescription><p className="mb-2">I'm still working on this area.</p> <a href="" className="underline">Do you want to contribute?</a></CardDescription>
                </CardHeader>
              </Card>
        </>
    );
};

export default CvSidebarLanguages;