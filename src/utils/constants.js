export const API_BASE_URL = 'http://localhost:3000/api/v1';

export const LOCAL_STORAGE_KEY = {
    TOKEN: 'auth_token',
    USER: 'user_data'
};

export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        VALIDATE_KEY: '/auth/validate-key',
        DEVICE_AUTH: '/auth/device/auth'
    },
    MESSAGES: {
        LIST: '/messages',
        SEND: '/messages',
        BATCH: '/messages/batch',
        SYNC: '/messages/sync',
        DELIVERY: '/messages/delivery-reports',
        STATUS: (Id) => `/messages/${Id}/status`,
        DELETE: (Id) => `/messages/${Id}`,
        UPDATE_DELIVERY: (Id) => `/messages/${Id}/delivery`
    },
    DEVICES: {
        LIST: '/devices',
        ADD: '/devices',
        API_KEYS: '/devices/api-keys',
        GENERATE_KEY: '/devices/generate-key',
        REVOKE_KEY: '/devices/revoke-key',
        UPDATE: (deviceId) => `/devices/${deviceId}`,
        DELETE: (deviceId) => `/devices/${deviceId}`,
        STATUS: (deviceId) => `/devices/${deviceId}/status`,
        HEARTBEAT: (deviceId) => `/devices/${deviceId}/heartbeat`,
        SYNC: (deviceId) => `/devices/${deviceId}/sync`
    },
    USER: {
        PROFILE: '/user/profile',
        UPDATE: '/user/update',
        PASSWORD: '/user/password',
        DELETE: '/user/account'
    }
};

export const WEBSOCKET_EVENTS = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    MESSAGE: 'message',
    DEVICE_STATUS: 'device_status',
    DELIVERY_STATUS: 'delivery_status'
};

export const MESSAGE_STATUS = {
    PENDING: 'pending',
    SENT: 'sent',
    DELIVERED: 'delivered',
    FAILED: 'failed'
};

export const DEVICE_STATUS = {
    ONLINE: 'online',
    OFFLINE: 'offline',
    BUSY: 'busy'
};

export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error occurred',
    UNAUTHORIZED: 'Unauthorized access',
    INVALID_API_KEY: 'Invalid API key',
    DEVICE_NOT_FOUND: 'Device not found',
    MESSAGE_FAILED: 'Failed to send message'
};
