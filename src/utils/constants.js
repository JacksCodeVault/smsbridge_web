export const KEY_PREFIX = 'zahra'

export const LOCAL_STORAGE_KEY = {
    USER: `${KEY_PREFIX}.user`,
    TOKEN: `${KEY_PREFIX}.token`
}

export const API_ENDPOINTS = {
    BASE: import.meta.env.VITE_API_BASE_URL,
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        RESET_PASSWORD: '/auth/reset-password',
        REQUEST_RESET: '/auth/request-password-reset',
        VERIFY_EMAIL: '/auth/verify-email',
        UPDATE_PROFILE: '/auth/profile'
    }
}