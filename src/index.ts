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
export * from './errors/not-valid-login-error';
export * from './errors/bad-request-error';
export * from './errors/database-connection-failed-error';

// Middlewares
export * from './middlewares/error-handler';
export * from './middlewares/validate-request';
export * from './middlewares/process-jwt-payload';
export * from './middlewares/require-auth';

// Helpers
export * from './helpers/models/build';
export * from './helpers/models/rename-id-field';
export * from './helpers/models/check-for-duplicate-user';
export * from './helpers/models/check-if-login-is-valid';
export * from './helpers/jwt/JWT';
export * from './helpers/mongoose/mongoose-id-manager';
export * from './helpers/env/check-env-variables';
export * from './helpers/strings/replace-string-message-placeholder';

// Interfaces
export * from './interfaces/UserPayload';

// Events
export * from './event-bus/listener';
export * from './event-bus/publisher';
export * from './event-bus/events/subjects';
export * from './event-bus/events/post-created-event';
export * from './event-bus/events/user-created-event';
export * from './event-bus/nats-manager';

// Factory data
export * from './data-factory/buildAuthTestData';

// Strings
export * from './strings/general';