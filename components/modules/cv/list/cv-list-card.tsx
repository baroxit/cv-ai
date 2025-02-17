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
import { ArrowUpRight, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation";
import { DeleteButtonWithAlert } from "@/components/delete-button-with-alert"
import { deleteCv } from "@/api/cv/serverActions"



export function CvListCard({id, title, jobRole} : {id: number, title: string, jobRole: string}) {

    const router = useRouter();

    const onDelete = async (id: number) => {
        await deleteCv(id)  // Update to handle education data
    }


  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between">
        <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="text-lg">{jobRole}</CardDescription>
        </div>
      </CardHeader>
      <CardFooter className="flex gap-3">
        <Button className="w-full" onClick={() => router.push(`/dashboard/cv/${id}`)}>
            Open
            <ArrowUpRight />
        </Button>
        <DeleteButtonWithAlert onDelete={() => onDelete(id)} />
      </CardFooter>
    </Card>
  )
}
