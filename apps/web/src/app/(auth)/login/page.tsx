'use client';

import type React from 'react';
import { useState } from 'react';

import Link from 'next/link';

import { Button } from '@workspace/ui/components/button';
import { Input } from '@workspace/ui/components/input';
import { Label } from '@workspace/ui/components/label';

import Eye from '@/components/icons/Eye';
import EyeOff from '@/components/icons/EyeOff';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

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
            <form className="flex flex-col gap-5 mt-10">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-md font-medium">
                        Email
                    </Label>
                    <Input id="email" type="email" placeholder="Enter your email" required />
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
                            required
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
                >
                    Sign In
                </Button>
            </form>
        </div>
    );
}
