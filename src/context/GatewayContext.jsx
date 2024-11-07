import { createContext, useContext, useState, useEffect } from 'react'
import { deviceAPI, messageAPI } from '@/lib/api'
import { toast } from '@/components/ui/use-toast'
import { websocketService } from '@/services/websocketService'

const GatewayContext = createContext()

export function GatewayProvider({ children }) {
  const [devices, setDevices] = useState([])
  const [apiKeys, setApiKeys] = useState([])
  const [messages, setMessages] = useState([])
  const [stats, setStats] = useState({
    devices: 0,
    apiKeys: 0,
    messagesSent: 0,
    messagesReceived: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInitialData()
    initializeWebSocket()
    return () => websocketService.disconnect()
  }, [])

  const initializeWebSocket = () => {
    websocketService.connect()
    websocketService.onMessage((data) => {
      switch (data.type) {
        case 'DEVICE_STATUS':
          updateDeviceStatus(data.deviceId, data.status)
          break
        case 'MESSAGE_STATUS':
          updateMessageStatus(data.messageId, data.status)
          break
        case 'NEW_MESSAGE':
          addNewMessage(data.message)
          break
      }
    })
  }

  const loadInitialData = async () => {
    try {
      const [devicesRes, apiKeysRes, messagesRes] = await Promise.all([
        deviceAPI.getDevices(),
        deviceAPI.getApiKeys(),
        messageAPI.getMessages()
      ])

      setDevices(devicesRes)
      setApiKeys(apiKeysRes)
      setMessages(messagesRes)
      updateStats()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const updateStats = () => {
    setStats({
      devices: devices.length,
      apiKeys: apiKeys.length,
      messagesSent: messages.filter(m => m.type === 'outbound').length,
      messagesReceived: messages.filter(m => m.type === 'inbound').length
    })
  }

  const generateApiKey = async () => {
    try {
      const response = await deviceAPI.generateApiKey()
      setApiKeys(prev => [...prev, response])
      updateStats()
      return response.key
    } catch (error) {
      throw error
    }
  }

  const revokeApiKey = async (keyId) => {
    try {
      await deviceAPI.revokeApiKey(keyId)
      setApiKeys(prev => prev.filter(key => key.id !== keyId))
      updateStats()
    } catch (error) {
      throw error
    }
  }

  const sendMessage = async (messageData) => {
    try {
      const response = await messageAPI.sendMessage(messageData)
      setMessages(prev => [response, ...prev])
      updateStats()
      return response
    } catch (error) {
      throw error
    }
  }

  const updateDeviceStatus = (deviceId, status) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, status } : device
    ))
  }

  const updateMessageStatus = (messageId, status) => {
    setMessages(prev => prev.map(message =>
      message.id === messageId ? { ...message, status } : message
    ))
  }

  const addNewMessage = (message) => {
    setMessages(prev => [message, ...prev])
    updateStats()
  }

  const value = {
    devices,
    apiKeys,
    messages,
    stats,
    loading,
    generateApiKey,
    revokeApiKey,
    sendMessage,
    refreshData: loadInitialData
  }

  return (
    <GatewayContext.Provider value={value}>
      {children}
    </GatewayContext.Provider>
  )
}

export const useGateway = () => {
  const context = useContext(GatewayContext)
  if (!context) {
    throw new Error('useGateway must be used within a GatewayProvider')
  }
  return context
}
