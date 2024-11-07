import httpClient from '../lib/httpClient'

export const gatewayService = {
    generateApiKey: () => 
        httpClient.post('/auth/api-keys'),
    
    getApiKeyList: () => 
        httpClient.get('/auth/api-keys'),
    
    deleteApiKey: (id) => 
        httpClient.delete(`/auth/api-keys/${id}`),
    
    getDeviceList: () => 
        httpClient.get('/gateway/devices'),
    
    deleteDevice: (id) => 
        httpClient.delete(`/gateway/devices/${id}`),
    
    sendSMS: (deviceId, { recipients, message }) => 
        httpClient.post(`/gateway/devices/${deviceId}/sendSMS`, { 
            recipients, 
            message 
        }),
    
    getReceivedSMS: (deviceId) => 
        httpClient.get(`/gateway/devices/${deviceId}/getReceivedSMS`)
}