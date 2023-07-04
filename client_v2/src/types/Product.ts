export interface IProduct {
  id: number
  name: string
  price: number
  img: string
  CategoryId: number
  BrandId: number
  isActive: boolean
  info: string | IInfo[]
}

export interface IInfo {
  id: number
  ProductId: number
  title: string
  description: string
  isActive: boolean
}

export interface IResponseFetchProducts {
  rows: IProduct[]
  count: number
}
