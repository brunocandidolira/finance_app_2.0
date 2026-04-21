export const badRequestError = (body) => ({
    status: 400,
    body,
});


export const conflictError = (body) => ({
    status: 409,
    body,
});

export const  ok =(body)=>({
    status:200,
    body
    });
    export const internalServerError = (body) => ({
        status: 500,
        body: {
            error: body instanceof Error ? body.message : body,
        },
    });
    export const created = (body) => ({
        status: 201,
        body,
    });
    export const notFoundError = (body) => ({
        status: 404,
        body,
    });
    export const unauthorizedError = (body) => ({
        status: 401,
        body,
    });
    export const forbiddenError = (body) => ({
        status: 403,
        body,
    });
    export const unprocessableEntityError = (body) => ({
        status: 422,
        body,
    });    
