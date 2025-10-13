import React from 'react';

import { Button } from '@workspace/ui/components/button';

import Apple from './icons/Apple';
import Google from './icons/Google';

export default function OAuth() {
    return (
        <div>
            <div className="my-10 flex gap-2 items-center justify-between">
                <div className="border-b-1 border-b-secondary-foreground/20 w-1/2"></div>
                <p>OR</p>
                <div className="border-b-1 border-b-secondary-foreground/20 w-1/2"></div>
            </div>
            <div className="flex flex-col gap-2">
                <Button size="xl" className="bg-accent text-black">
                    <Google className="!w-6 !h-6" />
                    Sign in with Google
                </Button>
                <Button size="xl" className="bg-black text-white">
                    <Apple className="!w-6 !h-6 fill-white" />
                    Sign in with Apple
                </Button>
            </div>
        </div>
    );
}
