"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {useEffect, useState} from "react";
import { Checkbox } from "@/components/ui/checkbox";

const months = [
    { label: "January", value: '0' },
    { label: "February", value: '1' },
    { label: "March", value: '2' },
    { label: "April", value: '3' },
    { label: "May", value: '4' },
    { label: "June", value: '5' },
    { label: "July", value: '6' },
    { label: "August", value: '7' },
    { label: "September", value: '8' },
    { label: "October", value: '9' },
    { label: "November", value: '10' },
    { label: "December", value: '11' },
];


export function MonthYearPicker({ control, name, currentlyWorkingLabel }: { control: any; name: string, currentlyWorkingLabel?: string }) {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {

                console.log(field.value)

                const initialDate = field && field.value ? new Date(field.value) : new Date();
                const [month, setMonth] = useState(initialDate.getMonth().toString());
                const [year, setYear] = useState(initialDate.getFullYear().toString());
                // Derive currentlyWorking directly from field.value to avoid loops
                const currentlyWorking = !!currentlyWorkingLabel && (field.value === null || field.value === undefined);

                useEffect(() => {
                    if (currentlyWorking) {
                        field.onChange(null);
                    } else if (month && year) {
                        const date = new Date(Date.UTC(parseInt(year), parseInt(month)))
                        field.onChange(date)
                    }
                }, [month, year]);

                return (
                    <div>
                    <div className="grid grid-cols-2 gap-3">
                        <FormItem>
                                <FormControl>
                                    <Select
                                        disabled={currentlyWorking}
                                        onValueChange={(value) => setMonth(value)}
                                        value={month}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {months.map((month) => (
                                                <SelectItem key={month.value} value={month.value}>
                                                    {month.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                        </FormItem>
                        <FormItem>
                                <FormControl>
                                    <Select
                                        disabled={currentlyWorking}
                                        onValueChange={(value) => setYear(value)}
                                        value={year}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select month" />
                                        </SelectTrigger>
                                        <SelectContent>
                                        {[...Array(45)].map((_, i) => {
                                            const year = new Date().getFullYear() - i;
                                            return (
                                                <SelectItem key={year} value={year.toString()}>
                                                    {year}
                                                </SelectItem>
                                            );
                                        })}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                        </FormItem>
                        </div>
                        {currentlyWorkingLabel && (
                            <FormItem className="flex items-center gap-2 pt-1.5 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={currentlyWorking}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                field.onChange(null);
                                            } else {
                                                const date = new Date(Date.UTC(parseInt(year), parseInt(month)));
                                                field.onChange(date);
                                            }
                                        }}
                                        id="currentlyWorking"
                                    />
                                </FormControl>
                                <FormLabel htmlFor="currentlyWorking">{currentlyWorkingLabel}</FormLabel>
                            </FormItem>
                        )}
                    </div>
                );
            }}
        />
    );
}
