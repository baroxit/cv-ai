"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Pencil, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { MonthYearPicker } from "@/components/month-year-picker";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";

import { DeleteButtonWithAlert } from "@/components/delete-button-with-alert";  // Modify this to the appropriate path for delete button

import { createEducation, deleteEducation } from "@/app/dashboard/experiences/actions";  // Modify this to the appropriate function for education
import { useState } from "react";
import { start } from "repl";

const formSchema = z.object({
    id: z.number().optional(),
    school: z.string().min(1, { message: "School name is required" }),
    degree: z.string().min(1, { message: "Degree is required" }),
    start_period: z.date().optional(),
    end_period: z.date().optional(),
    field_of_study: z.string().min(1, { message: "Field of study is required" }),
    location: z.string().nullable(),
    description: z.string().optional(),
    grade: z.string().nullable(),
    max_grade: z.string().nullable(),
})

export function NewEducationDialog({ education = null }: { education?: any }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            school: education?.school || "",
            degree: education?.degree || "",
            field_of_study: education?.field_of_study || "",
            start_period: education?.start_period || undefined,
            end_period: education?.end_period || undefined,
            location: education?.location || "",
            description: education?.description || "",
            grade: education?.grade || "",
            max_grade: education?.max_grade || "",
            id: education?.id || undefined,
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        try {
            await createEducation(data)  // Update to handle education data
            setIsDialogOpen(false)
        } catch (error) {
            console.error('Submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const onDelete = async (id: number) => {
        try {
            await deleteEducation(id)  // Update to handle education data
            setIsDialogOpen(false)
        } catch (error) {
            console.error('Submission error:', error)
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>

                {education ? (
                    <Button variant="outline" className="bg-card" size="icon">
                        <Pencil />
                    </Button>
                ) : (
                    <Button>
                        <Plus /> New Education
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <DialogHeader>
                            <DialogTitle>{education ? 'Edit Education' : 'New Education'}</DialogTitle>
                            <DialogDescription>
                                {education ? 'Edit information about the education experience.' : 'Add information about the new education experience.'}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="school"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>School</FormLabel>
                                        <FormControl>
                                            <Input placeholder="School name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="degree"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Degree</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Degree" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <FormLabel>Start Period</FormLabel>
                                <MonthYearPicker control={form.control} name="start_period" />
                            </div>

                            <div className="space-y-1">
                                <FormLabel>End Period</FormLabel>
                                <MonthYearPicker control={form.control} name="end_period" />
                            </div>
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="field_of_study"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Field of Study</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Field of study" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="City, Country" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                        <FormField
                                control={form.control}
                                name="grade"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Grade</FormLabel>
                                        <FormControl>
                                            <Input placeholder="108" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        <FormField
                                control={form.control}
                                name="max_grade"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Max Grade</FormLabel>
                                        <FormControl>
                                            <Input placeholder="110" {...field} value={field.value ?? ""} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="min-h-[220px]" placeholder="Describe your education experience" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            {education && (
                                <DeleteButtonWithAlert onDelete={() => onDelete(education.id)} />
                            )}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : (education ? 'Edit' : 'Create')}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
