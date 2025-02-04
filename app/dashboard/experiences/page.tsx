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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ExperienceCard from "@/components/experience-card";
import {ArrowDownCircle, Plus, RefreshCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {NewExperienceDialog} from "@/components/new-experience-dialog";
import { createClient } from '@/utils/supabase/server';
import AboutMeCard from "@/components/personal-card";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {NewEducationDialog} from "@/components/new-education-dialog";
import EducationCard from "@/components/education-card";
export default async function Page() {
  const supabase = await createClient();

  const { data: experiences } = await supabase.from("experiences").select().order('id', { ascending: false });;
  const { data: education_experiences } = await supabase.from("education").select().order('id', { ascending: false });;



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
                  <BreadcrumbPage>About You</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          
          <Tabs defaultValue="work-experiences">
            <div className="text-center mb-4">
              <TabsList className="space-x-4">
                <TabsTrigger value="work-experiences">Work Experiences</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="languages">Languages</TabsTrigger>
                <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="work-experiences">

              <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                {experiences.map((experience) => (
                    <ExperienceCard
                        experience={experience}
                    />
                ))}
                <Card className="flex flex-col justify-center items-center text-center">
                  <CardHeader>
                    <CardTitle>Add a new experience</CardTitle>
                    <CardDescription>Share your work and learning experiences to highlight your skills.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NewExperienceDialog />
                  </CardContent>
                </Card>
              </div>


            </TabsContent>

            <TabsContent value="education">
              <div className="grid auto-rows-min gap-4 md:grid-cols-2">

                {education_experiences.map((education_experience) => (
                    <EducationCard
                        education={education_experience}
                    />
                ))}

                <Card className="flex flex-col justify-center items-center text-center">
                  <CardHeader>
                    <CardTitle>Add a new experience</CardTitle>
                    <CardDescription>Share your work and learning experiences to highlight your skills.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NewEducationDialog />
                  </CardContent>
                </Card>
              </div>

            </TabsContent>

            <TabsContent value="projects">

              <Card className="max-w-[350px] mt-6 text-center mx-auto">
                <CardHeader>
                  <CardTitle>Projects</CardTitle>
                  <CardDescription><p className="mb-2">I'm still working on this area.</p> <a href="" className="underline">Do you want to contribute?</a></CardDescription>
                </CardHeader>
              </Card>

            </TabsContent>

            <TabsContent value="languages">

              <Card className="max-w-[350px] mt-6 text-center mx-auto">
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                  <CardDescription><p className="mb-2">I'm still working on this area.</p> <a href="" className="underline">Do you want to contribute?</a></CardDescription>
                </CardHeader>
              </Card>

            </TabsContent>

            <TabsContent value="volunteer">

              <Card className="max-w-[350px] mt-6 text-center mx-auto">
                <CardHeader>
                  <CardTitle>Volunteer</CardTitle>
                  <CardDescription><p className="mb-2">I'm still working on this area.</p> <a href="" className="underline">Do you want to contribute?</a></CardDescription>
                </CardHeader>
              </Card>

            </TabsContent>
          </Tabs>


        </div>
      </SidebarInset>
  )
}

/*
<div className="flex items-center space-x-2">
            <Button variant="outline">
              <RefreshCcw /> Refresh data
            </Button>
            <NewExperienceDialog />
          </div>

 */