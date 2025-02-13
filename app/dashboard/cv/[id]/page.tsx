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
import { CvSidebarSheet } from "@/components/modules/cv/sidebar/sheet";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { userDataSchema } from "@/utils/schemas";
import { CvSavingButton } from "@/components/modules/cv/saving-button";
import { useRouter } from "next/navigation";
import PDFGenerator from "@/components/modules/pdf/document";

export default function Page() {
    const { id } = useParams();
    const router = useRouter();

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

    if (!userData && !cv) {
        return (<A4PageSkeleton />)
    } else {
        return (
            <SidebarInset>
                <CvSidebarSheet open="false" userData={userData} />
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4 w-full">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        CVs
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{cv.title}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <PDFGenerator userData={userData} cv={cv} />
                    </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 pt-0">
                    <CvSavingButton savedStatus={!saving} className={"fixed bottom-3 z-10 ml-3"} />
                    <A4page>
                        <CvPageContent
                            userData={userData}
                            cv={cv}
                            onChangeSaving={setSaving}
                        />                        
                    </A4page>
                </div>
            </SidebarInset>
        );
    }
};

