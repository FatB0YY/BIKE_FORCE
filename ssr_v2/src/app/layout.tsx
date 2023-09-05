// These styles apply to every route in the application
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/redux/provider'
import '@fortawesome/fontawesome-svg-core/styles.css' // импортируйте стили Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false // Отключите автоматическое добавление стилей CSS

import localFont from 'next/font/local'

const myFont = localFont({
  src: [
    {
      path: '../fonts/BrunoAceSC-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/BrunoAceSC-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/BrunoAceSC-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/BrunoAceSC-Regular.eot',
      weight: '400',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: 'BIKE FORCE',
  description: 'Лучший интернет-магазин запчастей и велосипедов',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={myFont.className}
        style={myFont.style}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
