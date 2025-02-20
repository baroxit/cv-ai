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

import { DeleteButtonWithAlert } from "@/components/delete-button-with-alert";

import { createExperience, deleteExperience } from "@/app/dashboard/experiences/actions";
import { useState } from "react";
import {CompanySearchCombobox} from "@/components/company-search-combobox";
import {Label} from "@radix-ui/react-menu";

const formSchema = z.object({
    id: z.number().optional(),
    company: z.object({
        name: z.string().min(1, { message: "Company name is required" }),
        domain: z.string().min(1, { message: "Company domain is required" }),
        brandId: z.string().optional(),
    }).refine((val) => val.name && val.domain, {
        message: "Invalid company selection"
    }),
    location: z.string().nullable(),
    role: z.string().min(2, {
        message: "Role must be at least 2 characters.",
    }),
    description: z.string().min(20, {
        message: "Experience description must be at least 20 characters.",
    }),
})

export function NewExperienceDialog({ experience = null }: { experience?: any }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: experience?.company || { name: "", domain: "", brandId: undefined},
            id: experience?.id || undefined,
            role: experience?.role || "",
            description: experience?.description || "",
            location: experience?.location || "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
        setIsSubmitting(true)
        try {
            const formData = new FormData()
            Object.entries(data).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value.toString())
                }
            })
            await createExperience(data)
            setIsDialogOpen(false)
        } catch (error) {
            console.error('Submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const onDelete = async (id: number) => {
            try {
    
                await deleteExperience(id)  // Update to handle education data
                setIsDialogOpen(false)
            } catch (error) {
                console.error('Submission error:', error)
            }
        }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                {experience ? (
                    <Button variant="outline" size="icon">
                        <Pencil />
                    </Button>
                ) : (
                    <Button>
                        <Plus /> New one
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <DialogHeader>
                            <DialogTitle>{experience ? 'Edit experience' : 'New experience'}</DialogTitle>
                            <DialogDescription>
                                {experience ? 'Edit information about the experience.' : 'Add information about the new experience.'}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-2 gap-4">
                            <CompanySearchCombobox
                                control={form.control}
                                name="company"
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

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your role" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea className="min-h-[220px]" placeholder="Describe your responsibilities and achievements" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            {experience && (
                                <DeleteButtonWithAlert onDelete={() => onDelete(experience.id)} />
                            )}
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : (experience ? 'Edit' : 'Create')}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}