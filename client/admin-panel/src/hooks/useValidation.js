import { useCallback } from 'react'

export const errorTextInput = (nameInput, errorText) => {
  for (let i = 0; i < errorText.length; i++) {
    const item = errorText[i]
    if (item.param === nameInput) {
      return <div className='input-error'>{item.msg || item.message}</div>
    }
  }
  return null
}

export const useValidation = () => {
  const valid = useCallback((email, password, errorMessage) => {
    const changeClasses = () => {
      email.current.style.borderColor = '#ff0000'
      password.current.style.borderColor = '#ff0000'
      email.current.onfocus = () => {
        email.current.style.borderColor = '#000000'
        password.current.style.borderColor = '#000000'
      }
    }
    const createObj = (textPropMessage) => {
      let objArr = []
      errorMessage.errors.forEach((item) => {
        let obj = {
          param: item.param === undefined ? 'password' : item.param,
          [textPropMessage]: item[textPropMessage],
        }
        objArr.push(obj)
      })
      return objArr
    }
    switch (errorMessage.message) {
      case 'Ошибка при валидации':
        changeClasses()
        return createObj('msg')
      case 'Некорректный запрос':
        changeClasses()
        return createObj('message')
      default:
        console.log('все гуд')
    }
  })
  return {
    valid,
  }
}
