// These styles apply to every route in the application
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { ReduxProvider } from '@/components/Providers/ReduxProvider'
import '@fortawesome/fontawesome-svg-core/styles.css' // импортируйте стили Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import { Urbanist } from 'next/font/google'
import Hero from '@/components/Hero'
import Sidebar from '@/components/Sidebar/Sidebar'
import Footer from '@/components/Footer'
import Header from '@/components/Header/Header'
import { NextAuthProvider } from '@/components/Providers/NextAuthProvider'
import MyToastContainer from '@/components/MyToastContainer'

config.autoAddCss = false // Отключите автоматическое добавление стилей CSS

const font = Urbanist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BIKE FORCE',
  description: 'Лучший интернет-магазин запчастей и велосипедов',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={font.className}
        style={font.style}
      >
        <NextAuthProvider>
          <ReduxProvider>
            <Header />
            <Sidebar />
            <Hero />
            {children}
            <Footer />
            <MyToastContainer />
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
