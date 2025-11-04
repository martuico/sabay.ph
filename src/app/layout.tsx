import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Theme } from "@radix-ui/themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sabay.ph - Carpooling",
  description: "Save cost on your gas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(geistSans.variable, geistMono.variable, "antialiased min-h-screen flex flex-col")}>
        <Theme>
          <a
            className="pointer-events-none absolute left-0 z-[60] m-3 bg-bg-base-primary p-3 text-text-base-secondary opacity-0 transition focus:pointer-events-auto focus:opacity-100"
            href="#main-content"
          >
            Skip Navigation
          </a>
          <NuqsAdapter>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </NuqsAdapter>
        </Theme>
      </body>
    </html>
  );
}
