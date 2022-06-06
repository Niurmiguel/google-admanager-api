export class BaseException extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class InvalidOperationException extends BaseException {
  constructor(message?: string, innerException?: Error, beforeSealing?: Function) {
    super(message);
    this.name = this.constructor.name;
    this['innerException'] = innerException;
    this['beforeSealing'] = beforeSealing;
  }
}
