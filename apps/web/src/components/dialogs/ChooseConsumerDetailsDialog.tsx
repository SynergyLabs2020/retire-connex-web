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
import { cn } from '@workspace/ui/lib/utils';

import Add from '../icons/Add';
import Tick from '../icons/Tick';

import ConsumerAddSkillsDialog from './ConsumerAddSkillsDialog';

interface DialogProps {
    children: React.ReactNode;
    title: string;
    update: number;
    data: string[];
    objectKey: string;
    set?: (val: any) => any;
    setValue: (key: any, val: any, opts: any) => void;
    getValues: (key: any) => any;
    setUpdate: (val: any) => any;
}

export default function ChooseConsumerDetailsDialog({
    children,
    title,
    update,
    data,
    objectKey,
    setValue,
    getValues,
    setUpdate,
    set,
}: DialogProps) {
    const [values, setValues] = useState(getValues(objectKey));

    const udpateValues = () => {
        setValue(objectKey, values, { shouldValidate: true });
        setUpdate((ev: any) => ev + 1);
    };

    const addValue = (item: string) => {
        if (!values.includes(item)) {
            setValues([...values, item]);
            return;
        }
        setValues(values.filter((i: string) => i !== item));
    };

    const prependValue = (value: string) => {
        set!([value, ...data]);
        addValue(value);
    };

    useEffect(() => {
        setValues(getValues(objectKey));
    }, [update]);

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:w-[400px] max-w-[400px] max-h-2/3">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <div className="flex flex-col gap-4 mt-5 mb-5 max-h-[350px] overflow-y-scroll">
                        {set ? (
                            <ConsumerAddSkillsDialog title="" addValue={prependValue}>
                                <div
                                    className={cn(
                                        'inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                                        'h-12 px-6 py-6 text-lg gap-1',
                                        'bg-accent w-full text-destructive font-semibold'
                                    )}
                                >
                                    <Add className="w-5 h-5" />
                                    Add
                                </div>
                            </ConsumerAddSkillsDialog>
                        ) : (
                            <></>
                        )}
                        {data.map((item: string) => (
                            <Button
                                size="xl"
                                key={item}
                                className="flex justify-between bg-accent text-black rounded-md"
                                onClick={() => addValue(item)}
                            >
                                {item}
                                {values.includes(item) ? (
                                    <Tick className="!w-6 !h-6 text-destructive" />
                                ) : (
                                    ''
                                )}
                            </Button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <DialogClose asChild>
                            <Button variant={'ghost'} size="lg" className="bg-accent rounded-xl">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button size="lg" className="rounded-xl" onClick={udpateValues}>
                                Continue
                            </Button>
                        </DialogClose>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
