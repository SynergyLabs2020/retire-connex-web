import Link from 'next/link';

import { Button } from '@workspace/ui/components/button';

import AuthHeader from '@/components/AuthHeader';

export default function VerifyPage() {
    return (
        <div>
            <AuthHeader
                heading="Verify your email"
                description="We’ve sent a verification link to your@email.com. Please check your inbox and click the link to confirm your account."
            />
            <div className="w-full max-w-[400px]">
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
                    <button className="text-destructive underline text-end font-bold cursor-pointer">
                        Click to resend
                    </button>
                </p>
            </div>
        </div>
    );
}
