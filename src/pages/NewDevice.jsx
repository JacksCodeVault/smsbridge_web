import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { MainNav } from "@/components/MainNav"
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline"
import { authService } from "@/services/authService"
import { deviceService } from "@/services/deviceService"

export default function NewDevice() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    deviceName: '',
    apiKey: '',
    description: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await deviceService.addDevice({
        name: formData.deviceName,
        apiKey: formData.apiKey,
        description: formData.description
      })
      navigate('/devices')
    } catch (error) {
      console.error('Failed to register device:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
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
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/devices">
              <Button variant="ghost">Back</Button>
            </Link>
            <h1 className="text-4xl font-bold">Add New Device</h1>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="deviceName">Device Name</Label>
                <Input 
                  id="deviceName" 
                  placeholder="e.g., My Pixel 6"
                  required 
                  value={formData.deviceName}
                  onChange={(e) => setFormData({ ...formData, deviceName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input 
                  id="apiKey" 
                  type="password"
                  placeholder="Enter your API key"
                  required 
                  value={formData.apiKey}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  You can find your API key in the API Keys section
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input 
                  id="description" 
                  placeholder="Brief description of the device"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <span>Registering...</span>
                ) : (
                  <>
                    <DevicePhoneMobileIcon className="h-4 w-4 mr-2" />
                    Register Device
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="font-medium mb-2">How to connect your device:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Install the SMSBridge app on your Android device</li>
              <li>Generate an API key from the Devices page</li>
              <li>Enter the API key in the mobile app</li>
              <li>Give the required permissions to the app</li>
              <li>Register the device here with the same API key</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
