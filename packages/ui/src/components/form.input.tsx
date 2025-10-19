import React from 'react';

import { Label } from '@radix-ui/react-label';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';

interface FormInputProps {
    children?: React.ReactNode;
    label?: string;
    placeholder?: string;
    type: string;
    register?: any;
    value?: string;
    readonly?: boolean;
}

function FormInput({
    children,
    label,
    placeholder,
    type,
    register,
    readonly,
    value,
}: FormInputProps) {
    if (type === 'textarea') {
        return (
            <div className="space-y-2">
                <Label htmlFor={label} className="text-md font-medium text-left">
                    {label}
                </Label>
                <div>
                    <Textarea
                        placeholder={placeholder}
                        className="!bg-accent mt-2 min-h-[120px] max-h-[200px]"
                        {...register}
                    />
                </div>
            </div>
        );
    }

    if (type === 'drill') {
        return (
            <div className="space-y-2">
                <Label htmlFor={label} className="text-md font-medium text-left">
                    {label}
                </Label>
                <div className="relative">{children}</div>
            </div>
        );
    }

    if (type === 'checkbox-agreement') {
        return (
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <Input
                        id="checkbox-input"
                        type="checkbox"
                        className="checkbox-round"
                        {...register}
                    />
                    <Label
                        htmlFor="checkbox-input"
                        className="text-md font-medium text-muted-foreground"
                    >
                        I agree with the{' '}
                        <a href="" className="text-destructive">
                            Privacy Policy
                        </a>{' '}
                        and{' '}
                        <a href="" className="text-destructive">
                            Terms & Conditions
                        </a>
                    </Label>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 items-start">
            <Label htmlFor={label} className="text-md font-medium">
                {label}
            </Label>
            <div className="relative w-full">
                <Input
                    id={label}
                    readOnly={readonly}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    autoComplete="new-password"
                    {...register}
                />
                {children}
            </div>
        </div>
    );
}

export { FormInput };
