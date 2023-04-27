const initialState = {
  products: [],
  brands: [],
  categories: [],
  ptoductsLoadingStatus: 'idle',
  modalStatus: false,
  boolPage: {boolCategory: false, boolBrand: false},
  user: {},
  roles:[],
  isAuth: false,
  isLoading: false,
  toggleForm: false
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
          brands: [...state.brands, action.payload,]
        }
    case 'BRAND_DELETED':
      const newBrandList = state.brands.filter(
        (item) => !action.payload.includes(item.id)
      )
      return {
        ...state,
        brands: newBrandList,
      }
      case 'CATEGORIES_ADD':
        return {
          ...state,
          categories: [...state.categories, action.payload]
        }
    case 'CATEGORIES_DELEED':
      const newCategoriesList = state.brands.filter(
        (item) => !action.payload.includes(item.id)
      )
      return {
        ...state,
        categories: newCategoriesList,
      }
    case 'TOGGLE_BOOL_PAGE':
      const newObj = action.payload
      return {
        ...state,
        boolPage: newObj
      }
    case 'SET_AUTH': 
      return {
        ...state,
        isAuth: action.payload
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'TOGGLE_FORM':
      return {
        ...state,
        toggleForm: action.payload
      }
    case 'SET_ROLES':
      return {
        ...state,
        roles: action.payload
      }
    default:
      return state
  }
}

export default reducer
