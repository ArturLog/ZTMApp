import type { Metadata } from 'next'
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import '../styles/globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})
const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'My Bus Stops',
  description: 'Track your favorite bus stops and departures',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
    >
    <Navbar />
    <main className="min-h-screen bg-background">
      {children}
    </main>
    </body>
    </html>
  )
}

