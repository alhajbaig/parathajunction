import type { Metadata } from 'next'
import { Inter, Playfair_Display, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-playfair',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Paratha Junction — Premium Cloud Kitchen & Tiffin Services | Nagpur',
  description: 'Nagpur\'s No.1 Premium Tiffin Service. Fresh, Hygienic, Homely Meals Delivered Daily. 5-Box Insulated Tiffin. Trusted by 5000+ happy customers. Starting at ₹80/meal.',
  keywords: ['tiffin service', 'nagpur', 'home food delivery', 'meal subscription', 'paratha junction', 'homely meals', 'cloud kitchen', 'premium tiffin'],
  authors: [{ name: 'Paratha Junction' }],
  openGraph: {
    title: 'Paratha Junction — Premium Cloud Kitchen & Tiffin Services | Nagpur',
    description: 'Fresh, Hygienic, Homely Meals Delivered Daily in Nagpur. Trusted by 5000+ happy customers.',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paratha Junction — Premium Tiffin Services',
    description: 'Fresh, Hygienic, Homely Meals Delivered Daily in Nagpur.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${poppins.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
