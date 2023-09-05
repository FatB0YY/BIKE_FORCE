'use client'

import { IProduct, IProductResponse } from '@/types'
import Sidebar from './components/client/Sidebar'
import Footer from './components/server/Footer'
import Hero from './components/server/Hero'
import ProductList from './components/server/ProductList'
import UserService from '@/services/UserService'
import { useAppSelector } from '@/hooks/redux'
import { useEffect, useState } from 'react'

export default function Home() {
  const { tabBrandId, tabCategoryId, page } = useAppSelector((state) => state.UserReducer)
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await UserService.getAllProduct(
          tabBrandId,
          tabCategoryId,
          Number(process.env.LIMIT_PRODUCT_ON_LIST)!,
          page,
        )

        setProducts(response.rows)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <>
      <Hero />
      <Sidebar />
      <ProductList
        products={products}
        brands={products}
        categories={products}
      />
      <Footer />
    </>
  )
}
