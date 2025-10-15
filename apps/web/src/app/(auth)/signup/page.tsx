'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { FormInput } from '@workspace/ui/components/form.input';
import { z } from 'zod';

import AuthHeader from '@/components/AuthHeader';
import Eye from '@/components/icons/Eye';
import EyeOff from '@/components/icons/EyeOff';
import OAuth from '@/components/OAuth';

const signupSchema = z
    .object({
        firstName: z.string().min(2, { message: 'First name must be at least 2 characters long' }),
        lastName: z.string().min(2, { message: 'Last name must be at least 2 characters long' }),
        email: z.string().email({ message: 'Please enter a valid email address.' }),
        password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
        confirmPassword: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long.' }),
        agreement: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    })
    .refine((data) => data.agreement, {
        message: 'You must accept the terms and conditions.',
        path: ['confirmPassword'],
    });

type LoginFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(signupSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            confirmPassword: '',
            agreement: false,
        },
    });

    const onSubmit = (data: LoginFormData) => {
        console.log('Form data submitted:', data, isValid);
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return (
        <div>
            <AuthHeader heading="Create your account" />
            <div className="w-full max-w-[400px]">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-10">
                    <div className="grid grid-cols-2 gap-5">
                        <FormInput
                            type="text"
                            label="First Name"
                            placeholder="Enter your first name"
                            register={register('firstName')}
                        />
                        <FormInput
                            type="text"
                            label="Last Name"
                            placeholder="Enter your last name"
                            register={register('firstName')}
                        />
                    </div>
                    <FormInput
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        register={register('email')}
                    />
                    <FormInput
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        placeholder="Enter your password"
                        register={register('password')}
                    >
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </FormInput>
                    <FormInput
                        type={showConfirmedPassword ? 'text' : 'password'}
                        label="Confirm Password "
                        placeholder="Re-enter your password"
                        register={register('confirmPassword')}
                    >
                        <button
                            type="button"
                            onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                            className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showConfirmedPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    </FormInput>
                    <FormInput type="checkbox-agreement" register={register('agreement')} />
                    <Button
                        size="lg"
                        type="submit"
                        className="cursor-pointer w-full text-white font-semibold"
                        disabled={!isValid || isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </Button>
                    <OAuth type="signup" />
                    <p className="text-center font-semibold text-muted-foreground mt-5">
                        Already have an account?{' '}
                        <Link href="/login" className="text-destructive underline">
                            Sign in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
