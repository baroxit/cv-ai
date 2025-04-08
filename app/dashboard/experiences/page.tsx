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
import { Suspense } from "react"

import ExperienceCard from "@/components/modules/about/experience-card";
import {ArrowDownCircle, Plus, RefreshCcw} from "lucide-react";
import {Button} from "@/components/ui/button";
import {NewExperienceDialog} from "@/components/modules/about/new-experience-dialog";
import { createClient } from '@/utils/supabase/server';
import AboutMeCard from "@/components/modules/about/personal-card";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {NewEducationDialog} from "@/components/modules/about/new-education-dialog";
import EducationCard from "@/components/modules/about/education-card";
import PersonalCard from "@/components/modules/about/personal-card"
import CreateCvCta from "@/components/modules/about/create-cv-cta"
import { Skeleton } from "@/components/ui/skeleton"
import DropzoneCv from "@/components/modules/about/dropzone-cv"

function LoadingFallback() {
  return (
    <div className="max-w-6xl w-full mx-auto p-4 space-y-4">
      <div className="w-full">
        <Skeleton className="h-60 w-full bg-card" />
      </div>
      <div className="space-y-4">
        <div className="flex justify-center">
          <Skeleton className="h-9 w-[450px] bg-card" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 w-full bg-card" />
          ))}
        </div>
      </div>
    </div>
  );
}

async function ExperiencesContent() {
  const supabase = await createClient();

  const { data: experiences } = await supabase.from("experiences").select().order('id', { ascending: false });
  const { data: education_experiences } = await supabase.from("education").select().order('id', { ascending: false });
  const { data: personal } = await supabase.from("personal").select().single();

  return (
    <div className="max-w-6xl w-full mx-auto p-4 space-y-4 relative">
      <PersonalCard
        personal={personal}
      />

      <div className="flex flex-1 flex-col gap-4">          
        <Tabs defaultValue="work-experiences">
          <div className="text-center mb-4">
            <TabsList className="grid md:grid-cols-5 mx-auto text-center">
              <TabsTrigger value="work-experiences">Work Experiences</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="languages">Languages</TabsTrigger>
              <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="work-experiences">
            <div className={`grid auto-rows-min gap-4 ${experiences && experiences?.length > 0 && 'md:grid-cols-2'}`}>
              {experiences && experiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                />
              ))}
              {
                experiences?.length == 0 &&
                <DropzoneCv
                />
              }
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
            <div className={`grid auto-rows-min gap-4 ${education_experiences && education_experiences?.length > 0 && 'md:grid-cols-2'}`}>
              {education_experiences && education_experiences.map((education_experience) => (
                <EducationCard
                  key={education_experience.id}
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
                <CardDescription><p className="mb-2">I am still working on this area.</p> <a href="" className="underline">Do you want to contribute?</a></CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="languages">
            <Card className="max-w-[350px] mt-6 text-center mx-auto">
              <CardHeader>
                <CardTitle>Languages</CardTitle>
                <CardDescription><p className="mb-2">I am still working on this area.</p> <a href="" className="underline">Do you want to contribute?</a></CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="volunteer">
            <Card className="max-w-[350px] mt-6 text-center mx-auto">
              <CardHeader>
                <CardTitle>Volunteer</CardTitle>
                <CardDescription><p className="mb-2">I am still working on this area.</p> <a href="" className="underline">Do you want to contribute?</a></CardDescription>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>About You</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <Suspense fallback={<LoadingFallback />}>
        <ExperiencesContent />
      </Suspense>
    </SidebarInset>
  )
}