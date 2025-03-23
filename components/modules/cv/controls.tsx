import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils";
import { Download, Share, Palette, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { userDataSchema } from "@/utils/schemas";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { PdfDownloadButton } from "../pdf/pdf-download-button";

const CvControls = ({
  className,
  userData,
  cv
}: {
  className?: string;
  userData: userDataSchema,
  cv: any
}) => {
  const [user, setUser] = useState(userData);
  const [cvData, setCvData] = useState(cv);
  
  useEffect(() => {
    setUser(userData);
    setCvData(cv);
    console.log('testPDF')
  }, [userData, cv]);

  return (
    <div className={className}>
      <Menubar className="divide-x">
        <MenubarMenu>
          <MenubarTrigger>
                Download
          </MenubarTrigger>
          <MenubarContent>
            <PdfDownloadButton userData={user} cv={cvData} />
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