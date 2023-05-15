import $api from '../hooks/useHttp'

export default class ProductService {
  static async postProduct(formData) {
    const response = await $api.post('/product', formData)
    return response
  }
  static async getProducts() {
    const response = await $api.get('/product')
    return response.data.rows
  }
  static async getProductId(id) {
    const response = await $api.get(`/product/${id}`)
    return response.data
  }
}
