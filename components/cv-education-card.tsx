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
import { useState } from "react";
import {AutosizeTextarea} from "@/components/ui/autosize-textarea";
import { generateDescription } from "@/utils/openai";
import { readStreamableValue } from 'ai/rsc';

const CvEducationCard = ({ image, title, institution, location, startDate, endDate, description, grade }) => {


    return (
        <Card>
            <CardHeader className="p-4 py-2 pb-1">
                <div className="flex items-center justify-between divide-x">
                    <div className="flex items-center gap-2 w-3/4">
                        {image &&
                        <Avatar className="h-12 w-12 rounded-lg">
                            <AvatarImage src="" alt="" />
                            <AvatarFallback className="rounded-lg">DR</AvatarFallback>
                        </Avatar>
                        }
                        <div className="w-full">

                            <CardTitle className="leading-tight">{title}</CardTitle>
                            <CardDescription>{institution}</CardDescription>

                        </div>
                    </div>
                    { grade &&
                    <div className="text-center pl-2">
                        <div className="text-sm text-muted-foreground">Grade</div>
                        <span className="font-semibold">{ grade }</span>
                    </div>
                    }
                </div>
                { description &&
                    <Separator className="!my-2" />
                }
            </CardHeader>
            <CardContent className="text-sm px-4 pb-2">
                <div className="text-sm" dangerouslySetInnerHTML={{ __html: description.replace(/\r\n|\n|\r/g, '<br/>') }}></div>
            </CardContent>
        </Card>
    );
};

export default CvEducationCard;
