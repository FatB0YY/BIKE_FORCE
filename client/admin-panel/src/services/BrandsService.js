import $api from '../hooks/useHttp'

export default class BrandsService {
  static async postBrands(name) {
    return $api.post('/brand', { name })
  }
  static async getBrands() {
    const response = await $api.get('/brand')
    return response.data
  }
}
