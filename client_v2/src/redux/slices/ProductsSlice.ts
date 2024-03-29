import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface IInfoProduct {
  title: string
  description: string
}

interface IProductsState {
  properties: IInfoProduct[]
  // лента продуктов
  page: number
  totalCount: number
  limit: number
}

const initialState: IProductsState = {
  page: 1,
  totalCount: 0,
  limit: 4,
  properties: [{ title: '', description: '' }],
}

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    // properties
    setProperties: (state, action: PayloadAction<IInfoProduct[]>) => {
      state.properties = action.payload
    },
    removeProperties: (state, action: PayloadAction<number>) => {
      // state.properties = state.properties.filter((_, index) => index !== action.payload)
      state.properties.splice(action.payload, 1)
    },
    addNewProp: (state) => {
      state.properties.push({ title: '', description: '' })
    },
    defaultProperties: (state) => {
      state.properties = initialState.properties
    },

    // page
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },
  },
  extraReducers: (builder) => {},
})

export const { reducer: productsReducer, actions: productsActions } = productsSlice
