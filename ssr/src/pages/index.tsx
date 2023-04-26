import Loader from '@/components/Loader'
import MainLayout from '@/components/MainLayout'
import ProductList from '@/components/ProductList'
import Sidebar from '@/components/Sidebar'
import { IProduct, IProductsPageProps } from '@/types'
import { NextPageContext } from 'next'
import { useEffect, useState } from 'react'

const HomePage = ({ products: serverProducts }: IProductsPageProps) => {
  const [products, setProducts] = useState(serverProducts)

  useEffect(() => {
    async function load() {
      const response = await fetch('https://fakestoreapi.com/products')
      const data: IProduct[] = await response.json()
      setProducts(data)
    }

    if (!serverProducts) {
      load()
    }
  }, [])

  if (!products) {
    return (
      <MainLayout title='Home Page'>
        <Loader />
        <Sidebar />
      </MainLayout>
    )
  }

  return (
    <MainLayout title='Home Page'>
      <ProductList products={products} />
      <Sidebar />
    </MainLayout>
  )
}

HomePage.getInitialProps = async (ctx: NextPageContext) => {
  if (!ctx.req) {
    return {
      products: null,
    }
  }

  const response = await fetch('https://fakestoreapi.com/products')
  const products: IProduct[] = await response.json()
  return { products }
}

export default HomePage
