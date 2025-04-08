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

import { useState } from "react";
import { PersonalSchema } from "@/utils/schemas";
import { Textarea } from "@/components/ui/textarea";
import { updatePersonal } from "@/api/about/serverActions";

const formSchema = z.object({
    id: z.number(),
    name: z.string().min(1, { message: "Name is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    avatar: z.any().nullable(),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().nullable(),
    linkedin: z.string().nullable(),
    description: z.string().nullable(),
})

export function PersonalDialog({ personal, className }: { personal: PersonalSchema, className?: string }) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: personal.id || undefined,
            name: personal.name || "",
            avatar: "",
            title: personal.title || "",
            email: personal.email || "",
            phone: personal.phone || "",
            linkedin: personal.linkedin || "",
            description: personal.description || "",
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true)
        try {
            await updatePersonal(data)
            setIsDialogOpen(false)
        } catch (error) {
            console.error('Submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }


    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild className={className}>
                <Button variant="outline" className="bg-card" size="icon">
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <DialogHeader>
                            <DialogTitle>Edit Personal Info</DialogTitle>
                            <DialogDescription>
                                Edit your personal information.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="md:grid md:grid-cols-2 md:gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="space-y-1">
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Product Engineer" {...field} value={field.value ?? ''} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your phone number" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                                <FormItem className="space-y-1">
                                    <FormLabel>Linkedin Profile URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your linkedin profile" {...field} value={field.value ?? ''} />
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
                                    <FormLabel>About you</FormLabel>
                                    <FormControl>
                                        <Textarea className="min-h-[80px]" placeholder="Describe yourself" {...field} value={field.value ?? ''} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        

                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}