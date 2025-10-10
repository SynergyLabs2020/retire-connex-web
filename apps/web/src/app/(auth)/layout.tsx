import React from 'react';

interface ILayout {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: ILayout) {
    return <div>{children}</div>;
}
