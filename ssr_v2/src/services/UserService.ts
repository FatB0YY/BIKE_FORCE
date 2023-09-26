import {
  AuthResponse,
  IBrand,
  ICategory,
  IErrorResponseAuth,
  IProduct,
  IProductResponse,
  IQueryProducts,
  IRole,
} from '@/types/index'
import qs from 'query-string'
import $api, { BASE_URL } from './axios'
import { AxiosResponse } from 'axios'

// хочу написать свой тип
// Promise<AuthResponse | IErrorResponseAuth>

export default class UserService {
  // auth

  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse | IErrorResponseAuth>> {
    return $api
      .post<AuthResponse>('/user/login', { email, password })
      .then((response) => {
        return response
      })
      .catch(function (error) {
        if (error.response) {
          return error.response
        }
      })
  }

  static async registration(
    email: string,
    password: string,
    roles: IRole[],
  ): Promise<AxiosResponse<AuthResponse | IErrorResponseAuth>> {
    return $api
      .post<AuthResponse>('/user/registration', { email, password, roles })
      .then((response) => {
        return response
      })
      .catch(function (error) {
        if (error.response) {
          return error.response
        }
      })
  }

  static async logout(): Promise<void> {
    return $api.post('/user/logout')
  }

  static async refresh(): Promise<AxiosResponse<any>> {
    return $api
      .post('/user/refresh')
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        console.log('my error', error)
      })
  }

  // category
  static async getAllCategory(): Promise<ICategory[]> {
    const response = await fetch(`${BASE_URL}/category`, { next: { revalidate: 60 } })

    // if (!response.ok) {
    //   throw new Error('Unable to fetch :(')
    // }

    return response.json()
  }

  // brand
  static async getAllBrand(): Promise<IBrand[]> {
    const response = await fetch(`${BASE_URL}/brand`, { next: { revalidate: 60 } })

    // if (!response.ok) {
    //   throw new Error('Unable to fetch :(')
    // }

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

    // if (!response.ok) {
    //   throw new Error('Unable to fetch :(')
    // }

    return response.json()
  }

  static async getOneProduct(id: number): Promise<IProduct> {
    const response = await fetch(`${BASE_URL}/product/${id}`)

    // if (!response.ok) {
    //   throw new Error('Unable to fetch :(')
    // }

    return response.json()
  }

  // roles
  static async getOneRole(name: string): Promise<IRole> {
    const url = qs.stringifyUrl({
      url: `${BASE_URL}/role/getOne?`,
      query: {
        value: name,
      },
    })

    const response = await fetch(url)

    return response.json()
  }
}
