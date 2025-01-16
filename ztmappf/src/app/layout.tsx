import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "../styles/globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import React from 'react';

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});
const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "My ZTM tracker",
	description: "Track your favorite stops and departures",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}
			>
			<AuthProvider>
				<Navbar />
				<main className="flex-grow bg-background overflow-auto pb-16">{children}</main>
				<Footer />
			</AuthProvider>
			</body>
		</html>
	);
}
