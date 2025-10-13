'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

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
    const [isSent, setIsSent] = useState(true);

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
        setIsSent(true);
    };

    if (isSent) {
        return (
            <div>
                <AuthHeader
                    heading="Verify your email"
                    description="We’ve sent a verification link to your@email.com. Please check your inbox and click the link to confirm your account."
                />
                <Link href={'https://gmail.com'} target="_blank">
                    <Button
                        size="lg"
                        type="submit"
                        className="my-8 cursor-pointer w-full text-white font-semibold"
                    >
                        Open Email App
                    </Button>
                </Link>
                <p className="flex gap-2 text-muted-foreground text-lg items-center justify-center">
                    Didn’t receive the email?
                    <Link
                        href={'/signup'}
                        className="text-destructive underline text-end font-bold"
                    >
                        Click to resend
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <div>
            <AuthHeader
                heading="Forgot password?"
                description="Pop in your email, and we’ll send you a reset link faster than you can say “password recovery”!"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-10 w-full">
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
    );
}
