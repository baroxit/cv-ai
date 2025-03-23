"use client";

import A4PageSkeleton from "@/components/a4page-skeleton";
import {SidebarInset, SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import A4page from "@/components/a4page";
import { getCv, updateCv } from "@/api/cv/serverActions";
import { getUserData } from "@/api/about/serverActions";

import CvPageContent from "@/components/modules/cv/cv-page-content";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { userDataSchema } from "@/utils/schemas";
import { CvSavingButton } from "@/components/modules/cv/saving-button";
import { useRouter } from "next/navigation";
import CvControls from "@/components/modules/cv/controls";
import { Laptop2, Plus, TreePalm, Laptop } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
    const { id } = useParams();
    const isMobile = useIsMobile();

    const [userData, setUserData] = useState<userDataSchema>();  
    const [cv, setCv] = useState<any>();
    const [saving, setSaving] = useState<boolean>(false);

    async function fetchData() {
        const userData = await getUserData();
        const cv = await getCv(id as string);
        setUserData(userData);
        setCv(cv);
    }

    useEffect(() => {
        fetchData();
    }, [id]);

    if (isMobile) {
        return (
            <Card className="px-3 max-w-md py-4 text-center mx-auto mt-14 h-fit">
                <CardHeader className="space-y-3"> 
                    <div className="border p-3 mb-1.5 rounded-xl w-fit mx-auto">
                        <Laptop2 size={32} strokeWidth={1.3} className="opacity-70" />
                    </div>
                    <CardTitle>Desktop Only Feature</CardTitle>
                    <CardDescription className="text-balance pb-2">The CV editor is currently only available on desktop devices for the best editing experience. Please access this feature from a desktop computer.</CardDescription>
                </CardHeader>
            </Card>
        );
    }

    if (userData && cv) {
         return <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4 w-full justify-between">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink asChild>
                                            <Link href="/dashboard/cv">
                                                CVs
                                            </Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{cv.title}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <CvControls userData={userData} cv={cv} />
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 pt-0">
                    <CvSavingButton savedStatus={!saving} className={"fixed bottom-3 z-10 ml-3"} />
                    <A4page>
                        <CvPageContent
                            userData={userData}
                            cv={cv}
                            updateData={(cv) => setCv(cv)}
                            onChangeSaving={setSaving}
                        />                        
                    </A4page>
                </div>
            </SidebarInset>
    } else {
        return (<A4PageSkeleton />)
    }
};

