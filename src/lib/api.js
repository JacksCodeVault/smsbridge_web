
import httpClient from './httpClient';
import { API_ENDPOINTS } from '../utils/constants';

// Auth APIs
export const authAPI = {
    login: (credentials) => {
        console.log('API: Login request', credentials)
        return httpClient.post('/auth/login', credentials)
    },    register: (userData) => {
        console.log('API: Sending registration request to:', API_ENDPOINTS.AUTH.REGISTER)
        console.log('API: Registration payload:', userData)
        return httpClient.post(API_ENDPOINTS.AUTH.REGISTER, userData)
    },
    validateApiKey: (key) => httpClient.post(API_ENDPOINTS.AUTH.VALIDATE_KEY, { apiKey: key }),
    deviceAuth: (deviceId, apiKey) => httpClient.post(API_ENDPOINTS.AUTH.DEVICE_AUTH, { deviceId, apiKey })
};
// Device APIs
export const deviceAPI = {
    getDevices: () => httpClient.get(API_ENDPOINTS.DEVICES.LIST),
    addDevice: (deviceData) => httpClient.post(API_ENDPOINTS.DEVICES.ADD, deviceData),
    updateDevice: (deviceId, data) => httpClient.put(API_ENDPOINTS.DEVICES.UPDATE(deviceId), data),
    deleteDevice: (deviceId) => httpClient.delete(API_ENDPOINTS.DEVICES.DELETE(deviceId)),
    
    // API Key Management
    getApiKeys: () => httpClient.get(API_ENDPOINTS.DEVICES.API_KEYS),
    generateApiKey: () => httpClient.post(API_ENDPOINTS.DEVICES.GENERATE_KEY),
    revokeApiKey: (keyId) => httpClient.post(API_ENDPOINTS.DEVICES.REVOKE_KEY, { keyId }),
    
    // Device Status & Sync
    updateStatus: (deviceId, status) => httpClient.put(API_ENDPOINTS.DEVICES.STATUS(deviceId), { status }),
    verifyConnection: (deviceId) => httpClient.post(API_ENDPOINTS.DEVICES.HEARTBEAT(deviceId)),
    syncMessages: (deviceId, messages) => httpClient.post(API_ENDPOINTS.DEVICES.SYNC(deviceId), { messages })
};

// Message APIs
export const messageAPI = {
    getMessages: () => {
        console.log('API: Fetching messages')
        return httpClient.get('/messages')
    },
    sendMessage: (messageData) => {
        console.log('API: Sending message:', messageData)
        return httpClient.post('/messages', messageData)
    },
    sendBatchMessages: (messages) => {
        console.log('API: Sending batch messages:', messages)
        return httpClient.post('/messages/batch', { messages })
    },
    updateMessageStatus: (messageId, status) => {
        console.log('API: Updating message status:', { messageId, status })
        return httpClient.put(`/messages/${messageId}/status`, { status })
    },
    deleteMessage: (messageId) => {
        console.log('API: Deleting message:', messageId)
        return httpClient.delete(`/messages/${messageId}`)
    }
}


// User APIs
export const userAPI = {
    getProfile: () => httpClient.get(API_ENDPOINTS.USER.PROFILE),
    updateProfile: (userData) => {
        console.log('API: Updating profile:', userData)
        return httpClient.put('/user/update', userData)
    },
    updatePassword: (passwordData) => httpClient.put(API_ENDPOINTS.USER.PASSWORD, passwordData),
    deleteAccount: () => {
        console.log('API: Deleting account')
        return httpClient.delete('/user/account')
    }
};

export default {
    auth: authAPI,
    device: deviceAPI,
    message: messageAPI,
    user: userAPI
};
