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
import {Button} from "@/components/ui/button";
import { createClient } from '@/utils/supabase/server';
import { CvListCard } from "@/components/modules/cv/list/cv-list-card";
import { Plus } from "lucide-react";
import Link from "next/link";
export default async function Page() {
    const supabase = await createClient();


    const { data: items } = await supabase.from("cvs").select("id, title, company_name, job_role").order('created_at', { ascending: false });


    return (
        <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
                <div className="flex items-center gap-2 px-4 w-full">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbPage>CVs</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <Link href="/dashboard/cv/create/company" className="ml-auto">
                        <Button>
                            Create CV
                            <Plus />
                        </Button>
                    </Link>
                </div>
            </header>
            <div className="max-w-6xl mx-auto p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {items && items.map((item) => (
                        <CvListCard id={item.id} title={item.title} jobRole={item.job_role} />
                    ))}
                </div>
            </div>
            
        </SidebarInset>
    )
}
