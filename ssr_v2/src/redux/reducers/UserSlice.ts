import { IProduct, IProductInCart, IUser } from '@/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IUserState {
  user: IUser | null
  isOpenSidebar: boolean
  cart: IProductInCart[]
  itemAmountInCart: number
  totalPrice: number
  page: number
  totalCount: number
  limit: number
  tabCategoryId: number | null
  tabBrandId: number | null
}

const initialState: IUserState = {
  user: null,
  isOpenSidebar: false,
  cart: [],
  itemAmountInCart: 0,
  totalPrice: 0,
  // лента товаров
  page: 1,
  totalCount: 0,
  limit: 4,
  tabBrandId: null,
  tabCategoryId: null,
}

// функция для добавления товара в корзину
function addToCartHelper(cart: IProductInCart[], product: IProduct, id: number): IProductInCart[] {
  const newProductInCart: IProductInCart = { ...product, amount: 1 }
  const cartItem = cart.find((product) => product.id === id)

  if (cartItem) {
    return cart.map((item) => {
      if (item.id === id) {
        return { ...item, amount: cartItem.amount + 1 }
      } else {
        return item
      }
    })
  } else {
    return [...cart, newProductInCart]
  }
}

// Функция для удаления товара из корзины
function removeFromCartHelper(cart: IProductInCart[], id: number): IProductInCart[] {
  return cart.filter((item) => item.id !== id)
}

// Функция для уменьшения количества товара в корзине
function decreaseAmountHelper(cart: IProductInCart[], id: number): IProductInCart[] {
  const product = cart.find((item) => item.id === id)

  if (!product) {
    return cart
  }

  if (product.amount > 1) {
    return cart.map((item) => {
      if (item.id === id) {
        return { ...item, amount: product.amount - 1 }
      } else {
        return item
      }
    })
  } else {
    return removeFromCartHelper(cart, id)
  }
}

export const UserSlice = createSlice({
  name: 'UserSlice',
  initialState,
  reducers: {
    setIsOpenSidebar: (state, action: PayloadAction<boolean>) => {
      state.isOpenSidebar = action.payload
    },
    // cart
    addToCart: (
      state,
      action: PayloadAction<{
        product: IProduct
        id: number
      }>,
    ) => {
      state.cart = addToCartHelper(state.cart, action.payload.product, action.payload.id)
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.cart = removeFromCartHelper(state.cart, id)
    },

    clearCart: (state) => {
      state.cart = []
    },

    increaseAmount: (state, action: PayloadAction<number>) => {
      const cartProduct = state.cart.find((item) => item.id === action.payload)

      if (cartProduct) {
        state.cart = addToCartHelper(state.cart, cartProduct, action.payload)
      }
    },

    decreaseAmount: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.cart = decreaseAmountHelper(state.cart, id)
    },

    setItemAmountInCart: (state, action: PayloadAction<number>) => {
      state.itemAmountInCart = action.payload
    },

    setTotalPrice: (state, action: PayloadAction<number>) => {
      state.totalPrice = action.payload
    },

    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    },

    // tabs
    setTabCategoryId: (state, action: PayloadAction<number>) => {
      state.tabCategoryId = action.payload
    },
    setTabBrandId: (state, action: PayloadAction<number>) => {
      state.tabBrandId = action.payload
    },
  },
})

export const { reducer: userReducer, actions: userActions } = UserSlice
export const selectCurrentUser = (state: RootState) => state.user.user
