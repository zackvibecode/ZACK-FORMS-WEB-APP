import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zack Forms – Build No-Code Forms. Receive Responses on WhatsApp.',
  description:
    'Zack Forms lets you create beautiful no-code forms and receive every submission instantly on WhatsApp. No coding. No credit card. Start free today.',
  keywords: [
    'whatsapp forms',
    'no-code form builder',
    'whatsapp lead generation',
    'form builder',
    'whatsapp notifications',
    'business forms',
  ],
  openGraph: {
    title: 'Zack Forms – No-Code Forms → WhatsApp',
    description: 'Create forms in minutes. Receive customer submissions directly on WhatsApp.',
    type: 'website',
    url: 'https://zack-forms.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zack Forms – No-Code Forms → WhatsApp',
    description: 'Create forms in minutes. Receive customer submissions directly on WhatsApp.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
