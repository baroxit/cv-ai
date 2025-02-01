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
import {ArrowDown, ArrowUp, Eye, EyeClosed, X} from "lucide-react";
import { useEffect, useState } from 'react';

const CvContextMenu = ({ onMoveUp, onMoveDown, onDelete, onToggleGrade, children }) => {

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
                {children && children.props && children.props.education && children.props.education.grade && (
                    <>
                        {children.props.education.showGrade ? (
                            <ContextMenuItem onClick={() => onToggleGrade(false)}>
                                <EyeClosed className="mr-2 size-5"/>
                                Hide Grade
                            </ContextMenuItem>
                        ) : (
                            <ContextMenuItem onClick={() => onToggleGrade(true)}>
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
