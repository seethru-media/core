import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'seethru.media Author',
    description: 'Content creation for seethru.media',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
