export class HttpError extends Error {
  readonly status: string;
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}
