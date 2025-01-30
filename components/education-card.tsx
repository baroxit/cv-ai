import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {ChevronRight, Edit, Pencil} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {NewExperienceDialog} from "@/components/new-experience-dialog";
import {EducationSchema, ExperienceSchema} from "@/utils/schemas";
import {NewEducationDialog} from "@/components/new-education-dialog";


const EducationCard = ({ education }: { education: EducationSchema }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div>
                            <CardTitle>{education.school}</CardTitle>
                            <CardDescription>{education.location}</CardDescription>
                        </div>
                    </div>
                    <NewEducationDialog
                        education={education}
                    />
                </div>
                <Separator className="!my-2" />
                <CardTitle>{education.degree} - {education.field_of_study}</CardTitle>
                <CardDescription>{education.start_date} - {education.end_date}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{education.description}</p>
            </CardContent>
        </Card>
    );
};

export default EducationCard;
