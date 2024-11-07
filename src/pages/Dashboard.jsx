import { useState, useEffect } from 'react'
import { Navbar } from "@/components/common/Navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Copy, Key, Loader2, Smartphone, Send, MessageSquare } from "lucide-react"
import { messageAPI, deviceAPI } from '@/lib/api'
import statsService from '@/services/statsService'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { formatDate, validatePhoneNumbers, getStatusColor } from '@/utils/helpers'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [devices, setDevices] = useState([])
  const [apiKeys, setApiKeys] = useState([])
  const [messages, setMessages] = useState([])
  const [stats, setStats] = useState({
    devices: 0,
    apiKeys: 0,
    smsSent: 0,
    smsReceived: 0
  })
  const [activeTab, setActiveTab] = useState("devices")
  const [newApiKey, setNewApiKey] = useState(null)
  const [visibleKeys, setVisibleKeys] = useState({})
  const [sending, setSending] = useState(false)
  const [messageForm, setMessageForm] = useState({
    deviceId: '',
    recipients: '',
    content: ''
  })

  const loadInitialData = async () => {
    try {
      setLoading(true)
      const [devicesRes, apiKeysRes, statsRes] = await Promise.all([
        deviceAPI.getDevices(),
        deviceAPI.getApiKeys(),
        statsService.getStats()
      ])
      
      setDevices(devicesRes)
      setApiKeys(apiKeysRes)
      setStats(statsRes.data)
    } catch (error) {
      console.error('Failed to load initial data:', error)
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadInitialData()
  }, [])

  const toggleKeyVisibility = (keyId) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const copyApiKey = (key) => {
    navigator.clipboard.writeText(key)
    toast({
      title: "Success",
      description: "API key copied to clipboard"
    })
  }

  const handleGenerateApiKey = async () => {
    try {
      const response = await deviceAPI.generateApiKey()
      
      if (response && response.key) {
        setNewApiKey(response.key)
        setApiKeys(prev => [...prev, {
          id: response.id,
          key: response.key,
          createdAt: new Date().toISOString(),
          active: true
        }])
        setStats(prev => ({
          ...prev,
          apiKeys: prev.apiKeys + 1
        }))
        
        setVisibleKeys(prev => ({
          ...prev,
          [response.id]: true
        }))

        toast({
          title: "Success",
          description: "Make sure to copy your API key. You won't be able to see it again!",
          variant: "warning"
        })
      }
    } catch (error) {
      console.error('Failed to generate API key:', error)
      toast({
        title: "Error",
        description: "Failed to generate API key",
        variant: "destructive"
      })
    }
  }

  const handleRevokeApiKey = async (keyId) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, active: false } : key
    ))
    setStats(prev => ({
      ...prev,
      apiKeys: prev.apiKeys - 1
    }))

    try {
      await deviceAPI.revokeApiKey(keyId)
      toast({
        title: "Success",
        description: "API key revoked successfully"
      })
    } catch (error) {
      setApiKeys(prev => prev.map(key => 
        key.id === keyId ? { ...key, active: true } : key
      ))
      setStats(prev => ({
        ...prev,
        apiKeys: prev.apiKeys + 1
      }))
      toast({
        title: "Error",
        description: "Failed to revoke API key",
        variant: "destructive"
      })
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const recipients = messageForm.recipients.split(',').map(r => r.trim())
    
    if (!validatePhoneNumbers(recipients)) {
      toast({
        title: "Validation Error",
        description: "Please enter valid phone numbers",
        variant: "destructive"
      })
      return
    }

    try {
      setSending(true)
      const messagePayload = {
        deviceId: messageForm.deviceId,
        recipients,
        content: messageForm.content
      }
      
      const response = await messageAPI.sendMessage(messagePayload)
      
      setMessages(prev => [response.data, ...prev])
      setStats(prev => ({
        ...prev,
        smsSent: prev.smsSent + 1
      }))
      
      setMessageForm({ deviceId: '', recipients: '', content: '' })
      toast({
        title: "Success",
        description: "Message sent successfully"
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      })
    } finally {
      setSending(false)
    }
  }

  const StatsSection = () => (
    <div className="grid gap-4 md:grid-cols-4">
      {[
        { title: 'Total Devices', value: stats.devices, icon: <Smartphone className="h-4 w-4 text-primary" /> },
        { title: 'API Keys', value: stats.apiKeys, icon: <Key className="h-4 w-4 text-primary" /> },
        { title: 'Messages Sent', value: stats.smsSent, icon: <Send className="h-4 w-4 text-primary" /> },
        { title: 'Messages Received', value: stats.smsReceived, icon: <MessageSquare className="h-4 w-4 text-primary" /> }
      ].map(({ title, value, icon }) => (
        <Card key={title}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              {icon}
              <div className="text-2xl font-bold">{value}</div>
            </div>
            <p className="text-xs text-muted-foreground">{title}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-10 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <StatsSection />
        
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="devices">Devices & API Keys</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="devices">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Connected Devices</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Seen</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {devices.map(device => (
                          <TableRow key={device.id}>
                            <TableCell>{device.name}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                device.status === 'online' ? 'bg-green-100 text-green-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {device.status}
                              </span>
                            </TableCell>
                            <TableCell>{formatDate(device.lastSeen)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">API Keys</h3>
                      <Button onClick={handleGenerateApiKey}>
                        Generate New Key
                      </Button>
                    </div>
                    
                    {newApiKey && (
                      <Alert className="mb-4">
                        <AlertDescription className="flex items-center justify-between">
                          <div className="font-mono">
                            {visibleKeys['new'] 
                              ? newApiKey
                              : `${newApiKey.substring(0, 8)}................................${newApiKey.substring(newApiKey.length - 8)}`
                            }
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setVisibleKeys(prev => ({
                                ...prev,
                                new: !prev.new
                              }))}
                            >
                              {visibleKeys['new'] ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyApiKey(newApiKey)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Key</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {apiKeys.map(key => (
                          <TableRow key={key.id}>
                            <TableCell className="font-mono">
                              <div className="flex items-center space-x-2">
                                <span>
                                  {visibleKeys[key.id] 
                                    ? key.key
                                    : `${key.key?.substring(0, 8)}................................${key.key?.substring(key.key?.length - 8)}`
                                  }
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleKeyVisibility(key.id)}
                                >
                                  {visibleKeys[key.id] ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyApiKey(key.key)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(key.createdAt)}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                key.active ? 'bg-green-100 text-green-800' : 
                                'bg-red-100 text-red-800'
                              }`}>
                                {key.active ? 'Active' : 'Revoked'}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => handleRevokeApiKey(key.id)}
                                disabled={!key.active}
                              >
                                Revoke
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="messages">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Send Message</h3>
                    <form onSubmit={handleSendMessage} className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select Device</Label>
                        <Select
                          value={messageForm.deviceId}
                          onValueChange={(value) => setMessageForm({...messageForm, deviceId: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a device..." />
                          </SelectTrigger>
                          <SelectContent>
                            {devices.map(device => (
                              <SelectItem key={device.id} value={device.id}>
                                {device.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Recipients</Label>
                        <Input 
                          placeholder="Enter phone numbers (comma separated)"
                          value={messageForm.recipients}
                          onChange={e => setMessageForm({...messageForm, recipients: e.target.value})}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Message</Label>
                        <Textarea 
                          placeholder="Type your message here..."
                          value={messageForm.content}
                          onChange={e => setMessageForm({...messageForm, content: e.target.value})}
                        />
                      </div>

                      <Button type="submit" disabled={sending}>
                        {sending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          'Send Message'
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Messages</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Recipient</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Sent At</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {messages.map(message => (
                          <TableRow key={message.id}>
                            <TableCell>{message.recipient}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(message.status)}`}>
                                {message.status}
                              </span>
                            </TableCell>
                            <TableCell>{formatDate(message.sentAt)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
