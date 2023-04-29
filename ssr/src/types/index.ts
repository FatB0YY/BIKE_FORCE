import { NextPageContext } from 'next'

export interface IIndexPageProps {
  products: {
    rows: IProduct[]
    count: number
  }
  tabsBrand: IBrand[]
  tabsCategory: ICategory[]
}

export interface IProduct {
  id: number
  name: string
  price: number
  img: string
  count: number
  isActive: boolean
  CategoryId: number
  BrandId: number
  info?: IInfoProduct[]
}

export interface IInfoProduct {
  id: number
  title: string
  description: string
  isActive: boolean
}

export interface IProductPropsId {
  product: IProduct
  brand: IBrand
  category: ICategory
}

export interface ProductNextPageContext extends NextPageContext {
  query: {
    id: string
  }
}

export interface IUser {
  id: number
  email: string
  isActive: boolean
  isBan: boolean
  banReason: string
}

export interface IProductInCart extends IProduct {
  amount: number
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}

export interface IRole {
  id: number
  value: string
  description: string
}

export interface ICategory {
  id: number
  name: string
  isActive: boolean
}

export interface IBrand {
  id: number
  name: string
  isActive: boolean
}

export interface IProductResponse {
  count: number
  rows: IProduct[]
}

export interface ITab {
  id: number
  name: string
  isActive: boolean
}
