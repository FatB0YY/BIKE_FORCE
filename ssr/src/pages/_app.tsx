import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@fortawesome/fontawesome-svg-core/styles.css' // импортируйте стили Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core'
import { Provider } from 'react-redux'
import { setupStore } from '../redux/store'
const store = setupStore()

config.autoAddCss = false // Отключите автоматическое добавление стилей CSS

// pages/_app.js
import localFont from 'next/font/local'

const myFont = localFont({
  src: [
    {
      path: './fonts/BrunoAceSC-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/BrunoAceSC-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/BrunoAceSC-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/BrunoAceSC-Regular.eot',
      weight: '400',
      style: 'normal',
    },
  ],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${myFont.className} font-sans`}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </div>
  )
}
