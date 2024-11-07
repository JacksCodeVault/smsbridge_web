import httpClient from '../lib/httpClient'

export const gatewayService = {
    generateApiKey: () => 
        httpClient.post('/devices/generate-key'),
    
    getApiKeyList: () => 
        httpClient.get('/devices/api-keys'),
    
    revokeApiKey: (keyId) => 
        httpClient.post('/devices/revoke-key', { keyId }),
    
    getDeviceList: () => 
        httpClient.get('/devices'),
    
    addDevice: (deviceData) =>
        httpClient.post('/devices', deviceData),
    
    updateDevice: (deviceId, data) =>
        httpClient.put(`/devices/${deviceId}`, data),
    
    deleteDevice: (deviceId) => 
        httpClient.delete(`/devices/${deviceId}`),
    
    updateDeviceStatus: (deviceId, status) =>
        httpClient.put(`/devices/${deviceId}/status`, { status }),
    
    verifyConnection: (deviceId) =>
        httpClient.post(`/devices/${deviceId}/heartbeat`),
    
    syncDeviceMessages: (deviceId, messages) =>
        httpClient.post(`/devices/${deviceId}/sync`, { messages })
}
