import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/providers/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Link Manager & Analytics Platform',
  description: 'Professional SaaS platform for link management, URL shortening, and advanced analytics',
  keywords: ['link manager', 'url shortener', 'analytics', 'utm builder', 'saas'],
  authors: [{ name: 'Scalable SaaS Team' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 