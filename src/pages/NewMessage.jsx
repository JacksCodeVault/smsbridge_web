import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link, useNavigate } from "react-router-dom"
import { MainNav } from "@/components/MainNav"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
import { authService } from "@/services/authService"
import { deviceService } from "@/services/deviceService"
import { messageService } from "@/services/messageService"

export default function NewMessage() {
  const navigate = useNavigate()
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    deviceId: '',
    recipient: '',
    content: ''
  })

  useEffect(() => {
    fetchDevices()
  }, [])

  const fetchDevices = async () => {
    try {
      const devicesData = await deviceService.getDevices()
      setDevices(devicesData.filter(device => device.status === 'active'))
    } catch (error) {
      console.error('Failed to fetch devices:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await messageService.sendMessage({
        deviceId: formData.deviceId,
        recipient: formData.recipient,
        content: formData.content
      })
      navigate('/messages')
    } catch (error) {
      console.error('Failed to send message:', error)
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
            <Link to="/messages">
              <Button variant="ghost">Back</Button>
            </Link>
            <h1 className="text-4xl font-bold">New Message</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="device">Select Device</Label>
              <Select
                value={formData.deviceId}
                onValueChange={(value) => setFormData({ ...formData, deviceId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a device" />
                </SelectTrigger>
                <SelectContent>
                  {devices.map(device => (
                    <SelectItem key={device.id} value={device.id}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {devices.length === 0 && (
                <p className="text-sm text-yellow-500">
                  No active devices found. Please add a device first.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input 
                id="recipient" 
                type="tel" 
                placeholder="+251912345678"
                required 
                value={formData.recipient}
                onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                Enter phone number in international format
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Type your message here" 
                required
                className="min-h-[150px]"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading || !formData.deviceId}
            >
              {loading ? (
                <span>Sending...</span>
              ) : (
                <>
                  <PaperAirplaneIcon className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
