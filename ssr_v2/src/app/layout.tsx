// These styles apply to every route in the application
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/redux/provider'
import '@fortawesome/fontawesome-svg-core/styles.css' // импортируйте стили Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import { Urbanist } from 'next/font/google'
import Hero from '@/components/server/Hero'
import Sidebar from '@/components/client/Sidebar'
import Footer from '@/components/server/Footer'
import Header from '@/components/server/Header'

config.autoAddCss = false // Отключите автоматическое добавление стилей CSS

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BIKE FORCE',
  description: 'Лучший интернет-магазин запчастей и велосипедов',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang='en'>
        <body
          className={font.className}
          style={font.style}
        >
          <Header />
          <Sidebar />
          <Hero />
          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  )
}
