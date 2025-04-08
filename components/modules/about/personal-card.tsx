'use client'
import { useState, useEffect } from "react";
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from '@/utils/supabase/client';
import { downloadImage, getPersonalData, uploadAvatar } from "@/api/about/serverActions";
import { PersonalSchema } from "@/utils/schemas";
import { PersonalDialog } from "./personal-dialog";
import Link from "next/link";

const PersonalCard = ({ personal }: {personal: PersonalSchema}) => {

    const [avatarUrl, setAvatarUrl] = useState<any | null>(null);
    const [uploading, setUploading] = useState(false);
    
    /*useEffect(() => {
        if (personal && personal.avatar) {
            //handleDownloadImage(personal.avatar);
        }
    }, [personal]);*/

    const handleDownloadImage = async (path: string) => { 
        try {
            const url = await downloadImage(path);
            setAvatarUrl(url);
            console.log('Avatar downloaded:', url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    }



    const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const files = event.target.files;
            if (!files || files.length === 0) {
                throw new Error('You must select an image to upload.');
            }
            const file = files[0];
            const filePath = await uploadAvatar(file);
            setAvatarUrl(filePath);
        } catch (error) {
            console.log(error);
            alert('Error uploading avatar!');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Card>
            <div className="flex justify-between p-6 gap-2">
                <div className="w-full relative">
                    <CardTitle className="text-2xl">{personal.name}</CardTitle>
                    <CardDescription className="text-xl mb-2">{personal.title}</CardDescription>
                    <p dangerouslySetInnerHTML={{ __html: (personal.description ? personal.description.replace(/\r\n|\n|\r/g, '<br/>').replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>') : '')}}></p>
                    <PersonalDialog className="absolute top-0 right-0" personal={personal} />
                </div>
                <div className="rounded-lg border bg-card text-card-foreground shadow md:min-w-[320px] p-3 space-y-3">
                    <CardTitle className="text-lg">Contacts</CardTitle>
                    { personal.email &&
                        <div>
                            <CardDescription>Email</CardDescription>
                            <p>{personal.email?.length > 100 ? `${personal.email.substring(0, 90)}...` : personal.email}</p>
                        </div>
                    }
                    { personal.phone &&
                        <div>
                            <CardDescription>Phone</CardDescription>
                            <p>{personal.phone}</p>
                        </div>
                    }
                    { personal.linkedin &&
                        <div>
                            <CardDescription>Linkedin</CardDescription>
                            <Link href={personal.linkedin}>{personal.linkedin}</Link>
                        </div>                    
                    }

                </div>
            </div>
        </Card>
    );
};

export default PersonalCard;


/*

<Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="h-32 w-32 rounded-lg cursor-pointer">
                                <AvatarImage src={avatarUrl} alt="Avatar" />
                                <img src={avatarUrl} alt="" />
                                {avatarUrl}
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-4">
                            <CardTitle className="mb-5">Upload new avatar</CardTitle>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleUploadAvatar}
                                disabled={uploading}
                            />
                            <Button className="mt-2 w-full" disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Upload'}
                            </Button>
                        </PopoverContent>
                    </Popover>

                    */