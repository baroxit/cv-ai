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

    useEffect(() => {
        setEdu(education);
    }, [education]);

    useEffect(() => {
        onChange(edu);
    }, [edu]);

    return (
        <Card className="mb-2">
            <CardHeader className="p-3">
                <div className="flex items-center justify-between divide-x">
                    <div className="flex items-center gap-2 w-3/4">
                        <div className="w-full">
                            <CardTitle className="leading-tight">{edu.degree} - {edu.field_of_study}</CardTitle>
                            <CardDescription>{edu.school}</CardDescription>
                        </div>
                    </div>
                    { edu.showGrade &&
                    <div className="text-center pl-2">
                        <div className="text-sm text-muted-foreground">Grade</div>
                        <span className="font-semibold">{ edu.grade } {edu.max_grade && "/"} {edu.max_grade} </span>
                    </div>
                    }
                </div>
                { edu.description &&
                    <Separator className="!my-2" />
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
                        <div onClick={() => setIsEditingDesc(true)} className="text-sm" dangerouslySetInnerHTML={{ __html: edu.description.replace(/\r\n|\n|\r/g, '<br/>').replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>')}}></div>
                    )}
                </CardContent>
            }
        </Card>
    );
};

export default CvEducationCard;
