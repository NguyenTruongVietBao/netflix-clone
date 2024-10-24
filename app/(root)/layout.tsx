import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/context/AuthProvider";
import ToasterContext from "@/context/ToasterContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cine Hub",
    description: "Next.js 14 Cine project",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${inter.className} bg-black-1`}>
        <AuthProvider>{children}</AuthProvider>
        <ToasterContext/>
        </body>
        </html>
    );
}
