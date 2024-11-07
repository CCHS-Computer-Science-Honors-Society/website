import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://creekcshs.org"), // Replace with your actual domain
  title: {
    default: "Cherry Creek Computer Science Honor Society",
    template: "%s | Cherry Creek CS Honor Society",
  },
  description:
    "The official website of the Cherry Creek Computer Science Honor Society. Join us in fostering excellence in computer science education and innovation.",
  keywords: [
    "Computer Science",
    "Honor Society",
    "Cherry Creek",
    "STEM",
    "Education",
    "Technology",
    "Coding",
    "Programming",
    "AI",
    "Creek CS",
    "High School",
  ],
  authors: [{ name: "Cherry Creek High School" }],
  creator: "Cherry Creek Computer Science Honor Society",
  publisher: "Cherry Creek Computer Science Honor Society",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Cherry Creek Computer Science Honor Society",
    description:
      "Fostering excellence in computer science education and innovation at Cherry Creek High School",
    url: "https://creekcshs.org",
    siteName: "Cherry Creek CS Honor Society",
    images: [
      {
        url: "https://creekcshs.org/og-image.png", // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Cherry Creek Computer Science Honor Society logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cherry Creek Computer Science Honor Society",
    description:
      "Fostering excellence in computer science education and innovation at Cherry Creek High School",
    images: ["https://creekcshs.org"], // Replace with your actual image URL
    creator: "@creekcshs", // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
  },
  alternates: {
    canonical: "https://cherrycreekcshs.org/",
    languages: {
      "en-US": "https://cchs-cs-honor-society.edu",
    },
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <div className="flex min-h-screen min-w-full flex-col">
            {children}
            {modal}
          </div>
        </TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
