import $api from '../hooks/useHttp'

export default class BrandsService {
  static async postBrands(name) {
    const response = await $api.post('/brand', { name })
    return response
  }
  static async getBrands() {
    const response = await $api.get('/brand')
    return response.data
  }
}
