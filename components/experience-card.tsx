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
import {ExperienceSchema} from "@/utils/schemas";
import AddToCvButton from "./modules/cv/sidebar/add-to-cv-button";


const ExperienceCard = ({ experience }: { experience: ExperienceSchema }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-11 w-11 rounded-lg">
                            <AvatarImage src={`https://cdn.brandfetch.io/${experience.company?.domain}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`} alt="" />
                            <AvatarFallback className="rounded-lg">DR</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{experience.company?.name}</CardTitle>
                            <CardDescription>{experience.location}</CardDescription>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <AddToCvButton experience={experience} />
                        <NewExperienceDialog
                            experience={experience}
                        />
                    </div>
                </div>
                <Separator className="!my-2" />
                <CardTitle>{experience.role}</CardTitle>
                <CardDescription>{experience.start_period} - {experience.end_period}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>{experience.description}</p>
            </CardContent>
            <CardFooter>
                <div className="flex auto-rows-min gap-2">
                    <Badge variant="outline">Excel</Badge>
                    <Badge variant="outline">MS Office</Badge>
                    <Badge variant="outline">Inventory Planning</Badge>
                    <Badge variant="outline">Excel</Badge>
                </div>
            </CardFooter>
        </Card>
    );
};

export default ExperienceCard;
