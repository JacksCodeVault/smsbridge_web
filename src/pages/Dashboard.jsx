import { useState, useEffect } from 'react'
import { Navbar } from "@/components/common/Navbar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useGateway } from "@/context/GatewayContext"
import { toast } from "@/components/ui/use-toast"
import { Loader2, Smartphone, Key, Send, MessageSquare } from "lucide-react"
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

export default function Dashboard() {
  const { 
    devices, 
    apiKeys, 
    stats, 
    loading,
    generateApiKey,
    deleteApiKey,
    sendSMS,
    refreshStats 
  } = useGateway()

  const [activeTab, setActiveTab] = useState("devices")
  const [newApiKey, setNewApiKey] = useState(null)
  const [sending, setSending] = useState(false)
  const [smsForm, setSmsForm] = useState({
    device: '',
    recipients: '',
    message: ''
  })

  // Refresh stats every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshStats, 30000)
    return () => clearInterval(interval)
  }, [refreshStats])

  const handleGenerateApiKey = async () => {
    try {
      const key = await generateApiKey()
      setNewApiKey(key.value)
    } catch (error) {
      // Error handling is managed by GatewayContext
    }
  }

  const handleSendSMS = async (e) => {
    e.preventDefault()
    if (!smsForm.device || !smsForm.recipients || !smsForm.message) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      })
      return
    }

    try {
      setSending(true)
      await sendSMS(smsForm.device, {
        recipients: smsForm.recipients.split(',').map(r => r.trim()),
        message: smsForm.message
      })
      setSmsForm({ device: '', recipients: '', message: '' })
    } finally {
      setSending(false)
    }
  }

  const StatsSection = () => (
    <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
      {[
        { title: 'Total Devices', value: stats?.devices || 0, icon: <Smartphone className="h-4 w-4 text-primary" /> },
        { title: 'API Keys', value: stats?.apiKeys || 0, icon: <Key className="h-4 w-4 text-primary" /> },
        { title: 'SMS Sent', value: stats?.smsSent || 0, icon: <Send className="h-4 w-4 text-primary" /> },
        { title: 'SMS Received', value: stats?.smsReceived || 0, icon: <MessageSquare className="h-4 w-4 text-primary" /> }
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
          <Tabs defaultValue="devices" className="w-full">
            <TabsList>
              <TabsTrigger value="devices">Devices & API Keys</TabsTrigger>
              <TabsTrigger value="send">Send SMS</TabsTrigger>
              <TabsTrigger value="receive">Receive SMS</TabsTrigger>
            </TabsList>

            <TabsContent value="devices">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-semibold mb-4">Devices</h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Device</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Device ID</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {devices.map(device => (
                          <TableRow key={device.id}>
                            <TableCell>{device.name}</TableCell>
                            <TableCell>{device.status}</TableCell>
                            <TableCell>{device.deviceId}</TableCell>
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
                        <AlertDescription>
                          New API Key: {newApiKey}
                        </AlertDescription>
                      </Alert>
                    )}
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>API Key</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {apiKeys.map(key => (
                          <TableRow key={key.id}>
                            <TableCell>{key.value}</TableCell>
                            <TableCell>{key.status}</TableCell>
                            <TableCell>
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => deleteApiKey(key.id)}
                              >
                                Delete
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

            <TabsContent value="send">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSendSMS} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Device</Label>
                      <Select
                        value={smsForm.device}
                        onValueChange={(value) => setSmsForm({...smsForm, device: value})}
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
                        value={smsForm.recipients}
                        onChange={e => setSmsForm({...smsForm, recipients: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Message</Label>
                      <Textarea 
                        placeholder="Type your message here..."
                        value={smsForm.message}
                        onChange={e => setSmsForm({...smsForm, message: e.target.value})}
                      />
                    </div>

                    <Button type="submit" disabled={sending}>
                      {sending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send SMS'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="receive">
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>From</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Received At</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {stats?.recentMessages?.map(sms => (
                        <TableRow key={sms.id}>
                          <TableCell>{sms.from}</TableCell>
                          <TableCell>{sms.message}</TableCell>
                          <TableCell>{new Date(sms.receivedAt).toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
