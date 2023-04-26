import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

interface IPropsMainLayout {
  children: React.ReactNode
  title: string
}

const MainLayout = ({ children, title }: IPropsMainLayout) => {
  return (
    <>
      <Head>
        <title>{title} | BIKE FORCE</title>
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout
