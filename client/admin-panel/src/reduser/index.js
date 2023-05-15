const initialState = {
  product: [],
  brand: [],
  category: [],
  modalStatus: false,
  boolPage: { boolCategory: false, boolBrand: false, boolUsers: false },
  user: {},
  users: [],
  roles: [],
  isLoading: false,
  toggleForm: false,
  validMessage: null,
  userRoleForValid: null,
  userRoleId: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VALUE_DELETED':
      const { page, ids } = action
      const newList = state[page].map((item) => {
        return ids.includes(item.id) ? { ...item, isActive: false } : item
      })
      return {
        ...state,
        [page]: newList,
      }
    case 'PRODUCT_ADD':
      return {
        ...state,
        product: [...state.product, action.payload],
      }
    case 'MODAL_TOGGLE':
      return {
        ...state,
        modalStatus: !state.modalStatus,
      }
    case 'BRAND_ADD':
      return {
        ...state,
        brand: [...state.brand, action.payload],
      }
    case 'BRAND_DELETED':
      const newBrandList = state.brand.filter(
        (item) => !action.payload.includes(item.id)
      )
      return {
        ...state,
        brand: newBrandList,
      }
    case 'CATEGORIES_ADD':
      return {
        ...state,
        category: [...state.category, action.payload],
      }
    case 'CATEGORIES_DELEED':
      const newCategoriesList = state.brand.filter(
        (item) => !action.payload.includes(item.id)
      )
      return {
        ...state,
        category: newCategoriesList,
      }
    case 'TOGGLE_BOOL_PAGE':
      const newObj = action.payload
      return {
        ...state,
        boolPage: newObj,
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'TOGGLE_FORM':
      return {
        ...state,
        toggleForm: action.payload,
      }
    case 'SET_ROLES':
      return {
        ...state,
        roles: action.payload,
      }
    case 'GET_ALL_USERS':
      return {
        ...state,
        users: [...state.users, action.users],
      }
    case 'SET_VALID_MESSAGE':
      return {
        ...state,
        validMessage: action.validMessage,
      }
    case 'SET_USER_ROLE_FOR_VALID':
      return {
        ...state,
        userRoleForValid: action.userRoleForValid,
      }
    case 'SET_USER_ROLE_ID':
      return {
        ...state,
        userRoleId: action.userRoleId,
      }
    default:
      return state
  }
}

export default reducer
