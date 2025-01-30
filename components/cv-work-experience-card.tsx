
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {Pencil, Sparkles} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {useEffect, useState} from "react";
import {AutosizeTextarea} from "@/components/ui/autosize-textarea";
import { generateDescription } from "@/utils/openai";
import { readStreamableValue } from 'ai/rsc';

const CvWorkExperienceCard = ({ profession, image, company, location, startDate, endDate, description }) => {
    const [title, setTitle] = useState<string>(profession);
    const [desc, setDesc] = useState<string>(description);
    const [comp, setComp] = useState<string>(company);
    const [loc, setLoc] = useState<string>(location);
    const [start, setStart] = useState<string>(startDate);
    const [end, setEnd] = useState<string>(endDate);
    const [img, setImg] = useState<string>(image);

    const [prompt, setPrompt] = useState<string>("");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [isEditingComp, setIsEditingComp] = useState(false);
    const [isEditingDesc, setIsEditingDesc] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setTitle(profession);
        setComp(company);
        setDesc(description);
        setLoc(location);
        setStart(startDate);
        setEnd(endDate);
        setImg(image);
    }, [profession, company, location, startDate, endDate, description, image]);

    const handleGenerateDescription = async () => {
        setIsLoading(true);
        const { output } = await generateDescription(prompt, desc);

        setDesc('');
        for await (const delta of readStreamableValue(output)) {
            setDesc(currentGeneration => `${currentGeneration}${delta}`);
        }
        setIsLoading(false);
        setPrompt('');
    };

    function bold(text: string){
        var bold = /\*\*(.*?)\*\*/gm;
        var html = text.replace(bold, '<strong>$1</strong>');            
        return html;
    }



    return (
        <Card>
            <CardHeader className="p-4 py-2 pb-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-3/4">
                        {img &&
                            <Avatar className="h-12 w-12 rounded-lg">
                            <AvatarImage src="" alt="" />
                            <AvatarFallback className="rounded-lg">DR</AvatarFallback>
                        </Avatar>
                        }
                        <div className="w-full">
                            {isEditingTitle ? (
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    onBlur={() => setIsEditingTitle(false)}
                                    autoFocus
                                    className="text-lg font-semibold leading-none tracking-tight bg-muted rounded-lg h-[22px] border-none outline-none pl-1 w-full"
                                />
                            ) : (
                                <CardTitle onClick={() => setIsEditingTitle(true)} className="text-lg font-semibold rounded-lg tracking-tight hover:bg-muted h-[24px] pl-1 leading-[24px] w-full"><span className="align-middle inline-block">{title}</span></CardTitle>
                            )}
                            {isEditingComp ? (
                                <input
                                    value={comp}
                                    onChange={(e) => setComp(e.target.value)}
                                    onBlur={() => setIsEditingComp(false)}
                                    autoFocus
                                    className="text-base text-muted-foreground outline-none h-[18px] border-none pl-1 bg-muted rounded-lg w-full"
                                />
                            ) : (
                                <CardDescription onClick={() => setIsEditingComp(true)} className="text-base pl-1 rounded-lg hover:bg-muted align-middle h-[18px] leading-[18px] w-full">{comp}</CardDescription>
                                )}
                                <CardDescription className="pl-1">{startDate} - {endDate}</CardDescription>
                        </div>
                    </div>
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
                </div>
                <Separator className="!my-2" />
            </CardHeader>
            <CardContent className="text-sm px-4 pb-2">
                {isEditingDesc ? (
                    <AutosizeTextarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        onBlur={() => setIsEditingDesc(false)}
                        className="w-full rounded-md p-2 text-sm"
                        autoFocus
                    />
                ) : ( 
                    <div onClick={() => setIsEditingDesc(true)} className="text-sm" dangerouslySetInnerHTML={{ __html: desc.replace(/\r\n|\n|\r/g, '<br/>').replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')}}></div>
                )}
            </CardContent>
        </Card>
    );
};

export default CvWorkExperienceCard;
