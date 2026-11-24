import type {
    NextFunction,
    Request,
    Response,
} from "express";

import type { ObjectSchema } from "joi";


interface RequestSchemas {
    body?: ObjectSchema;
    params?: ObjectSchema;
    query?: ObjectSchema;
}

interface ValidationOptions {
    stripBody?: boolean;
    stripQuery?: boolean;
    stripParams?: boolean;
}

export const validateRequest = (
    schemas: RequestSchemas,
    options: ValidationOptions = {}
): ((req: Request, res: Response, next: NextFunction) => void) => {
    const validationOptions = {
        stripBody: options.stripBody ?? true,
        stripQuery: options.stripQuery ?? false,
        stripParams: options.stripParams ?? false,
    };

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        try {
            const errors: string[] = [];

            const validatePart = (
                schema: ObjectSchema,
                data: unknown,
                partName: string,
                shouldStrip: boolean
            ): unknown => {
                const { error, value } = schema.validate(
                    data,
                    {
                        abortEarly: false,
                        convert: true,
                        stripUnknown: shouldStrip,
                    }
                );

                if (error) {
                    errors.push(
                        ...error.details.map(
                            (detail) =>
                                `${partName}: ${detail.message}`
                        )
                    );

                    return data;
                }

                return value;
            };

            if (schemas.body) {
                res.locals.validatedBody = validatePart(
                    schemas.body,
                    req.body,
                    "Body",
                    validationOptions.stripBody
                );
            }

            if (schemas.params) {
                res.locals.validatedParams = validatePart(
                    schemas.params,
                    req.params,
                    "Params",
                    validationOptions.stripParams
                );
            }

            if (schemas.query) {
                res.locals.validatedQuery = validatePart(
                    schemas.query,
                    req.query,
                    "Query",
                    validationOptions.stripQuery
                );
            }

            if (errors.length > 0) {
                res.status(400).json({
                    status: "error",
                    code: "VALIDATION_ERROR",
                    message: "The request contains invalid values.",
                    details: errors,
                });

                return;
            }

            next();
        } catch (error: unknown) {
            res.status(400).json({
                status: "error",
                code: "VALIDATION_ERROR",
                message:
                    error instanceof Error
                        ? error.message
                        : "Request validation failed.",
            });
        }
    };
};