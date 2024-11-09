import type { Metadata } from "next";
import Head from 'next/head';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://know-your-booth.vercel.app/'


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
  title: 'Voter Search - Mahesh Gaikwad',
  description: 'Search and get your voter slip for Kalyan East constituency. Find your voter details by name or EPIC number.',
  openGraph: {
    title: 'Voter Search - Mahesh Gaikwad',
    description: 'Search and get your voter slip for Kalyan East constituency. Find your voter details by name or EPIC number.',
    images: [
      {
        url: '/Banner.jpeg', // Make sure this matches your banner image path
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
    title: 'Voter Search - Mahesh Gaikwad',
    description: 'Search and get your voter slip for Kalyan East constituency. Find your voter details by name or EPIC number.',
    images: ['/Banner.jpeg'], // Make sure this matches your banner image path
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
                <title>Voter Search - Mahesh Gaikwad</title>
                <meta name="description" content="Search and get your voter slip for Kalyan East constituency. Find your voter details by name or EPIC number." />

                <meta property="og:url" content="https://know-your-booth.vercel.app/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Voter Search - Mahesh Gaikwad" />
                <meta property="og:description" content="Search and get your voter slip for Kalyan East constituency. Find your voter details by name or EPIC number." />
                <meta property="og:image" content="https://know-your-booth.vercel.app/Banner.jpeg" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="know-your-booth.vercel.app" />
                <meta property="twitter:url" content="https://know-your-booth.vercel.app/" />
                <meta name="twitter:title" content="Voter Search - Mahesh Gaikwad" />
                <meta name="twitter:description" content="Search and get your voter slip for Kalyan East constituency. Find your voter details by name or EPIC number." />
                <meta name="twitter:image" content="https://know-your-booth.vercel.app/Banner.jpeg" />
            </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}


