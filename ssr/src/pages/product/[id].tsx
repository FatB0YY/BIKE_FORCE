import Loader from '@/components/Loader'
import MainLayout from '@/components/MainLayout'
import { IProduct, IProductPropsId, ProductNextPageContext } from '@/types'
import Router, { NextRouter, useRouter } from 'next/router'
import React from 'react'
import { useState, useEffect } from 'react'

const ProductDetails = ({ product: serverProduct }: IProductPropsId) => {
  const [product, setProduct] = useState(serverProduct)
  const router: NextRouter = useRouter()

  useEffect(() => {
    async function load() {
      const response = await fetch(`https://fakestoreapi.com/products/${router.query.id}`)
      const data: IProduct = await response.json()
      setProduct(data)
    }

    if (!serverProduct) {
      load()
    }
  }, [])

  if (!product) {
    return (
      <MainLayout title='Loading...'>
        <Loader />
      </MainLayout>
    )
  }

  return (
    <MainLayout title={product.name}>
      <div>Product Details Page {product.id}</div>
      <button onClick={() => Router.push('/')}>Go back to home</button>
    </MainLayout>
  )
}

ProductDetails.getInitialProps = async (ctx: ProductNextPageContext) => {
  if (!ctx.req) {
    return {
      product: null,
    }
  }

  const response = await fetch(`https://fakestoreapi.com/products/${ctx.query.id}`)
  const product: IProduct = await response.json()
  return { product }
}

export default ProductDetails
