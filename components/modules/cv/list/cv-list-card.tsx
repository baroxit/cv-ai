"use client"


import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ArrowUpRight, Copy, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";
import { DeleteButtonWithAlert } from "@/components/delete-button-with-alert"
import { deleteCv } from "@/api/cv/serverActions"
import A4PageSkeleton from "@/components/a4page-skeleton"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



export function CvListCard({id, title, jobRole} : {id: number, title: string, jobRole: string}) {

    const router = useRouter();

    const onDelete = async (id: number) => {
        await deleteCv(id)  // Update to handle education data
    }


  return (
    <Card className="w-full grid relative content-between">


      <div className="[mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
        <div className="w-2/3 border rounded-md bg-card text-card-foreground shadow mx-auto mt-5 p-3">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-11 rounded-full" />
                  <div className="space-y-1.5 w-full">
                    <Skeleton className="h-3 w-3/4 rounded" />
                    <Skeleton className="h-2 w-4/5 rounded" />
                  </div>
                </div>

                <div className="grid md:grid-cols-5 divide-x gap-3 mt-3">
                    <div className="space-y-3 col-span-3">
                        <div className="space-y-1.5">
                            <Skeleton className="h-3 w-3/4 rounded" />
                            <Skeleton className="h-8 w-full rounded" />
                        </div>
                        <div className="space-y-1.5">
                            <Skeleton className="h-3 w-3/4 rounded" />
                        </div>
                    </div>

                    <div className="space-y-3 col-span-2 pl-2">
                        <div className="space-y-1.5">
                            <Skeleton className="h-3 w-3/4 rounded" />
                            <Skeleton className="h-8 w-full rounded" />
                        </div>
                    </div>
                  </div>
                
        </div>
        <Button size={'icon'} variant={'outline'} className="rounded-full bg-card absolute top-2 right-2" onClick={() => onDelete(id)}>
          <Trash2 />
        </Button>
        
        
      </div>
      <CardHeader className="flex justify-between">
        <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription className="text-md">{jobRole}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex gap-3">
        <Button className="w-full" onClick={() => router.push(`/dashboard/cv/${id}`)}>
            Open
            <ArrowUpRight />
        </Button>
      </CardFooter>
    </Card>
  )
}
