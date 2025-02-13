import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Cloud, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function CvSavingButton({ className, savedStatus }: { className: string; savedStatus: boolean }) {
    const [saved, setSaved] = useState<boolean>(savedStatus);

    useEffect(() => {
        setSaved(savedStatus);
    }, [savedStatus]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className={cn(className, "rounded-2xl")}>
                    {saved ? 
                        <>
                            <Cloud className="size-4 mr-1" />
                            Saved
                        </> 
                    : 
                        <>
                            <LoaderCircle className="animate-spin size-4 mr-1" />
                            Saving
                        </>
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent className="">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                            {saved ? "Saved." : "Saving..."}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {saved ? "Your changes have been saved on the cloud." : "Your changes are being saved on the cloud."}
                        </p>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
