import localFont from 'next/font/local';

import { Providers } from '@/components/providers';

// @ts-ignore
import '@workspace/ui/globals.css';

interface ILayout {
    children: React.ReactNode;
}

const futura = localFont({
    src: [
        { path: '../../public/fonts/FuturaCyrillicLight.woff', weight: '300', style: 'normal' },
        { path: '../../public/fonts/FuturaCyrillicBook.woff', weight: '400', style: 'normal' },
        { path: '../../public/fonts/FuturaCyrillicMedium.woff', weight: '500', style: 'normal' },
        { path: '../../public/fonts/FuturaCyrillicDemi.woff', weight: '600', style: 'normal' },
        { path: '../../public/fonts/FuturaCyrillicBold.woff', weight: '700', style: 'normal' },
        { path: '../../public/fonts/FuturaCyrillicHeavy.woff', weight: '800', style: 'normal' },
        { path: '../../public/fonts/FuturaCyrillicExtraBold.woff', weight: '900', style: 'normal' },
    ],
    variable: '--font-futura',
    display: 'swap',
});

export default function RootLayout({ children }: ILayout) {
    return (
        <html lang="en" suppressHydrationWarning className={`${futura.variable} antialiased`}>
            <body className={`font-sans antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
