
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
import { generateDescription } from "@/utils/openai";
import { readStreamableValue } from 'ai/rsc';
import { ExperienceSchema } from "@/utils/schemas";
import InputTags from "@/components/ui/input-tags";
import Tags from "@/components/ui/tags";

const CvExperienceCard = ({ experience, onChange, download = false }: { experience: ExperienceSchema, onChange: (data: ExperienceSchema) => void, download: boolean }) => {
    const [exp, setExp] = useState<ExperienceSchema>(experience);

    const [prompt, setPrompt] = useState<string>("");
    const [isEditingRole, setIsEditingRole] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setExp(experience);
    }, [experience]);

    useEffect(() => {
        onChange(exp);
    }, [exp]);

        

    const handleGenerateDescription = async () => {
        setIsLoading(true);

        const { output } = await generateDescription(prompt, exp.description);

        setExp((prevExp) => ({
            ...prevExp,
            description: '',
        }));

        for await (const delta of readStreamableValue(output)) {
            setExp((prevExp) => ({
                ...prevExp,
                description: `${prevExp.description}${delta}`,
            }));

            setIsLoading(false);
            setPrompt('');
        }


    };


    return (
        <Card className="mb-2">
            <CardHeader className="p-3 pb-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-full">
                        {exp.company.brandId &&
                            <Avatar className="h-11 w-11 rounded-lg">
                                <AvatarImage src={`https://cdn.brandfetch.io/${experience.company?.domain}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`} alt="" />
                                <AvatarFallback className="rounded-lg">DR</AvatarFallback>
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
                                    className="text-lg font-semibold leading-none tracking-tight bg-muted rounded-md h-[22px] border-none outline-none pl-1 w-4/5"
                                />
                            ) : ( 
                                <CardTitle onClick={() => setIsEditingRole(true)} className="text-lg font-semibold rounded-md tracking-tight hover:bg-muted h-[24px] pl-1 leading-[24px] w-4/5"><span className="align-middle inline-block">{exp.role}</span></CardTitle>
                            )}
                                <div className="flex justify-between">
                                    <CardDescription className="text-base pl-1 h-[18px]">{exp.company.name}</CardDescription>
                                    { exp.start_period &&
                                        <CardDescription className="pr-6">{exp.start_period} - {exp.end_period ? exp.end_period : 'Present'}</CardDescription>
                                    }
                                </div>
                        </div>
                    </div>
                    { !download &&
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sparkles />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Rewrite with AI</h4>
                                </div>
                                <div className="grid gap-2">
                                    <div className="grid items-center gap-4">
                                        <Textarea id="prompt" placeholder="Enter a brief description or keywords to generate content..." value={prompt} onChange={(e) => setPrompt(e.target.value)} className="border rounded-md p-2 text-sm min-h-12" />
                                    </div>
                                    <Button onClick={handleGenerateDescription} className="mt-2" disabled={isLoading}>
                                        {isLoading ? "Generating..." : "Generate"}
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    }
                </div>
                <Separator className="!mt-2" />
            </CardHeader>
            <CardContent className="text-sm px-3 pt-0 pb-2">
                {isEditingDesc ? (
                    <AutosizeTextarea
                        value={exp.description}
                        onChange={(e) => setExp((prevExp) => ({
                            ...prevExp,
                            description: `${e.target.value}`,
                        }))}
                        onBlur={() => setIsEditingDesc(false)}
                        className="w-full rounded-md p-2 text-sm"
                        autoFocus
                    />
                ) : ( 
                    <div onClick={() => setIsEditingDesc(true)} className="text-sm" dangerouslySetInnerHTML={{ __html: exp.description.replace(/\r\n|\n|\r/g, '<br/>').replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')}}></div>
                )}
                {download ? 
                    <Tags tags={exp.skills} /> 
                :
                    <InputTags 
                        className="mt-2" 
                        tags={exp.skills}
                        setTags={(tags) => setExp((prevExp) => ({
                                            ...prevExp,
                                            skills: tags,
                                        }))}
                    />
                }
            </CardContent>
        </Card>
    );
};

export default CvExperienceCard;
