import { Request, Response, NextFunction } from "express";

const errorResponse = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const customError = !(
        error.constructor.name === "NodeError" ||
    error.constructor.name === "SyntaxError"
    );

    res.status(error.statusCode || 500).json({
        response: "Error",
        error: {
            type: customError === false ? "UnhandledError" : error.constructor.name,
            path: req.path,
            statusCode: error.statusCode || 500,
            message: error.message,
        },
    });
    next(error);
};

export default errorResponse;