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

const AboutMeCard = ({ name, title, email, phone, avatar, linkedin, uid }) => {
    const supabase = createClient();
    const [avatarUrl, setAvatarUrl] = useState(avatar);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (avatar) downloadImage(avatar);
    }, [avatar]);


    async function downloadImage(path) {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path);
            if (error) throw error;
            const url = URL.createObjectURL(data);
            setAvatarUrl(url);
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    }

    const uploadAvatar = async (event) => {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filePath = `${uid}-${Math.random()}.${fileExt}`

            const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);
            if (uploadError) throw uploadError;

            setAvatarUrl(filePath);
        } catch (error) {
            console.log(error)
            alert('Error uploading avatar!');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Card>
            <div className="flex justify-between p-6 gap-6">
                <div className="flex gap-6 col-auto">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="h-32 w-32 rounded-lg cursor-pointer">
                                <AvatarImage src={avatarUrl} alt="Avatar" />
                                <AvatarFallback className="rounded-lg text-2xl">GB</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-64 p-4">
                            <CardTitle className="mb-5">Upload new avatar</CardTitle>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={uploadAvatar}
                                disabled={uploading}
                            />
                            <Button className="mt-2 w-full" disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Upload'}
                            </Button>
                        </PopoverContent>
                    </Popover>
                    <div>
                        <CardTitle className="text-2xl">{name}</CardTitle>
                        <CardDescription className="text-xl mb-2">{title}</CardDescription>
                        <p>
                            Sono una persona estremamente curiosa.
                            <br />
                            Ho iniziato il mio percorso da sviluppatore autodidatta a 17 anni, creando soluzioni software per la sanità privata.
                            A 19 anni sono entrato nel team fondatore di Drip, prima startup italiana di fashion subscription, guidandone lo sviluppo tecnologico.
                            <br />
                            Laureato in Ingegneria Gestionale al Politecnico di Milano, proseguo gli studi magistrali tra Milano e la Business School di Stoccolma.
                        </p>
                    </div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow min-w-[320px] p-4 space-y-3">
                    <CardTitle className="text-xl">Contacts</CardTitle>
                    <div>
                        <CardDescription>Email</CardDescription>
                        <p>{email?.length > 100 ? `${email.substring(0, 90)}...` : email}</p>
                    </div>
                    <div>
                        <CardDescription>Phone</CardDescription>
                        <p>{phone}</p>
                    </div>
                    <div>
                        <CardDescription>Linkedin</CardDescription>
                        <a href={linkedin}>{linkedin}</a>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AboutMeCard;
