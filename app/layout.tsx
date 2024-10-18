import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/providers'
import { HEADER_HEIGHT } from '@/lib/consts'
import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Smart Onboarding',
  description: 'Hackathon stuff',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Providers>
        <body style={{ gridTemplateRows: `${HEADER_HEIGHT} 1fr` }}>
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  )
}
