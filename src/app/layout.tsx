import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@/components/nav";
import { Toaster } from "@/components/ui/toaster";
import Notifications from "@/components/notifications";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Referral Connect",
  description: "Helping Talented International Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Nav />
          {children}
          <Toaster />
          <Notifications />
        </body>
      </html>
    </ClerkProvider>
  );
}
