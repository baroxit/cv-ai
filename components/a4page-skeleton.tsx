import { Skeleton } from "@/components/ui/skeleton"
import A4Page from "@/components/a4page";
import {SidebarInset, SidebarTrigger} from "@/components/ui/sidebar";
import {Separator} from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";



const A4PageSkeleton = () => {
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
                                    CVs
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <A4Page>
                    <div className="p-4">
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-28 w-28 rounded-full" />
                            <div className="space-y-3">
                                <Skeleton className="h-7 w-[300px]" />
                                <Skeleton className="h-5 w-[250px]" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-5 divide-x gap-5 mt-12">
                            <div className="space-y-8 col-span-3">
                                <div className="space-y-3">
                                    <Skeleton className="h-7 w-3/4" />
                                    <Skeleton className="h-24 w-full" />
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-7 w-3/4" />
                                    <Skeleton className="h-24 w-full" />
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-7 w-3/4" />
                                    <Skeleton className="h-24 w-full" />
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-7 w-3/4" />
                                    <Skeleton className="h-24 w-full" />
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-7 w-3/4" />
                                    <Skeleton className="h-24 w-full" />
                                </div>
                            </div>

                            <div className="space-y-3 col-span-2 pl-4">
                                <div className="space-y-3">
                                    <Skeleton className="h-7 w-3/4" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-7 w-3/4" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                                <div className="space-y-3">
                                    <Skeleton className="h-7 w-3/4" />
                                    <Skeleton className="h-20 w-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </A4Page>
            </div>
        </SidebarInset>

    );
};

const a4PageStyles: React.CSSProperties = {
    width: "210mm", // A4 width
    height: "297mm", // A4 height
    padding: "10mm",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    margin: "auto",
};

export default A4PageSkeleton;
