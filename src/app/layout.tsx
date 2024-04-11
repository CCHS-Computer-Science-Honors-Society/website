import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import { NavbarDemo } from "@/components/nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Cherry Creek Computer Science Honor Society",
  description: "The offical website of the Cherry Creek Computer Science Honor Society",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>

          <div className="flex flex-col min-h-screen min-w-full">
            <NavbarDemo />
            {children}
          </div>
        </TRPCReactProvider>
        <Toaster />

      </body>
    </html>
  );
}
