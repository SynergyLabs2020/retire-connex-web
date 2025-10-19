import React, { useEffect, useState } from 'react';

import { Button } from '@workspace/ui/components/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@workspace/ui/components/dialog';
import { RadioGroup, RadioGroupItem } from '@workspace/ui/components/radio-group';
import { cn } from '@workspace/ui/lib/utils';

interface DialogProps {
    children: React.ReactNode;
    title: string;
    update: number;
    data: string[];
    registeredKey: string;
    setValue: (key: any, val: any, opts: any) => void;
    setUpdate: (val: any) => any;
}

export default function ChooseEmployerIndustryDialog({
    children,
    title,
    update,
    data,
    registeredKey,
    setValue,
    setUpdate,
}: DialogProps) {
    const [industry, setIndustry] = useState('');

    const updateValues = () => {
        setValue(registeredKey, industry, { shouldValidate: true });
        setUpdate((ev: any) => ev + 1);
    };

    useEffect(() => {}, [update]);

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:w-[400px] max-w-[400px] max-h-2/3">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <div className="flex flex-col gap-4 mt-5 mb-5 max-h-[350px] overflow-y-scroll">
                        <RadioGroup>
                            {data.map((item: string) => (
                                <div
                                    key={item}
                                    onClick={() => {
                                        setIndustry(item);
                                    }}
                                    className={cn(
                                        'inline-flex items-center cursor-pointer justify-between whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                                        'h-12 px-6 py-6 text-lg gap-1',
                                        'bg-accent w-full'
                                    )}
                                >
                                    {item}
                                    <RadioGroupItem
                                        className={industry === item ? '!border-destructive' : ''}
                                        checked={industry === item}
                                        value={item}
                                        id={item}
                                    />
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <DialogClose asChild>
                            <Button variant={'ghost'} size="lg" className="bg-accent rounded-xl">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button size="lg" className="rounded-xl" onClick={() => updateValues()}>
                                Submit
                            </Button>
                        </DialogClose>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
