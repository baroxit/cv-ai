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
import { PlaneLanding, Plus, Satellite, TreePalm } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function LoadingFallback() {
    return (
        <div className="max-w-6xl w-full mx-auto p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-[325px] w-full bg-card" />
                ))}
            </div>
        </div>
    );
}

async function CvListContent() {
    const supabase = await createClient();
    const { data: items } = await supabase.from("cvs").select("id, title, company_name, job_role").order('created_at', { ascending: false });

    return (
        <div className="max-w-6xl w-full mx-auto p-4">
            {items && items.length > 0 ? 
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {items && items.map((item) => (
                        <CvListCard key={item.id} id={item.id} title={item.title} jobRole={item.job_role} />
                    ))}
                </div>
                :
                <Card className="px-24 py-8 text-center">
                    <CardHeader className="space-y-3"> 
                        <div className="border p-3 mb-1.5 rounded-xl w-fit mx-auto">
                            <TreePalm size={32} strokeWidth={1.3} className="opacity-70" />
                        </div>
                        <CardTitle>No CVs</CardTitle>
                        <CardDescription>Ready for your next job?</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Link href="/dashboard/cv/create/company" className="ml-auto">
                            <Button>
                                Create CV
                                <Plus />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            }
        </div>
    );
}

export default function Page() {
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

            <Suspense fallback={<LoadingFallback />}>
                <CvListContent />
            </Suspense>
        </SidebarInset>
    )
}
