import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppNav from "@/components/navigation/app-nav";
import { Toaster } from "sonner";

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
  title: "iThi",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        <div className="antialiased max-w-7xl mx-auto px-6 lg:px-8">
          <AppNav />
          <section>
            {children} <Toaster position="top-right" closeButton richColors />{" "}
          </section>
        </div>
      </body>
    </html>
  );
}
