import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mirza Shaheer | Premium AI Brand Content Portfolio',
  description: 'AI content strategy and generation transforming scrollers into buyers.',
  keywords: ['portfolio', 'AI brand strategist', 'content production', 'digital marketing'],
  authors: [{ name: 'Mirza Shaheer' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mirza-shaheer.vercel.app',
    siteName: 'Mirza Shaheer Portfolio',
    title: 'Mirza Shaheer | Premium AI Brand Content Portfolio',
    description: 'AI content strategy and generation transforming scrollers into buyers.',
  },
};

// Official Next.js Viewport Engine to lock mobile scaling perfectly 1:1
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="overflow-x-hidden w-full bg-white text-zinc-950 antialiased">
        {children}
      </body>
    </html>
  );
}
