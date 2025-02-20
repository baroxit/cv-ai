import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import React from 'react';
import {ArrowDown, ArrowUp, Eye, EyeClosed, X} from "lucide-react";
import { useEffect, useState } from 'react';

interface CvContextMenuProps {
    onMoveUp: () => void;
    onMoveDown?: () => void;
    onDelete?: () => void;
    onToggleGrade?: (show: boolean) => void;
    children: React.ReactNode;
}

const CvContextMenu: React.FC<CvContextMenuProps> = ({ onMoveUp, onMoveDown, onDelete, onToggleGrade, children }) => {

    const [child, setChild] = useState(children);

    useEffect(() => {
        setChild(children);
    }, [children]);

    return (
        <ContextMenu>
            <ContextMenuTrigger className="w-full">{children}</ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem onClick={onMoveUp} disabled={!onMoveUp}>
                    <ArrowUp className="mr-2 size-5"/>
                    Move Up
                </ContextMenuItem>
                <ContextMenuItem onClick={onMoveDown} disabled={!onMoveDown}>
                    <ArrowDown className="mr-2 size-5"/>
                    Move Down
                </ContextMenuItem>
                <ContextMenuItem onClick={onDelete}>
                    <X className="mr-2 size-5"/>
                    Delete
                </ContextMenuItem>
                {React.isValidElement(children) && (children as React.ReactElement<{ education: { grade: boolean, showGrade: boolean } }>).props.education && (children as React.ReactElement<{ education: { grade: boolean, showGrade: boolean } }>).props.education.grade && (
                    <>
                        {(children as React.ReactElement<{ education: { grade: boolean, showGrade: boolean } }>).props.education.showGrade ? (
                            <ContextMenuItem onClick={() => onToggleGrade && onToggleGrade(false)}>
                                <EyeClosed className="mr-2 size-5"/>
                                Hide Grade
                            </ContextMenuItem>
                        ) : (
                            <ContextMenuItem onClick={() => onToggleGrade && onToggleGrade(true)}>
                                <Eye className="mr-2 size-5"/>
                                Show Grade
                            </ContextMenuItem>
                        )}
                    </>
                )}
            </ContextMenuContent>
        </ContextMenu>
    );
};


export default CvContextMenu;
