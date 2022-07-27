import { Request } from "express";

const errorLogging = (error: any, req: Request) => {
    const customError = !(
        error.constructor.name === "NodeError" ||
    error.constructor.name === "SyntaxError"
    );

    console.log("ERROR");
    console.log(
        `Type: ${customError === false ? "UnhandledError" : error.constructor.name}`
    );
    console.log("Path: " + req.path);
    console.log(`Status code: ${error.statusCode || 500}`);
    console.log(error.stack);
};

export default errorLogging;