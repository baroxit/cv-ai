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
import {ArrowDown, ArrowUp, X} from "lucide-react";

const CvContextMenu = ({ onMoveUp, onMoveDown, onDelete, onToggleGrade, children }) => {
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
                {onToggleGrade && (
                    <ContextMenuCheckboxItem checked={children.props.grade} onCheckedChange={(checked) => onToggleGrade(checked)}>
                    Show Grade
                    </ContextMenuCheckboxItem>
                )}
            </ContextMenuContent>
        </ContextMenu>
    );
};


export default CvContextMenu;