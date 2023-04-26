import { NextPageContext } from 'next'
import { NextRouter } from 'next/router'

export interface IProductsPageProps {
  products: IProduct[]
}

export interface IProduct {
  id: number
  name: string
  price: number
  img: string
  count: number
  isActive: boolean
}

export interface IProductPropsId {
  product: IProduct
}

export interface ProductNextPageContext extends NextPageContext {
  query: {
    id: string
  }
}
