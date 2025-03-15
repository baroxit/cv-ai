import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils";
import { Download, Share, Palette, Share2 } from "lucide-react";
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


const CvControls = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <Menubar className="divide-x">
            <MenubarMenu>
                <MenubarTrigger>                        
                    <Download className="mr-2 h-4 w-4" />
                    Download
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        Download PDF
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem disabled>
                        Share
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>
                    <Palette className="mr-2 h-4 w-4" />
                    Theme
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem disabled>We're working to add this feature soon!</MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            </Menubar>
        </div>
    )
}
export default CvControls;
