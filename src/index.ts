import { UserPayload } from './interfaces/UserPayload';

declare global {
    namespace Express {
        interface Request {
            session?: any;
            currentUser?: UserPayload
        }
    }
}

// Errors
export * from './errors/base-error';
export * from './errors/post-request-validation-error';
export * from './errors/not-found-error';
export * from './errors/duplicate-user-error';
export * from './errors/not-valid-login';

// Middlewares
export * from './middlewares/error-handler';
export * from './middlewares/validate-request';
export * from './middlewares/procees-jwt-payload';

// Helpers
export * from './helpers/models/build';
export * from './helpers/models/rename-id-field';
export * from './helpers/models/check-for-duplicate-user';
export * from './helpers/models/check-if-login-is-valid';
export * from './helpers/jwt/JWT';