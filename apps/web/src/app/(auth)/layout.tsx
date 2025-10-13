import React from 'react';

import Image from 'next/image';

interface LayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col items-center py-24 px-5 sm:p-24 h-screen bg-auth-image">
            <Image
                src="/logo.svg"
                alt="Connex Logo"
                width={90}
                height={48}
                priority
                className="mb-6"
            />
            <div className="w-full sm:w-auto">{children}</div>
        </div>
    );
}
