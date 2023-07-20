import { ReactNode } from 'react';

import { Inter } from 'next/font/google';
import Head from 'next/head';

import { Content } from '@/Content';

import '../styles/globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {

    return <html lang={'en'}>
        <Head>
            <link rel={'apple-touch-icon'} href={'/images/pwa/icon_x256.png'}/>
        </Head>
        <body className={`${inter.variable} font-sans`}>
            <main>
                <Content>
                    {children}
                </Content>
            </main>
            <div id={'modal-root'} className={'modal-root'}/>
        </body>
    </html>;
}