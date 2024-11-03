  export const API_BASE_URL = 'http://localhost:3000/api/v1';

  export const AUTH_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    GOOGLE_LOGIN: '/auth/google',
    FORGOT_PASSWORD: '/auth/forgot-password',
  };

  export const USER_ENDPOINTS = {
    GET_PROFILE: '/user/profile',
    DELETE_ACCOUNT: '/user/account',
    UPDATE_PROFILE: '/user/update-profile',
  };

  export const DEVICE_ENDPOINTS = {
    GET_ALL: '/devices',
    GET_API_KEYS: '/devices/api-keys',
    CREATE: '/devices',
    UPDATE: (id) => `/devices/${id}`,
    DELETE: (id) => `/devices/${id}`,
    GENERATE_KEY: '/devices/generate-key',
    REVOKE_KEY: '/devices/revoke-key'
};

export const MESSAGE_ENDPOINTS = {
    GET_ALL: '/messages',
    SEND: '/messages',
    UPDATE_STATUS: (id) => `/messages/${id}/status`,
    DELETE: (id) => `/messages/${id}`,
    SYNC: '/messages/sync'
};