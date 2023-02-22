export class HttpException extends Error {
  public status: number;
  public exception_message: string | string[];

  constructor(status: number, exception_message: string | string[] = []) {
    super(
      exception_message instanceof Array
        ? exception_message[0]
        : exception_message
    );
    this.status = status;
    this.exception_message = exception_message;
  }
}
