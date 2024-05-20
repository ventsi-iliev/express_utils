import { Request } from 'express';

function filterUndefinedProperties<T>(req: Request): T {
    const ret = Object.entries(req.body).reduce((acc, [key, val]) => {
        if(val === undefined || val === null) {
            return acc;
        }

        return {
            ...acc,
            [key]: val
        }
    }, {});

    return ret as T;
}

export { filterUndefinedProperties };