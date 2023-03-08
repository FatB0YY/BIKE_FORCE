interface ApiErrorOptions {
  errors?: unknown[]
}

export default class ApiError extends Error {
  status: number
  errors: unknown[]

  constructor(
    status: number,
    message: string,
    { errors = [] }: ApiErrorOptions = {}
  ) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static badRequest(message: string, errors: unknown[] = []) {
    return new ApiError(400, message, { errors })
  }

  static unauthorized() {
    return new ApiError(401, 'Неавторизованный')
  }

  static forbiddenError(error: unknown) {
    return new ApiError(403, 'Запрещенный', { errors: [error] })
  }

  static internalError(error: unknown) {
    return new ApiError(500, 'Внутренняя ошибка сервера', { errors: [error] })
  }
}

module.exports = ApiError
