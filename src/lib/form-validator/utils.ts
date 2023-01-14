export const isEmptyValue = (value, type?: string) => {
    if (value === undefined || value === null)
        return true;

    if (type === 'array' && Array.isArray(value) && !value.length)
        return true;

    return typeof value === 'string' && !value;
};
