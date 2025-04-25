'use client'
import { useState, useEffect } from "react";
import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { CvPersonalSchema, PersonalSchema } from "@/utils/schemas";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { CvTooltip } from "../cv-tooltip";
import { useCurrentUserImage } from "@/hooks/use-current-user-image";
import { Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";

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

    const image = useCurrentUserImage()

    return (
        <Card>
            <div className="flex justify-between p-2 gap-6">
                <div className="flex gap-6 w-full">
                    { image && cvPersonal.showAvatar && 
                        <Avatar className="h-32 w-32 rounded-lg">
                            <AvatarImage src={image} alt="Avatar" />
                        </Avatar>
                    }
                    <div className="w-full">
                        <CardTitle className="text-2xl">{personal.name}</CardTitle>
                        <div className="w-full mb-2">
                            {isEditingTitle ? (
                                <input
                                    value={cvPersonal.title || ''}
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
                                <CardDescription onClick={() => setIsEditingTitle(true)} className="text-lg rounded-md tracking-tight hover:bg-muted h-[24px] leading-[24px] w-4/5"><span className="align-middle inline-block">{cvPersonal.title || ''}</span></CardDescription>
                            )}
                        </div>
                        {isEditingDesc ? (
                            <AutosizeTextarea
                                value={cvPersonal.description || ''}
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
                                <p onClick={() => setIsEditingDesc(true)} className="text-sm w-full min-h-8" dangerouslySetInnerHTML={{ __html: cvPersonal.description && cvPersonal.description.replace(/\r\n|\n|\r/g, '<br/>').replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')}}></p>
                            </CvTooltip>

                        )}
                    </div>
                </div>
                {(personal.email && cvPersonal.showEmail) || (personal.phone && cvPersonal.showPhone) || (personal.linkedin && cvPersonal.showLinkedin) ? (
                    <CvTooltip content="You can edit contacts in the About section">
                    <div className="rounded-xl border bg-card text-card-foreground shadow min-w-[320px] p-2 px-3 space-y-1">
                        <CardTitle className="text-lg">Contacts</CardTitle>
                        {personal.email && cvPersonal.showEmail && (
                            <div className='flex items-center gap-2 truncate'>
                                <Mail className='h-4 w-4 text-muted-foreground' />
                                <p className="text-base">{personal.email?.length > 100 ? `${personal.email.substring(0, 90)}...` : personal.email}</p>
                            </div>
                        )}
                        {personal.phone && cvPersonal.showPhone && (
                            <div className='flex items-center gap-2 truncate'>
                                <Phone className='h-4 w-4 text-muted-foreground' />
                                <p className='break-all'>{personal.phone}</p>
                            </div>
                        )}
                        {personal.linkedin && cvPersonal.showLinkedin && (
                            <div className='flex items-center gap-2 truncate'>
                                <Linkedin className='h-4 w-4 text-muted-foreground' />
                                <Link href={personal.linkedin} target='_blank' className='break-all'>
                                    @
                                    <span className='underline'>
                                        {personal.linkedin.replace('https://www.linkedin.com/in/', '').replace('/', '')}
                                    </span>
                                </Link>
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
