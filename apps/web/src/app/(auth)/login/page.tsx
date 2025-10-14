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

const loginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (data: LoginFormData) => {
        console.log('Form data submitted:', data);
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return (
        <div>
            <AuthHeader
                heading="Log in to your account"
                description="Welcome back! Please enter your details."
            />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-10">
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
                <Link
                    href="/password-recovery"
                    className="text-destructive underline text-end font-bold"
                >
                    Forgot your password?
                </Link>
                <Button
                    size="lg"
                    type="submit"
                    className="cursor-pointer w-full text-white font-semibold"
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
            </form>
            {/* <p className="mt-4 flex gap-2 text-muted-foreground text-lg items-center justify-center">
                Don’t have an account?
                <Link href={'/signup'} className="text-destructive underline text-end font-bold">
                    Sign up
                </Link>
            </p> */}
            <OAuth />
        </div>
    );
}
