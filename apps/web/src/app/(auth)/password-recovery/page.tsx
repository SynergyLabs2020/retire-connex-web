'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { FormInput } from '@workspace/ui/components/form.input';
import z from 'zod';

import AuthHeader from '@/components/AuthHeader';

const recoverySchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type LoginFormData = z.infer<typeof recoverySchema>;

export default function PasswordRecoveryPage() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(recoverySchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data: LoginFormData) => {
        console.log('Form data submitted:', data);
        await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return (
        <div>
            <AuthHeader
                heading="Forgot password?"
                description="Pop in your email, and we’ll send you a reset link faster than you can say “password recovery”!"
            />
            <div className="w-full max-w-[400px]">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 mt-10 w-full"
                >
                    <FormInput
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        register={register('email')}
                    />
                    <Button
                        size="lg"
                        type="submit"
                        className="mt-3 cursor-pointer w-full text-white font-semibold"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Sending Link...' : 'Send Link'}
                    </Button>
                </form>
            </div>
        </div>
    );
}
