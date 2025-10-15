import React, { useEffect, useState } from 'react';

import { Button } from '@workspace/ui/components/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@workspace/ui/components/dialog';

import Tick from '../icons/Tick';

interface DialogProps {
    children: React.ReactNode;
    title: string;
    update: number;
    setValue: (key: any, val: any, opts: any) => void;
    getValues: (key: any) => any;
    setUpdate: (val: any) => any;
}

export default function ChooseConsumerRoleDialog({
    children,
    title,
    update,
    setValue,
    getValues,
    setUpdate,
}: DialogProps) {
    const [isPaid, setIsPaid] = useState(false);
    const [isVolunteer, setIsVolunteer] = useState(false);

    const updateValues = () => {
        setValue('isPaid', isPaid, { shouldValidate: true });
        setValue('isVolunteer', isVolunteer, { shouldValidate: true });
        setUpdate((ev: any) => ev + 1);
    };

    useEffect(() => {
        setIsPaid(getValues('isPaid'));
        setIsVolunteer(getValues('isVolunteer'));
    }, [update]);

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:w-[350px] max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <div className="flex flex-col gap-4 mt-5 mb-5">
                        <Button
                            size="xl"
                            className="flex justify-between bg-accent text-black rounded-md"
                            onClick={() => {
                                setIsPaid((p: any) => !p);
                            }}
                        >
                            Paid
                            {isPaid ? <Tick className="!w-6 !h-6 text-destructive" /> : ''}
                        </Button>
                        <Button
                            size="xl"
                            className="flex justify-between bg-accent text-black rounded-md"
                            onClick={() => {
                                setIsVolunteer((p: any) => !p);
                            }}
                        >
                            Volunteer
                            {isVolunteer ? <Tick className="!w-6 !h-6 text-destructive" /> : ''}
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <DialogClose asChild>
                            <Button variant={'ghost'} size="lg" className="bg-accent rounded-xl">
                                Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button size="lg" className="rounded-xl" onClick={() => updateValues()}>
                                Continue
                            </Button>
                        </DialogClose>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
