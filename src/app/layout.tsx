import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mindful Breathing',
  description: 'A tranquil website for mindful breathing exercises',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-100 min-h-screen`}>
        <div className="fixed inset-0 bg-[url('/stars.png')] opacity-50"></div>
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}

