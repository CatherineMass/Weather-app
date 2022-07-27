class BaseError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}

const createCustomError = (statusCode: number, msg: string) => {
    return new BaseError(statusCode, msg);
};

export { createCustomError };