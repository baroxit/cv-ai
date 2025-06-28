
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sparkles} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { use, useEffect, useState } from "react";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { generateDescription } from "@/api/openai/serverActions";
import { readStreamableValue } from 'ai/rsc';
import { ExperienceSchema } from "@/utils/schemas";
import InputTags from "@/components/ui/input-tags";
import Tags from "@/components/ui/tags";
import CvExperienceAiPopover from "./cv-experience-ai-popover";

const CvExperienceCard = ({ experience, onChange}: { experience: ExperienceSchema, onChange: (data: ExperienceSchema) => void}) => {
    const [exp, setExp] = useState<ExperienceSchema>(experience);

    const [prompt, setPrompt] = useState<string>("");
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const formatDate = (dateString: Date) => {
        if (!dateString) return ""; // Handle null/undefined case
        
        // First create a new Date object from the string
        const date = new Date(dateString);
        
        // Now we can use toLocaleDateString
        return date.toLocaleDateString('en-US', { 
            month: 'short',
            year: 'numeric'
        });
    }

    const handleDescriptionChange = (index: number, value: string) => {
        setExp((prevExp) => {
            const updatedDescription = [...prevExp.description];
            updatedDescription[index] = value;
            return { ...prevExp, description: updatedDescription };
        });
    };


    useEffect(() => {
        setExp(experience);
    }, [experience]);

    useEffect(() => {
        onChange(exp);
    }, [exp]);


    return (
        <Card className="mb-2">
            <CardHeader className="p-3 pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-full">
                        {exp.company.brandId &&
                            <Avatar className="size-11 rounded-lg border">
                                <AvatarImage src={`https://cdn.brandfetch.io/${experience.company?.domain}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`} alt="" />
                                <AvatarFallback className="rounded-lg">??</AvatarFallback>
                            </Avatar>
                        }
                        <div className="w-full">
                            {isEditingRole ? (
                                <input
                                    value={exp.role}
                                    onChange={(e) => setExp((prevExp) => ({
                                        ...prevExp,
                                        role: `${e.target.value}`,
                                    }))}
                                    onBlur={() => setIsEditingRole(false)}
                                    autoFocus
                                    className="text-lg font-semibold leading-none tracking-tight bg-muted rounded-md h-[22px] border-none outline-none pl-1 w-full"
                                />
                            ) : ( 
                                <CardTitle onClick={() => setIsEditingRole(true)} className="text-lg font-semibold rounded-md tracking-tight hover:bg-muted h-[24px] pl-1 leading-[24px] w-full"><span className="align-middle inline-block">{exp.role}</span></CardTitle>
                            )}
                                <div className="flex justify-between">
                                    <CardDescription className="text-base pl-1 h-[18px]">{exp.company.name}</CardDescription>
                                    { exp.start_period &&
                                        <CardDescription>
                                            {experience.start_period && formatDate(experience.start_period)}
                                            {" - "}
                                            {experience.end_period && formatDate(experience.end_period)}
                                        </CardDescription>
                                    }
                                </div>
                        </div>
                    </div>
                </div>
                <Separator className="!mt-2" />
            </CardHeader>
            <CardContent className="text-sm px-3 pt-0 pb-2">
                {exp.description.map((sentence: string, index: number) => (
                    <div key={index} className="mb-2">
                        {isEditingDesc === index ? (
                                <AutosizeTextarea
                                    value={sentence}
                                    onChange={(e) =>
                                        handleDescriptionChange(index, e.target.value)
                                    }
                                    onBlur={() => setIsEditingDesc(null)}
                                    className="w-full rounded-md p-2 text-sm"
                                    autoFocus
                                />
                        ) : (
                            <div className="relative group hover:bg-muted rounded">
                                <div
                                    onClick={() => setIsEditingDesc(index)}
                                    className="text-sm cursor-pointer"
                                    dangerouslySetInnerHTML={{
                                        __html: sentence
                                            .replace(/\r\n|\n|\r/g, "<br/>")
                                            .replace(/\*\*(.*?)\*\*/gm, "<strong>$1</strong>"),
                                    }}
                                ></div>
                                <CvExperienceAiPopover className="absolute top-1/2 -translate-y-1/2 right-0 invisible group-hover:visible" description={sentence} replaceDescription={(value: string) => handleDescriptionChange(index, value)} />
                            </div>
                        )}
                    </div>
                ))}
                <InputTags 
                    className="mt-2" 
                    tags={exp.skills}
                    setTags={(tags) => setExp((prevExp) => ({
                                        ...prevExp,
                                        skills: tags,
                                    }))}
                />
            </CardContent>
        </Card>
    );
};

export default CvExperienceCard;

/*                    <CvExperienceAiPopover description={experience.description} replace={(value) => console.log(value)} /> */
