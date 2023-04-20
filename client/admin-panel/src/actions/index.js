export const productsFetching = () => {
  return {
    type: 'PDODUCT_FETCHING',
  }
}

export const productsFetched = (poruducts) => {
  return {
    type: 'PDODUCT_FETCHED',
    payload: poruducts,
  }
}

export const productsFetchingError = () => {
  return {
    type: 'PDODUCT_FETCHING_ERROR',
  }
}

export const productDeleted = (ids) => {
  return {
    type: 'PRODUCT_DELETED',
    payload: ids,
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
