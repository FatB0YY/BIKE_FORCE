class ApiError extends Error {
  public status: number
  public errors: unknown[]
  public name: string

  constructor(status: number, message: string, errors: unknown[] = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }

  public static BadRequest(message: string): ApiError {
    return new ApiError(400, 'Некорректный запрос', [{ message }])
  }

  public static badValidation(errors: unknown[] = []): ApiError {
    return new ApiError(422, 'Ошибка при валидации', errors)
  }

  public static unauthorized(): ApiError {
    return new ApiError(401, 'Не авторизован')
  }

  public static tokenExpiredError(): ApiError {
    return new ApiError(401, 'Срок действия токена истек')
  }

  public static jsonWebTokenError(): ApiError {
    return new ApiError(401, 'Недействительный токен')
  }

  public static forbiddenError(): ApiError {
    return new ApiError(403, 'Запрещенный')
  }

  public static internalError(message: string, errors: unknown[]): ApiError {
    return new ApiError(500, message, errors)
  }
}

export default ApiError
