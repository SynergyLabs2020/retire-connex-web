import React from 'react';

import Image from 'next/image';

interface LayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col items-center p-24 h-screen bg-auth-image">
            <Image
                src="/logo.svg"
                alt="Connex Logo"
                width={90}
                height={48}
                priority
                className="mb-6"
            />
            <div>{children}</div>
        </div>
    );
}
