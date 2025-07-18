import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Separator} from "@/components/ui/separator";
import {NewExperienceDialog} from "@/components/modules/about/new-experience-dialog";
import {ExperienceSchema} from "@/utils/schemas";


const ExperienceCard = ({ experience }: { experience: ExperienceSchema }) => {

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
                        <Avatar className="size-11 rounded-lg border">
                            {experience.company?.brandId ? (
                              <AvatarImage src={`https://cdn.brandfetch.io/${experience.company?.domain}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`} alt="" />
                            ) : null}
                            <AvatarFallback className="rounded-lg">
                              {experience.company?.name?.slice(0, 2).toUpperCase() || 'CO'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle>{experience.company?.name}</CardTitle>
                            <CardDescription>{experience.location}</CardDescription>
                        </div>
                    </div>
                    <NewExperienceDialog
                        experience={experience}
                    />
                </div>
                <Separator className="!my-2" />
                <CardTitle>{experience.role}</CardTitle>
                {experience.start_period && 
                    <CardDescription>
                        {experience.start_period && formatDate(experience.start_period) }
                        {experience.start_period && " - "}
                        {experience.end_period ? formatDate(experience.end_period) : "Present"}
                </CardDescription>
                }
            </CardHeader>
            <CardContent className="space-y-2">
                {experience.description.map((sentence, index) => (
                    <p key={index}>{sentence}</p>
                ))}
            </CardContent>
        </Card>
    );
};

export default ExperienceCard;


/*

            <CardFooter>
                <div className="flex auto-rows-min gap-2">
                    <Badge variant="outline">Excel</Badge>
                    <Badge variant="outline">MS Office</Badge>
                    <Badge variant="outline">Inventory Planning</Badge>
                    <Badge variant="outline">Excel</Badge>
                </div>
            </CardFooter>

*/