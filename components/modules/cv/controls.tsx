import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils";
import { Check, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"


const CvControls = ({ className, scale = 50, saving, onScaleChange }: { className?: string, scale: number, saving: boolean, onScaleChange: (newScale: number) => void }) => {
    const [sav, setSav] = useState<boolean>(saving);

    useEffect(() => {
        setSav(saving);
    }, [saving])
    
    return (
        <div className={className}>
            <Menubar className="divide-x">
            <MenubarMenu>
                <MenubarTrigger className="">
                    { sav ? (
                        <>
                            <LoaderCircle className="animate-spin size-4 mr-2" />
                            Saving
                        </>
                    ) : (
                        <>
                            <Check className="size-4 mr-2"/>
                            Saved
                        </>
                    )}
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem disabled>{ sav ? "Your changes will be saved soon" : "Your changes have been saved"}</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                
                <MenubarTrigger>Download</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>Download PDF</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Share</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            </Menubar>

            
        </div>
    )

}
export default CvControls;

/*
Zoom to implement 

    <div className="space-y-1">
        <Label>Zoom</Label>
        <Slider className="w-36 pb-2" defaultValue={[scale]} max={100} step={1} onValueChange={(value) => onScaleChange(value[0])}/>
    </div>

*/