import { AuthResponse, IBrand, ICategory, IProduct, IProductResponse, IQueryProducts, IRole } from '@/types/index'
import qs from 'query-string'

const BASE_URL = process.env.API_URL!

export default class UserService {
  // auth
  static async login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Unable to fetch :(')
    }

    return response.json()
  }

  static async registration(email: string, password: string, roles: IRole[]): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/user/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, roles }),
    })

    if (!response.ok) {
      throw new Error('Unable to fetch :(')
    }

    return response.json()
  }

  static async refresh(): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/user/refresh`)

    if (!response.ok) {
      throw new Error('Unable to fetch :(')
    }

    return response.json()
  }

  static async logout(): Promise<void> {
    await fetch(`${BASE_URL}/user/logout`, {
      method: 'POST',
    })
  }

  // category
  static async getAllCategory(): Promise<ICategory[]> {
    const response = await fetch(`${BASE_URL}/category`, { next: { revalidate: 60 } })

    if (!response.ok) {
      throw new Error('Unable to fetch :(')
    }

    return response.json()
  }

  // brand
  static async getAllBrand(): Promise<IBrand[]> {
    const response = await fetch(`${BASE_URL}/brand`, { next: { revalidate: 60 } })

    if (!response.ok) {
      throw new Error('Unable to fetch :(')
    }

    return response.json()
  }

  // product
  static async getAllProduct(query: IQueryProducts): Promise<IProductResponse> {
    const url = qs.stringifyUrl({
      url: `${BASE_URL}/product?`,
      query: {
        BrandId: query.BrandId,
        CategoryId: query.CategoryId,
        limit: query.limit,
        page: query.page,
      },
    })

    const response = await fetch(url, { next: { revalidate: 60, tags: ['products'] } })
    // // - ssg
    // // cache: 'no-cache' - ssr
    // // next: { revalidate: 60 } - isr

    if (!response.ok) {
      throw new Error('Unable to fetch :(')
    }

    return response.json()
  }

  static async getOneProduct(id: number): Promise<IProduct> {
    const response = await fetch(`${BASE_URL}/product/${id}`)

    if (!response.ok) {
      throw new Error('Unable to fetch :(')
    }

    return response.json()
  }
}
