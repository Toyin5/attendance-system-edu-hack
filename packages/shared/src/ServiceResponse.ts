export class ServiceResponse {
  success: boolean;
  message: string;
  responseObject: Object | null;
  errors?: unknown;

  constructor(
    success: boolean,
    message: string,
    responseObject: Object | null,
    errors?: unknown
  ) {
    this.success = success;
    this.message = message;
    this.responseObject = responseObject;
    this.errors = errors;
  }
}
