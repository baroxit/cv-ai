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
import { CvPersonalSchema, PersonalSchema } from "@/utils/schemas";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { CvTooltip } from "../cv-tooltip";

const CvPersonalCard = ({ personalData, cvPersonalData, onChange }: {personalData: PersonalSchema, cvPersonalData: CvPersonalSchema, onChange: (data: CvPersonalSchema) => void}) => {

    const [avatarUrl, setAvatarUrl] = useState<any | null>(null);
    const [uploading, setUploading] = useState(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [personal, setPersonal] = useState<PersonalSchema>(personalData);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [cvPersonal, setCvPersonal] = useState<CvPersonalSchema>(cvPersonalData);

    useEffect(() => {
        setCvPersonal(cvPersonalData);
    }, [cvPersonalData]);

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
            <div className="flex justify-between p-2 gap-6">
                <div className="flex gap-6 w-full">
                    { cvPersonal.showAvatar && 
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
                    }
                    <div className="w-full">
                        <CardTitle className="text-2xl">{personal.name}</CardTitle>
                        <div className="w-full mb-2">
                            {isEditingTitle ? (
                                <input
                                    value={cvPersonal.title}
                                    onChange={(e) => onChange({
                                        ...cvPersonal,
                                        title: `${e.target.value}`,
                                    })}
                                    onBlur={() => {
                                        setIsEditingTitle(false)
                                    
                                    }}
                                    autoFocus
                                    className="text-lg rounded-md tracking-tight hover:bg-muted h-[24px] leading-[24px] w-4/5 outline-none"
                                />
                            ) : ( 
                                <CardDescription onClick={() => setIsEditingTitle(true)} className="text-lg rounded-md tracking-tight hover:bg-muted h-[24px] leading-[24px] w-4/5"><span className="align-middle inline-block">{cvPersonal.title}</span></CardDescription>
                            )}
                        </div>
                        {isEditingDesc ? (
                            <AutosizeTextarea
                                value={cvPersonal.description}
                                onChange={(e) => onChange({
                                    ...cvPersonal,
                                    description: `${e.target.value}`,
                                })}
                                onBlur={() => setIsEditingDesc(false)}
                                className="rounded-md p-2 text-sm"
                                autoFocus
                            />
                        ) : ( 
                            <CvTooltip content="Click to edit">
                                <p onClick={() => setIsEditingDesc(true)} className="text-sm" dangerouslySetInnerHTML={{ __html: cvPersonal.description.replace(/\r\n|\n|\r/g, '<br/>').replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')}}></p>
                            </CvTooltip>

                        )}
                    </div>
                </div>
                {(personal.email && cvPersonal.showEmail) || (personal.phone && cvPersonal.showPhone) || (personal.linkedin && cvPersonal.showLinkedin) ? (
                    <CvTooltip content="You can edit contacts in the About section">
                    <div className="rounded-xl border bg-card text-card-foreground shadow min-w-[320px] p-2 px-3 space-y-1">
                        <CardTitle className="text-lg">Contacts</CardTitle>
                        {personal.email && cvPersonal.showEmail && (
                            <div>
                                <CardDescription>Email</CardDescription>
                                <p className="text-base">{personal.email?.length > 100 ? `${personal.email.substring(0, 90)}...` : personal.email}</p>
                            </div>
                        )}
                        {personal.phone && cvPersonal.showPhone && (
                            <div>
                                <CardDescription>Phone</CardDescription>
                                <p className="text-base">{personal.phone}</p>
                            </div>
                        )}
                        {personal.linkedin && cvPersonal.showLinkedin && (
                            <div>
                                <CardDescription>Linkedin</CardDescription>
                                <a className="text-base" href="">{personal.linkedin}</a>
                            </div>
                        )}
                    </div>
                    </CvTooltip>
                ) : null}
            </div>
        </Card>
    );
};

export default CvPersonalCard;
