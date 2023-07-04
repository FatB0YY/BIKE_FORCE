export interface IError {
  message: string
}

export interface IErrorResponse {
  errors: IError[]
  message: string
}
