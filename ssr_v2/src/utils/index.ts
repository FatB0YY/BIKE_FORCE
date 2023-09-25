import { toast } from 'react-toastify'

type ErrorObject = {
  errors?: Array<{ message: string }>
  message?: string
}

export function displayErrors(errorObject: ErrorObject) {
  if (errorObject && errorObject.errors && errorObject.errors.length > 0) {
    errorObject.errors.forEach((error) => {
      const errorMessage = error.message
      toast.error(errorMessage)
    })
  } else if (errorObject && errorObject.message) {
    toast.error(errorObject.message)
  } else {
    toast.error('Произошла неизвестная ошибка')
  }
}
