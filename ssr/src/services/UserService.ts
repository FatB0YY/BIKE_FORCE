import $api from '../http'
import { AuthResponse, IBrand, ICategory, IProduct, IProductResponse, IRole } from '../types/index'
import { AxiosResponse } from 'axios'

export default class UserService {
  // auth
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/user/login', { email, password })
  }

  static async registration(email: string, password: string, roles: IRole[]): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/user/registration', { email, password, roles })
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return $api.get('/user/refresh')
  }

  static async logout(): Promise<void> {
    return $api.post('/user/logout')
  }

  // category
  static async getAllCategory(): Promise<AxiosResponse<ICategory[]>> {
    return $api.get('/category')
  }

  // brand
  static async getAllBrand(): Promise<AxiosResponse<IBrand[]>> {
    return $api.get('/brand')
  }

  // product
  static async getAllProduct(
    BrandId: number | null,
    CategoryId: number | null,
    limit: number,
    page: number,
  ): Promise<AxiosResponse<IProductResponse>> {
    return $api.get('/product', {
      params: {
        BrandId,
        CategoryId,
        limit,
        page,
      },
    })
  }

  static async getOneProduct(id: number): Promise<AxiosResponse<IProduct>> {
    return $api.get(`/product/${id}`)
  }
}
