import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "../styles/globals.css";

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});
const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "My Bus Stops",
	description: "Track your favorite bus stops and departures",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}
			>
				<Navbar />
				<main className="bg-background h-[87vh]">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
