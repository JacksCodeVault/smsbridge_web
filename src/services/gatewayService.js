import { deviceAPI, messageAPI } from '@/lib/api'

class GatewayService {
    async getDeviceList() {
        return deviceAPI.getDevices()
    }

    async getApiKeyList() {
        return deviceAPI.getApiKeys()
    }

    async generateApiKey() {
        return deviceAPI.generateApiKey()
    }

    async deleteApiKey(keyId) {
        return deviceAPI.revokeApiKey(keyId)
    }

    async sendSMS(deviceId, messageData) {
        return messageAPI.sendMessage({
            deviceId,
            ...messageData
        })
    }

    async linkDevice(deviceData) {
        return deviceAPI.addDevice(deviceData)
    }

    async updateDeviceStatus(deviceId, status) {
        return deviceAPI.updateStatus(deviceId, status)
    }
}

export default new GatewayService()
