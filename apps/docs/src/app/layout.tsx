import "@/lib/rn-globals";
import { AppProviders } from "@/components/AppProviders";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bethanyElingston = localFont({
  src: "../assets/fonts/bethany-elingston/BethanyElingston.otf",
  variable: "--font-bethany-elingston",
  display: "swap",
});

export const metadata: Metadata = {
  title: "toastiva",
  description:
    "Morphing blob toasts for React Native — pill to card with gooey SVG transitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bethanyElingston.variable} antialiased`}
      >
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
