import React from 'react';
import { SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const CvSidebarVolunteer: React.FC = () => {
    return (
        <>
            <SheetTitle>Volunteer</SheetTitle>
            <SheetDescription>
                This section will contain your volunteer experiences.
            </SheetDescription>
            <Card className="max-w-[350px] mt-6 text-center mx-auto">
                <CardHeader>
                <CardTitle>Volunteer</CardTitle>
                <CardDescription><p className="mb-2">I am still working on this area.</p> <a href="" className="underline">Do you want to contribute?</a></CardDescription>
                </CardHeader>
            </Card>
        </>
    );
};

export default CvSidebarVolunteer;