import React, { FC, PropsWithChildren } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

interface IPropsMainLayout {
  children: React.ReactNode
  title: string
}

const MainLayout: FC<PropsWithChildren<IPropsMainLayout>> = ({ children, title }) => {
  const titleHead = `${title} | BIKE FORCE`

  return (
    <>
      <Head>
        <title>{titleHead}</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout
