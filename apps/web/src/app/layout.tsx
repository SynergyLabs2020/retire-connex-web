import React from 'react';

import './globals.css';

import localFont from 'next/font/local';

interface ILayout {
    children: React.ReactNode;
}

const futura = localFont({
    src: [
        { path: './fonts/FuturaCyrillicLight.woff', weight: '300', style: 'normal' },
        { path: './fonts/FuturaCyrillicBook.woff', weight: '400', style: 'normal' },
        { path: './fonts/FuturaCyrillicMedium.woff', weight: '500', style: 'normal' },
        { path: './fonts/FuturaCyrillicDemi.woff', weight: '600', style: 'normal' },
        { path: './fonts/FuturaCyrillicBold.woff', weight: '700', style: 'normal' },
        { path: './fonts/FuturaCyrillicHeavy.woff', weight: '800', style: 'normal' },
        { path: './fonts/FuturaCyrillicExtraBold.woff', weight: '900', style: 'normal' },
    ],
    variable: '--font-futura',
    display: 'swap',
});

export default function MainLayout({ children }: ILayout) {
    return (
        <html lang="en" className={`${futura.variable} antialiased`}>
            <body className="font-sans">{children}</body>
        </html>
    );
}
