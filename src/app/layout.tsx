import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'


import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'Voter Search - Kalyan East',
  description: 'Search and get your voter slip for Kalyan East constituency. Find your voter details by name or EPIC number.',
  openGraph: {
    title: 'Voter Search - Kalyan East',
    description: 'Search and get your voter slip for Kalyan East constituency. Find your voter details by name or EPIC number.',
    images: [
      {
        url: '/Banner.jpg', // Make sure this matches your banner image path
        width: 1200,
        height: 630,
        alt: 'Voter Search Banner',
      },
    ],
    locale: 'mr_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voter Search - Kalyan East',
    description: 'Search and get your voter slip for Kalyan East constituency. Find your voter details by name or EPIC number.',
    images: ['/Banner.jpg'], // Make sure this matches your banner image path
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
