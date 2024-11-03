import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link, useNavigate } from "react-router-dom"
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline"
import { MainNav } from "@/components/MainNav"
import { authService } from "@/services/authService"
import { deviceService } from "@/services/deviceService"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export default function Devices() {
  const navigate = useNavigate()
  const [devices, setDevices] = useState([])
  const [apiKeys, setApiKeys] = useState([])
  const [loading, setLoading] = useState(true)
  const [showApiKey, setShowApiKey] = useState(false)
  const [newApiKey, setNewApiKey] = useState(null)

  useEffect(() => {
    fetchDevicesAndKeys()
  }, [])

  const fetchDevicesAndKeys = async () => {
    try {
      const [devicesData, apiKeysData] = await Promise.all([
        deviceService.getDevices(),
        deviceService.getApiKeys()
      ])
      setDevices(devicesData)
      setApiKeys(apiKeysData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateApiKey = async () => {
    try {
      const response = await deviceService.generateApiKey()
      setNewApiKey(response.apiKey)
      setShowApiKey(true)
      fetchDevicesAndKeys()
    } catch (error) {
      console.error('Failed to generate API key:', error)
    }
  }

  const handleRevokeKey = async (keyId) => {
    try {
      await deviceService.revokeApiKey(keyId)
      fetchDevicesAndKeys()
    } catch (error) {
      console.error('Failed to revoke API key:', error)
    }
  }

  const handleRemoveDevice = async (deviceId) => {
    try {
      await deviceService.deleteDevice(deviceId)
      fetchDevicesAndKeys()
    } catch (error) {
      console.error('Failed to remove device:', error)
    }
  }

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-2xl font-bold">SMSBridge</Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Devices</h1>
            <Link to="/devices/new">
              <Button>
                <DevicePhoneMobileIcon className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </Link>
          </div>

          {/* API Key Management */}
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">API Keys</h2>
              <Button onClick={handleGenerateApiKey}>Generate New Key</Button>
            </div>
            <div className="bg-card rounded-lg border">
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pb-4">API Key</th>
                      <th className="pb-4">Generated</th>
                      <th className="pb-4">Device Name</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">Loading...</td>
                      </tr>
                    ) : apiKeys.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">No API keys found</td>
                      </tr>
                    ) : (
                      apiKeys.map(key => (
                        <tr key={key.id}>
                          <td className="py-3 font-mono">{key.key}</td>
                          <td>{formatDate(key.createdAt)}</td>
                          <td>{key.deviceName || 'Not connected'}</td>
                          <td>
                            <span className={`text-${key.active ? 'green' : 'red'}-500`}>
                              {key.active ? 'Active' : 'Revoked'}
                            </span>
                          </td>
                          <td>
                            {key.active && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleRevokeKey(key.id)}
                              >
                                Revoke
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Connected Devices */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Connected Devices</h2>
            <div className="bg-card rounded-lg border">
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pb-4">Device Name</th>
                      <th className="pb-4">Device ID</th>
                      <th className="pb-4">Last Active</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">Loading...</td>
                      </tr>
                    ) : devices.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">No devices connected</td>
                      </tr>
                    ) : (
                      devices.map(device => (
                        <tr key={device.id}>
                          <td className="py-3">{device.name}</td>
                          <td>{device.deviceId}</td>
                          <td>{formatDate(device.updatedAt)}</td>
                          <td>
                            <span className={`text-${device.status === 'active' ? 'green' : 'yellow'}-500`}>
                              {device.status}
                            </span>
                          </td>
                          <td>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => navigate(`/devices/${device.id}/edit`)}
                              >
                                Edit
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-destructive-foreground"
                                onClick={() => handleRemoveDevice(device.id)}
                              >
                                Remove
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showApiKey} onOpenChange={setShowApiKey}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New API Key Generated</DialogTitle>
            <DialogDescription>
              Copy this API key. It will only be shown once.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-sm break-all">{newApiKey}</code>
          </div>
          <Button onClick={() => setShowApiKey(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
