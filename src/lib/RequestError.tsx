export enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
}

export const isExpectedError = (status: number): boolean => {
  return Object.values(HttpStatus).includes(status);
};

export class RequestError extends Error {
  constructor(
    message: string,
    public status: number,
    code?: string
  ) {
    super(message);
    this.name = 'RequestError';
  }
}
