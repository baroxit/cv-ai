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
import {NewExperienceDialog} from "@/components/modules/about/new-experience-dialog";
import {EducationSchema, ExperienceSchema} from "@/utils/schemas";
import {NewEducationDialog} from "@/components/modules/about/new-education-dialog";


const EducationCard = ({ education }: { education: EducationSchema }) => {

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
                    <NewEducationDialog education={education} />
                </div>
                <Separator className="!my-2" />
                <div className="flex items-center justify-between gap-8">
                    <div>
                        <CardTitle>{education.degree} - {education.field_of_study}</CardTitle>
                        <CardDescription>
                            { education.start_period && formatDate(education.start_period) }
                            {" - "}
                            { education.end_period && formatDate(education.end_period) } 
                        </CardDescription>
                    </div>
                    { education.grade &&
                    <div className="text-center -mt-3">
                        <CardDescription>Grade</CardDescription>
                        <CardTitle>
                            { education.grade }
                            { education.max_grade && "/" }
                            { education.max_grade }
                        </CardTitle>
                    </div>
                    }
                    
                </div>
                
            </CardHeader>
            <CardContent>
                <p>{education.description}</p>
            </CardContent>
        </Card>
    );
};

export default EducationCard;
