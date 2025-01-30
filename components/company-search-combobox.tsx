import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm, Control, FieldValues, Path } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar"
import {PlusCircle} from "lucide-react";

// Define the company object type
interface Company {
    name: string;
    domain: string;
    icon: string;
    brandId: string
}

interface CompanySearchComboboxProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>
    name: Path<TFieldValues>
}

export function CompanySearchCombobox<TFieldValues extends FieldValues>({
                                                                            control,
                                                                            name,
                                                                        }: CompanySearchComboboxProps<TFieldValues>) {
    const [commandInput, setCommandInput] = useState<string>("");
    const [results, setResults] = useState<Company[]>([])

    useEffect(() => {
        if(commandInput) {
            const options = {method: 'GET'};

            fetch(`https://api.brandfetch.io/v2/search/${commandInput}?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`, options)
                .then(response => response.json())
                .then(response => setResults(response))
                .catch(err => console.error(err));
        }
    }, [commandInput]);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Company</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full h-14 justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value.name != "" ? (
                                        <div className="flex space-x-3 items-center text-left">
                                            {field.value.brandId &&
                                                <Avatar className="h-9 w-9 rounded-lg">
                                                    <AvatarImage src={`https://cdn.brandfetch.io/${field.value.domain}/w/400/h/400?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`} />
                                                </Avatar>
                                            }
                                            <div>
                                                <div className="mb-[-3px]">{field.value.name}</div>
                                                <span className="text-muted-foreground">{field.value.domain}</span>
                                            </div>
                                        </div>
                                    ) : ("Select a company")}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <Command>
                                <CommandInput
                                    placeholder="Search company domain..."
                                    className="h-9"
                                    value={commandInput}
                                    onValueChange={setCommandInput}
                                />
                                <CommandList>
                                    {results && results.length > 0 ? (
                                        <CommandGroup className="w-full">
                                            {results.map((result) => (
                                                <CommandItem
                                                    value={result.domain}
                                                    key={result.domain}
                                                    onSelect={() => {
                                                        field.onChange(result)
                                                    }}
                                                >
                                                    <div className="flex space-x-3 items-center">
                                                        <Avatar className="h-9 w-9 rounded-lg">
                                                            <AvatarImage src={result.icon} />
                                                        </Avatar>
                                                        <div>
                                                            <div className="mb-[-3px]">{result.name}</div>
                                                            <span className="text-muted-foreground">{result.domain}</span>
                                                        </div>
                                                    </div>

                                                    <Check
                                                        className={cn(
                                                            "ml-auto",
                                                            result.domain === field.value?.domain
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            ))}

                                            <CommandItem
                                                className="hover:bg-card"
                                                value={"makeitmoreconfusing" + commandInput + "forthesearchalgorithm"}
                                                onSelect={() => {
                                                    const newCompany = {
                                                        name: commandInput,
                                                        domain: commandInput.toLowerCase().replace(/\s+/g, '-'),
                                                        icon: undefined
                                                    };
                                                    field.onChange(newCompany);
                                                }}
                                            >
                                                <div className="p-1.5 items-center text-sm text-muted-foreground w-full rounded-md border bg-card text-card-foreground shadow">
                                                    <div className="text-center">
                                                        Not your company in the list? <br /> <span className="underline">Add it manually</span>
                                                    </div>
                                                </div>
                                            </CommandItem>
                                        </CommandGroup>
                                    ) : (
                                        <CommandEmpty>No companies found.</CommandEmpty>
                                    )}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
