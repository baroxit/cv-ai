import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { ReactNode } from "react";

interface CvTooltipProps {
  children: ReactNode;
  content: string;
}

export function CvTooltip({ children, content }: CvTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
            {children}
        </TooltipTrigger>
        <TooltipContent>
            {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
