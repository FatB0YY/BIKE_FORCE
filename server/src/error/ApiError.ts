class ApiError extends Error {
  status: number
  errors: unknown[]

  constructor(status: number, message: string, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static badRequest(message: string, errors: unknown[] = []) {
    return new ApiError(400, message)
  }

  static unauthorized() {
    return new ApiError(401, 'Не авторизован')
  }

  static tokenExpiredError() {
    return new ApiError(401, 'Срок действия токена истек')
  }

  static jsonWebTokenError() {
    return new ApiError(401, 'Недействительный токен')
  }

  static forbiddenError() {
    return new ApiError(403, 'Запрещенный')
  }

  static internalError(error: unknown) {
    return new ApiError(500, 'Внутренняя ошибка сервера')
  }
}

export default ApiError
