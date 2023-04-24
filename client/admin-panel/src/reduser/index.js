const initialState = {
  products: [],
  brands: [],
  ptoductsLoadingStatus: 'idle',
  modalStatus: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PDODUCT_FETCHING':
      return {
        ...state,
        ptoductsLoadingStatus: 'loading',
      }
    case 'PDODUCT_FETCHED':
      return {
        ...state,
        products: action.payload,
        ptoductsLoadingStatus: 'idle',
      }
    case 'PDODUCT_FETCHING_ERROR':
      return {
        ...state,
        ptoductsLoadingStatus: 'error',
      }
    case 'PRODUCT_DELETED':
      const newHeroList = state.products.filter(
        (item) => !action.payload.includes(item.id)
      )
      return {
        ...state,
        products: newHeroList,
      }
    case 'PRODUCT_ADD':
      return {
        ...state,
        products: [...state.products, action.payload],
      }
    case 'MODAL_TOGGLE':
      return {
        ...state,
        modalStatus: !state.modalStatus,
      }
    case 'BRAND_ADD':
        return {
          ...state,
          brands: action.payload,
        }
    default:
      return state
  }
}

export default reducer
