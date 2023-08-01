import { ReactNode } from 'react';

import { Inter } from 'next/font/google';

import { Content } from '@/Content';

import '../styles/globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {

    return <html lang={'en'}>
        <body className={`${inter.variable} overflow-hidden font-sans`}>
            <main>
                <Content>
                    {children}
                </Content>
            </main>
            <div id={'modal-root'} className={'modal-root'}/>
        </body>
    </html>;
}