import { Html, Main, Head, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <meta
          name='description'
          content='Лучший интернет магазин BIKE FORCE'
        />
        <meta
          name='keywords'
          content='велосипеды, запчасти'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
