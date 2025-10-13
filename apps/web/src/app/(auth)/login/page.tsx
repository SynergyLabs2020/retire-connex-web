'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';
import { z } from 'zod';

import Eye from '@/components/icons/Eye';
import EyeOff from '@/components/icons/EyeOff';

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
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
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
            <div>
                <h1 className="text-4xl font-bold px-3 text-foreground text-center">
                    Log in to your account
                </h1>
                <p className="text-xl text-muted-foreground text-center mt-3">
                    Welcome back! Please enter your details.
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 mt-10">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-md font-medium">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="new-password"
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-md font-medium">
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            {...register('password')}
                        />
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
                    </div>
                    {errors.password && (
                        <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                </div>
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
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
            </form>
        </div>
    );
}
