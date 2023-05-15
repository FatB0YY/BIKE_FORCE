export const valueDeleted = (ids, page) => {
  return {
    type: 'VALUE_DELETED',
    ids,
    page,
  }
}

export const productAdd = (item) => {
  return {
    type: 'PRODUCT_ADD',
    payload: item,
  }
}

export const modalToggle = () => {
  return {
    type: 'MODAL_TOGGLE',
  }
}

export const brandsAdd = (brand) => {
  return {
    type: 'BRAND_ADD',
    payload: brand,
  }
}

export const brandDeleted = (ids) => {
  return {
    type: 'BRAND_DELETED',
    payload: ids,
  }
}

export const categoriesAdd = (brand) => {
  return {
    type: 'CATEGORIES_ADD',
    payload: brand,
  }
}

export const categoriesDeleted = (ids) => {
  return {
    type: 'CATEGORIES_DELEED',
    payload: ids,
  }
}

export const toggleBoolPage = (obj) => {
  return {
    type: 'TOGGLE_BOOL_PAGE',
    payload: obj,
  }
}

export const setUser = (data) => {
  return {
    type: 'SET_USER',
    payload: data,
  }
}

export const setLoading = (bool) => {
  return {
    type: 'SET_LOADING',
    payload: bool,
  }
}

export const toggleForm = (bool) => {
  return {
    type: 'TOGGLE_FORM',
    payload: bool,
  }
}

export const setRoles = (roles) => {
  return {
    type: 'SET_ROLES',
    payload: roles,
  }
}

export const setAuthMenu = (bool) => {
  return {
    type: 'SET_AUTH_MENU',
    payload: bool,
  }
}

export const getAllUsers = (users) => {
  return {
    type: 'GET_ALL_USERS',
    users,
  }
}

export const setValidMessage = (validMessage) => {
  return {
    type: 'SET_VALID_MESSAGE',
    validMessage,
  }
}

export const setUserRoleForValid = (userRoleForValid) => {
  return {
    type: 'SET_USER_ROLE_FOR_VALID',
    userRoleForValid,
  }
}

export const setUserRoleId = (userRoleId) => {
  return {
    type: 'SET_USER_ROLE_ID',
    userRoleId,
  }
}
