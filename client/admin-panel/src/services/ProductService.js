import $api from '../hooks/useHttp'

export default class ProductService {
  static async postProduct(formData) {
    return $api.post('/product', formData)
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
