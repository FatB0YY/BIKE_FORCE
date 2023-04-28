import Hero from '@/components/Hero'
import Loader from '@/components/Loader'
import MainLayout from '@/components/MainLayout'
import Pagination from '@/components/Pagination'
import ProductList from '@/components/ProductList'
import Sidebar from '@/components/Sidebar'
import UserService from '@/services/UserService'
import { IProductsPageProps } from '@/types'
import { NextPageContext } from 'next'
import { useEffect, useState } from 'react'

const HomePage = ({ products: serverProducts }: IProductsPageProps) => {
  const [products, setProducts] = useState(serverProducts)

  useEffect(() => {
    async function load() {
      const response = await UserService.getAllProduct(null, null, 4, 1)
      setProducts(response.data.rows)
    }

    if (!serverProducts) {
      load()
    }
  }, [])

  if (!products) {
    return (
      <MainLayout title='Home Page'>
        <Hero />
        <Loader />
        <Sidebar />
      </MainLayout>
    )
  }

  return (
    <MainLayout title='Home Page'>
      <Hero />
      <ProductList products={products} />
      <Pagination />
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

  const response = await UserService.getAllProduct(null, null, 4, 1)
  const products = response.data.rows
  return { products }
}

export default HomePage
