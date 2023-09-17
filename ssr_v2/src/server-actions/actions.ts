'use server'

import UserService from '@/services/UserService'
import { IBrand, ICategory, IProduct, IProductResponse, IQueryProducts } from '@/types'

export async function getAllProducts(query: IQueryProducts): Promise<IProductResponse> {
  const products = await UserService.getAllProduct(query)
  return products
}

export async function getOneProduct(id: number): Promise<IProduct> {
  const product = await UserService.getOneProduct(id)
  return product
}

export async function getAllBrand(): Promise<IBrand[]> {
  const brands = await UserService.getAllBrand()
  return brands
}

export async function getAllCategory(): Promise<ICategory[]> {
  const categories = await UserService.getAllCategory()
  return categories
}
