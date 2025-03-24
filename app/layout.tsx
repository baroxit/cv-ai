import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-inter',
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'promptCv - Tailor your CV for every opportunity',
  description:
    'Generate AI-optimized resumes and cover letters tailored for job applications. Save time and boost your chances of landing your dream job.',
  keywords: [
    'promptCv',
    'AI Resume Generator',
    'Cover Letter AI',
    'AI-powered CV',
    'Resume Builder',
    'Job Application',
  ],
  metadataBase: new URL('https://cv-ai-mu.vercel.app'),
  alternates: {
    canonical: 'https://cv-ai-mu.vercel.app',
  },
  openGraph: {
    title: 'promptCv - Tailor your CV for every opportunity',
    description:
      'Generate AI-optimized resumes and cover letters tailored for job applications.',
    url: 'https://cv-ai-mu.vercel.app',
    siteName: 'promptCv',
    locale: 'en',
    type: 'website',
    images: [
      {
        url: 'https://cv-ai-mu.vercel.app/opengraph-image.png', 
        width: 1200,
        height: 630,
        alt: 'promptCv',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased`}
      >
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
          >
              {children}
          </ThemeProvider>
          <Toaster />
          <Analytics />
      </body>
    </html>
  );
}
