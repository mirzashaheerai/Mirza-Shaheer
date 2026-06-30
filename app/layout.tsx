import type { Metadata } from 'next';
import { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Muhammad Shaheer | Premium 3D Portfolio',
  description: 'Creative developer showcasing premium 3D projects and digital experiences',
  keywords: ['portfolio', 'developer', '3D', 'react', 'web design'],
  authors: [{ name: 'Muhammad Shaheer' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shaheer-portfolio.netlify.app',
    siteName: 'Muhammad Shaheer Portfolio',
    title: 'Muhammad Shaheer | Premium 3D Portfolio',
    description: 'Creative developer showcasing premium 3D projects and digital experiences',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
