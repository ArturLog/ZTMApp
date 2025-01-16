"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "../styles/globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import React, {useState} from 'react';

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});
const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased flex flex-col min-h-screen`}
			>
            <QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Navbar />
				<main className="flex-grow bg-background overflow-auto pb-16">{children}</main>
				<Footer />
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
			</body>
		</html>
	);
}
