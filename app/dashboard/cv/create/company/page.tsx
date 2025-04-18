
import { AppSidebar } from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {ArrowDownCircle, Check, Plus, RefreshCcw, Sparkles} from "lucide-react";
import {Button} from "@/components/ui/button";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Label} from "@/components/ui/label";
import {ReactNode, Suspense} from "react";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch"
import { CompanySearchCombobox } from "@/components/company-search-combobox"
import { CvForm } from "@/components/modules/cv/form"

function LoadingFallback() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="space-y-4 w-full max-w-3xl px-4">
                <div className="h-8 w-48 animate-pulse rounded-md bg-muted"></div>
                <div className="space-y-3">
                    <div className="h-12 animate-pulse rounded-md bg-muted"></div>
                    <div className="h-12 animate-pulse rounded-md bg-muted"></div>
                    <div className="h-12 animate-pulse rounded-md bg-muted"></div>
                </div>
            </div>
        </div>
    );
}

export default async function Page() {


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
                                    Create CV
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Company & Role</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>

            <Suspense fallback={<LoadingFallback />}>
                <CvForm />
            </Suspense>

        </SidebarInset>
    )
}
