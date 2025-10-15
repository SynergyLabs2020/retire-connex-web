import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
    return (
        <div className="flex justify-center py-24 px-5 sm:p-24 h-screen bg-auth-image">
            <div className="w-full sm:w-auto flex flex-col">{children}</div>
        </div>
    );
}
