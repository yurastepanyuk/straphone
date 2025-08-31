export interface BaseErrorOptions {
  code?: number;
  data?: any;
}
export class ErrorBase extends Error {
  code?: number;
  data?: unknown;

  constructor(message: string, options?: BaseErrorOptions) {
    super(message);

    this.code = options?.code;
    this.data = options?.data;
  }
}
