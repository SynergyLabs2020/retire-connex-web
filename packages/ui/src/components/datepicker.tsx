'use client';

import * as React from 'react';

import { Calendar } from '@workspace/ui/components/calendar';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/popover';

interface CalendarProps {
    label: string;
    children: React.ReactNode;
    v: any;
    onDateChange: (val: any) => void;
}

function formatDate(date: Date | undefined) {
    if (!date) {
        return '';
    }

    return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });
}

export function Calendar28({ label, children, v, onDateChange }: CalendarProps) {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date | undefined>();
    const [month, setMonth] = React.useState<Date | undefined>(date);

    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="text-md font-medium">
                {label}
            </Label>
            <div className="relative flex gap-2 w-full">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger className="w-full">
                        <Input
                            id="date"
                            value={v}
                            placeholder="June 01, 2025"
                            className="pr-10 w-full"
                            readOnly
                        />
                        {children}
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="end"
                        alignOffset={-8}
                        sideOffset={10}
                    >
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(date: any) => {
                                setOpen(false);
                                setDate(date);
                                onDateChange(formatDate(date));
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

export default Calendar28;
