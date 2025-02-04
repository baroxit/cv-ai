import React, { ReactNode, useEffect, useState } from 'react';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuCheckboxItem, ContextMenuLabel, ContextMenuSeparator } from '@/components/ui/context-menu';

interface CvPersonalContextMenuProps {
    children: any;
    onToggleVisibility: (name: string, value: boolean) => void;
}

const CvPersonalContextMenu = ({ children, onToggleVisibility }: CvPersonalContextMenuProps) => {

    return (
        <ContextMenu>
            <ContextMenuTrigger className="w-full">{children}</ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuLabel inset>Contacts</ContextMenuLabel>
                <ContextMenuSeparator />
                {[
                    { key: 'showEmail', label: 'Show Email', value: children.props.personalData.email, checked: children.props.cvPersonalData.showEmail },
                    { key: 'showPhone', label: 'Show Phone', value: children.props.personalData.phone, checked: children.props.cvPersonalData.showPhone },
                    { key: 'showLinkedin', label: 'Show Linkedin', value: children.props.personalData.linkedin, checked: children.props.cvPersonalData.showLinkedin }
                ].map(item => item.value && (
                    <ContextMenuCheckboxItem key={item.key} checked={item.checked} onCheckedChange={(checked) => onToggleVisibility(item.key, checked)}>
                        {item.label}
                    </ContextMenuCheckboxItem>
                ))}
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default CvPersonalContextMenu;