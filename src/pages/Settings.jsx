import { useState, useEffect } from 'react'
import { Navbar } from "@/components/common/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/AuthContext"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Settings() {
  const { user, updateProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    account: {
      timezone: 'UTC',
      language: 'en',
      dateFormat: 'MM/DD/YYYY'
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: '30',
      ipWhitelist: ''
    },
    notifications: {
      emailDigest: true,
      smsAlerts: false,
      deviceOffline: true,
      lowBalance: true
    },
    api: {
      webhookUrl: '',
      retryAttempts: '3',
      timeout: '30'
    }
  })

  useEffect(() => {
    if (user?.settings) {
      setSettings(user.settings)
    }
  }, [user])

  const handleSettingUpdate = async (category, key, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    }
    setSettings(newSettings)

    try {
      setLoading(true)
      await updateProfile({ settings: newSettings })
      toast({
        title: "Settings updated",
        description: "Your preferences have been saved"
      })
    } catch (error) {
      // Error handling is managed by AuthContext
    } finally {
      setLoading(false)
    }
  }

  const handleSaveApiSettings = async () => {
    try {
      setLoading(true)
      await updateProfile({ settings })
      toast({
        title: "API settings updated",
        description: "Your API configuration has been saved"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
          </Card>

          <Tabs defaultValue="account" className="w-full">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="api">API Configuration</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Timezone</Label>
                    <Select
                      value={settings.account.timezone}
                      onValueChange={(value) => handleSettingUpdate('account', 'timezone', value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">EST</SelectItem>
                        <SelectItem value="PST">PST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select
                      value={settings.account.language}
                      onValueChange={(value) => handleSettingUpdate('account', 'language', value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Format</Label>
                    <Select
                      value={settings.account.dateFormat}
                      onValueChange={(value) => handleSettingUpdate('account', 'dateFormat', value)}
                      disabled={loading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable 2FA for additional security
                      </p>
                    </div>
                    <Switch
                      checked={settings.security.twoFactorAuth}
                      onCheckedChange={(checked) => 
                        handleSettingUpdate('security', 'twoFactorAuth', checked)
                      }
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Session Timeout (minutes)</Label>
                    <Input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleSettingUpdate('security', 'sessionTimeout', e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>IP Whitelist</Label>
                    <Input
                      placeholder="Enter comma-separated IP addresses"
                      value={settings.security.ipWhitelist}
                      onChange={(e) => handleSettingUpdate('security', 'ipWhitelist', e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Digest</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive daily summary of activities
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.emailDigest}
                      onCheckedChange={(checked) => 
                        handleSettingUpdate('notifications', 'emailDigest', checked)
                      }
                      disabled={loading}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get important notifications via SMS
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.smsAlerts}
                      onCheckedChange={(checked) => 
                        handleSettingUpdate('notifications', 'smsAlerts', checked)
                      }
                      disabled={loading}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Device Offline Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Notify when a device goes offline
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications.deviceOffline}
                      onCheckedChange={(checked) => 
                        handleSettingUpdate('notifications', 'deviceOffline', checked)
                      }
                      disabled={loading}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="api">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label>Webhook URL</Label>
                    <Input
                      placeholder="https://your-webhook-url.com"
                      value={settings.api.webhookUrl}
                      onChange={(e) => handleSettingUpdate('api', 'webhookUrl', e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Retry Attempts</Label>
                    <Input
                      type="number"
                      value={settings.api.retryAttempts}
                      onChange={(e) => handleSettingUpdate('api', 'retryAttempts', e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Request Timeout (seconds)</Label>
                    <Input
                      type="number"
                      value={settings.api.timeout}
                      onChange={(e) => handleSettingUpdate('api', 'timeout', e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <Button 
                    onClick={handleSaveApiSettings}
                    className="mt-4"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save API Settings'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
