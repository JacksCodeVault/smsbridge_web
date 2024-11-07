import { messageAPI, deviceAPI } from '@/lib/api'

class StatsService {
    async getStats() {
        try {
            const [messages, devices, apiKeys] = await Promise.all([
                messageAPI.getMessages(),
                deviceAPI.getDevices(),
                deviceAPI.getApiKeys()
            ])

            return {
                data: {
                    devices: devices.length || 0,
                    apiKeys: apiKeys.length || 0,
                    smsSent: messages.filter(m => m.type === 'outbound').length || 0,
                    smsReceived: messages.filter(m => m.type === 'inbound').length || 0,
                    recentMessages: messages.slice(0, 10)
                }
            }
        } catch (error) {
            throw error
        }
    }
}

export default new StatsService()
