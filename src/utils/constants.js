export const KEY_PREFIX = 'smsbridge'

export const LOCAL_STORAGE_KEY = {
    USER: `${KEY_PREFIX}.user`,
    TOKEN: `${KEY_PREFIX}.token`
}

export const API_ENDPOINTS = {
    BASE: import.meta.env.VITE_API_BASE_URL,
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        VALIDATE_KEY: '/auth/validate-key',
        DEVICE_AUTH: '/auth/device/auth'
    },
    MESSAGES: {
        GET: '/messages',
        SEND: '/messages',
        BATCH: '/messages/batch',
        DELIVERY_REPORTS: '/messages/delivery-reports'
    },
    DEVICES: {
        LIST: '/devices',
        API_KEYS: '/devices/api-keys'
    }
}
