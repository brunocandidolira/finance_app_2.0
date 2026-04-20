export const badRequestError = (message) => {
    const error = new Error(message);
    error.status = 400;
    return error;
};

export const conflictError = (message) => {
    const error = new Error(message);
    error.status = 409;
    return error;
};
