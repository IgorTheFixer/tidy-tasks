import type { Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ModalProvider } from "@/providers/ModalProvider";
import ToastProvider from '@/providers/ToastProvider'

import Container from "@/components/ui/container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tidy Tasks",
  description: "TodoApp built with NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} bg-appGray antialiased`}
        >
          <header className="
            flex 
            justify-center 
            items-center 
            p-4 
            gap-4 
            h-50
            text-[40px]   
            bg-headerBlack
            text-customBlue 
            font-extrabold
          ">
                        <img
              src="rocket.svg"
              alt="an icon depicting a rocketship"
              className="mr-2 object-contain"
            />
            Todo <span className="text-customPurple">App</span>
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          <ToastProvider />
          <ModalProvider />
          <Container>
            {children}
          </Container>          
        </body>
      </html>
    </ClerkProvider>
  );
}
