export abstract class BaseException extends Error {
  abstract statusCode: number;
  innerException: Error;
  beforeSealing: Function;

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, BaseException.prototype);
  }
}

export class InvalidOperationException extends BaseException {
  statusCode = 500;

  constructor(message?: string, innerException?: Error, beforeSealing?: Function) {
    super(message);
    this.name = this.constructor.name;
    this.innerException = innerException;
    this.beforeSealing = beforeSealing;

    Object.setPrototypeOf(this, InvalidOperationException.prototype);
  }
}

export class ArgumentNullException extends BaseException {
  statusCode: 400;

  constructor(message?: string, innerException?: Error, beforeSealing?: Function) {
    super(message);
    this.name = this.constructor.name;
    this.innerException = innerException;
    this.beforeSealing = beforeSealing;

    Object.setPrototypeOf(this, ArgumentNullException.prototype);
  }
}

export class AdsReportsException extends BaseException {
  statusCode: 400;

  constructor(message?: string, innerException?: Error, beforeSealing?: Function) {
    super(message);
    this.name = this.constructor.name;
    this.innerException = innerException;
    this.beforeSealing = beforeSealing;

    Object.setPrototypeOf(this, AdsReportsException.prototype);
  }
}
