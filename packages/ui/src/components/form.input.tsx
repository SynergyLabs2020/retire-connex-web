import React from 'react';

import { Label } from '@radix-ui/react-label';

// @ts-ignore
import { Input } from './input';

interface FormInputProps {
    children?: React.ReactNode;
    label: string;
    placeholder: string;
    type: string;
    register: any;
}

function FormInput({ children, label, placeholder, type, register }: FormInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={label} className="text-md font-medium">
                {label}
            </Label>
            <div className="relative">
                <Input
                    id={label}
                    type={type}
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
