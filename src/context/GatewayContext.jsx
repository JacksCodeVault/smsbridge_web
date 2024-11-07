  import { createContext, useContext, useState, useEffect } from 'react'
  import { gatewayService } from '@/services/gatewayService'
  import { statsService } from '@/services/statsService'
  import { toast } from '@/components/ui/use-toast'

  const GatewayContext = createContext()

  export function GatewayProvider({ children }) {
    const [devices, setDevices] = useState([])
    const [apiKeys, setApiKeys] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      loadInitialData()
    }, [])

    const loadInitialData = async () => {
      try {
        const [devicesRes, apiKeysRes, statsRes] = await Promise.all([
          gatewayService.getDeviceList(),
          gatewayService.getApiKeyList(),
          statsService.getStats()
        ])

        setDevices(devicesRes.data)
        setApiKeys(apiKeysRes.data)
        setStats(statsRes.data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load gateway data",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    const generateApiKey = async () => {
      try {
        const response = await gatewayService.generateApiKey()
        setApiKeys(prev => [...prev, response.data])
        toast({
          title: "Success",
          description: "New API key generated"
        })
        return response.data
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate API key",
          variant: "destructive"
        })
        throw error
      }
    }

    const deleteApiKey = async (id) => {
      try {
        await gatewayService.deleteApiKey(id)
        setApiKeys(prev => prev.filter(key => key.id !== id))
        toast({
          title: "Success",
          description: "API key deleted"
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete API key",
          variant: "destructive"
        })
        throw error
      }
    }

    const sendSMS = async (deviceId, data) => {
      try {
        const response = await gatewayService.sendSMS(deviceId, data)
        toast({
          title: "Success",
          description: "SMS sent successfully"
        })
        return response.data
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to send SMS",
          variant: "destructive"
        })
        throw error
      }
    }

    const refreshStats = async () => {
      try {
        const response = await statsService.getStats()
        setStats(response.data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to refresh stats",
          variant: "destructive"
        })
      }
    }

    const value = {
      devices,
      apiKeys,
      stats,
      loading,
      generateApiKey,
      deleteApiKey,
      sendSMS,
      refreshStats,
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
