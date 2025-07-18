import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {useEffect, useState} from "react";
import {AutosizeTextarea} from "@/components/ui/autosize-textarea";
import { EducationSchema } from "@/utils/schemas";

const CvEducationCard = ({ education, onChange }: { education: EducationSchema, onChange: (data: EducationSchema) => void }) => {
    const [edu, setEdu] = useState<EducationSchema>(education);

    const [isEditingDesc, setIsEditingDesc] = useState(false);

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

    useEffect(() => {
        setEdu(education);
    }, [education]);

    useEffect(() => {
        onChange(edu);
    }, [edu]);

    return (
        <Card className="mb-2">
            <CardHeader className="p-3">

                <CardTitle className="leading-tight">{edu.degree} - {edu.field_of_study}</CardTitle>

                <div className="flex items-center justify-between divide-x">
                    <div className={!edu.showGrade ? "flex items-center justify-between w-full" : "w-3/4"}>
                        <CardDescription>{edu.school}</CardDescription>
                        { edu.start_period &&
                            <CardDescription>
                                {edu.start_period && formatDate(edu.start_period)}
                                {" - "}
                                {edu.end_period ? formatDate(edu.end_period) : "Present"}
                            </CardDescription>
                        }
                    </div>
                    { edu.showGrade &&
                    <div className="text-center px-4">
                        <div className="text-sm text-muted-foreground">Grade</div>
                        <span className="font-semibold">{ edu.grade } {edu.max_grade && "/"} {edu.max_grade} </span>
                    </div>
                    }
                </div>
                { edu.description &&
                    <Separator className="!mt-2" />
                }
            </CardHeader>
            { edu.description &&
                <CardContent className="text-sm px-4 pb-2">
                    {isEditingDesc ? (
                        <AutosizeTextarea
                            value={edu.description}
                            onChange={(e) => setEdu((prevEdu) => ({
                                ...prevEdu,
                                description: `${e.target.value}`,
                            }))}
                            onBlur={() => setIsEditingDesc(false)}
                            className="w-full rounded-md p-2 text-sm"
                            autoFocus
                        />
                    ) : ( 
                        <div onClick={() => setIsEditingDesc(true)} className="text-sm hover:bg-muted rounded" dangerouslySetInnerHTML={{ __html: edu.description.replace(/\r\n|\n|\r/g, '<br/>').replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')}}></div>
                    )}
                </CardContent>
            }
        </Card>
    );
};

export default CvEducationCard;
