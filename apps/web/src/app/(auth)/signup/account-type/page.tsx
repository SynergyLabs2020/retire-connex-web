'use client';

import { useState } from 'react';

import Link from 'next/link';

import { Button } from '@workspace/ui/components/button';

import AuthHeader from '@/components/AuthHeader';
import ArrowLeft from '@/components/icons/ArrowLeft';

export default function ChooseAccountType() {
    const [isOrganization, setIsOrganization] = useState<boolean | null>(null);
    const [isSubmitting, setIsSubmiting] = useState(false);

    const onSubmit = async () => {
        setIsSubmiting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmiting(false);
    };

    return (
        <div>
            <AuthHeader
                heading="Choose account type"
                description="Are you an organization or a individual?"
            />
            <div className="w-full max-w-[400px]">
                <div className="flex flex-col gap-3 mt-4">
                    <Button
                        className={
                            isOrganization
                                ? 'border-3 border-destructive bg-destructive/10 text-destructive'
                                : ''
                        }
                        size="2xl"
                        onClick={() => setIsOrganization(true)}
                    >
                        I'm an organization
                    </Button>
                    <Button
                        className={
                            isOrganization === false
                                ? 'border-3 border-destructive bg-destructive/10 text-destructive'
                                : ''
                        }
                        size="2xl"
                        onClick={() => setIsOrganization(false)}
                    >
                        I'm an individual
                    </Button>
                </div>
                <div className="flex flex-col gap-10 items-center mt-8">
                    <Button
                        onClick={onSubmit}
                        size="lg"
                        type="submit"
                        disabled={isSubmitting || isOrganization === null}
                        className="cursor-pointer w-full text-white font-semibold"
                    >
                        {isSubmitting ? 'Wait a moment...' : 'Continue'}
                    </Button>
                    <Link href={'/signup'} className="font-semibold flex items-center gap-1">
                        <ArrowLeft />
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
}
