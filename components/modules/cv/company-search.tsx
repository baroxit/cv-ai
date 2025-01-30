import React, { useState, useEffect, useCallback } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Avatar,
    AvatarImage
} from "@/components/ui/avatar";

interface Company {
    name: string;
    domain: string;
    icon?: string;
}

interface CompanySearchComboboxProps {
    onChange: (company: string) => void;
    label?: string;
}

const CvCompanySearch: React.FC<CompanySearchComboboxProps> = ({
    onChange,
    label = ""
}) => {
    const [open, setOpen] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [results, setResults] = useState<Company[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState<Company | null>(null);

    const fetchCompanies = useCallback(async (query: string) => {
        if (!query) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.brandfetch.io/v2/search/${query}?c=${process.env.NEXT_PUBLIC_BRANDFETCH_API_KEY}`,
                { method: 'GET' }
            );
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const data = await response.json();
            setResults(data);
        } catch (error) {
            console.error('Error fetching companies:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchInput) {
                fetchCompanies(searchInput);
            }
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchInput, fetchCompanies]);

    const handleCompanySelect = (company: Company) => {
        setValue(company);
        onChange(company.name);
        setOpen(false);
    };

    const handleManualAdd = () => {
        const newCompany: Company = {
            name: searchInput,
            domain: searchInput.toLowerCase().replace(/\s+/g, '-'),
        };
        handleCompanySelect(newCompany);
    };

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {label}
                </label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "w-full space-y-1.5 px-5 py-9 justify-between",
                            !value?.name && "text-muted-foreground"
                        )}
                    >
                        {value?.name ? (
                            <div className="flex items-center gap-4 text-left">
                                {value.icon && (
                                    <Avatar className="h-11 w-11 rounded-lg">
                                        <AvatarImage src={value.icon} alt={value.name} />
                                    </Avatar>
                                )}
                                <div>
                                    <div className="font-semibold leading-none tracking-tight">{value.name}</div>
                                    <div className="text-sm text-muted-foreground">{value.domain}</div>
                                </div>
                            </div>
                        ) : (
                            "Select a company"
                        )}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                        <CommandInput
                            placeholder="Search company domain..."
                            className="h-9"
                            value={searchInput}
                            onValueChange={setSearchInput}
                        />
                        <CommandList>
                            {isLoading ? (
                                <CommandItem disabled>Loading...</CommandItem>
                            ) : results.length > 0 ? (
                                <>
                                <CommandGroup>
                                    {results.map((result) => (
                                        <CommandItem
                                            key={result.domain}
                                            value={result.domain}
                                            onSelect={() => handleCompanySelect(result)}
                                        >
                                            <div className="flex space-x-3 items-center">
                                                {result.icon && (
                                                    <Avatar className="h-9 w-9 rounded-lg">
                                                        <AvatarImage src={result.icon} alt={result.name} />
                                                    </Avatar>
                                                )}
                                                <div>
                                                    <div className="mb-[-3px]">{result.name}</div>
                                                    <span className="text-muted-foreground">{result.domain}</span>
                                                </div>
                                            </div>
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    result.domain === value?.domain ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                   
                                </CommandGroup>
                                 <div
                                 className="hover:bg-card"
                                 onClick={handleManualAdd}
                                    >
                                    <div className="p-1.5 items-center text-sm text-muted-foreground w-full border-t bg-card text-card-foreground shadow">
                                        <div className="text-center">
                                            Not your company in the list? <br /> 
                                            <span className="underline">Add it manually</span>
                                        </div>
                                    </div>
                                </div>
                                </>
                            ) : (
                                <CommandEmpty>No companies found.</CommandEmpty>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default CvCompanySearch;