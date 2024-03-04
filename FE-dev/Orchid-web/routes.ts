/**
 * An array of routes that are accessible to the public
 * These routes do not required authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/"
];

/**
 * An array of routes that are used to the authentication
 * These routes will redirect in user to Dashboard
 * @type {string[]}
 */

export const authRoutes = [
    "/dashboard"
];

/**
 * The prefix for API authentication routes
 * These routes will redirect in user to Dashboard
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";