import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils";
import { Check, LoaderCircle } from "lucide-react";
import { useState } from "react";


const CvControls = ({ className, scale = 50, saving, onScaleChange }: { className?: string, scale: number, saving: boolean, onScaleChange: (newScale: number) => void }) => {
    const [onSaving, setOnSaving] = useState<boolean>(saving);

    return (
        <div className={cn("flex items-center gap-6", className)}>
            <div className="space-y-1">
                <Label>Zoom</Label>
                <Slider className="w-36 pb-2" defaultValue={[scale]} max={100} step={1} onValueChange={(value) => onScaleChange(value[0])}/>
            </div>
            { saving ? (
                <Button variant="secondary" >
                    <LoaderCircle className="animate-spin" />
                    Saving
                </Button>
            ) : (
                <Button variant="outline" >
                    <Check />
                    Saved
                </Button>
            )}
            
        </div>
    )

}
export default CvControls;