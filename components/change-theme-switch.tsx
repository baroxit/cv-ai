"use client"

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useTheme } from "next-themes";

export function ChangeThemeSwitch() {
    const { theme, setTheme } = useTheme();
    const [darkTheme, setDarkTheme] = useState<boolean>(true);

    const changeTheme = (checked: boolean) => {
        setDarkTheme(checked);
        setTheme(checked ? "dark" : "light");
    };

    return (
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 mt-1.5 shadow-sm">
            <Label>Dark mode</Label>
            <Switch
                checked={darkTheme}
                onCheckedChange={(checked) => changeTheme(checked)}
            />
        </div>
    );
}
