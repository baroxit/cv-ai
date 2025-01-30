import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import ExperienceCard from "@/components/experience-card";
import {ArrowDownCircle, Plus, RefreshCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {NewExperienceDialog} from "@/components/new-experience-dialog";
import { createClient } from '@/utils/supabase/server';
export default async function Page() {
    const supabase = await createClient();


    const { data: items } = await supabase.from("generated_cvs").select();


    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
            <div className="flex items-center justify-between space-y-2 pb-4 px-4">
                <h2 className="text-3xl font-bold tracking-tight">CVs</h2>
                <div className="flex items-center space-x-2">
                    <NewExperienceDialog />
                </div>

            </div>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                { JSON.stringify(items)}
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">

                </div>
            </div>
        </SidebarInset>
    )
}
