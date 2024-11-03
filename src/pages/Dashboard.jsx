import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from 'react-router-dom'
import { 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowRightIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline"
import { MainNav } from "@/components/MainNav"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { authService } from '@/services/authService'
import { deviceService } from '@/services/deviceService'
import { messageService } from '@/services/messageService'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [devices, setDevices] = useState([])
  const [messageStats, setMessageStats] = useState({
    sentCount: 0,
    successRate: '0%',
    hourlyActivity: []
  })
  const [recentActivity, setRecentActivity] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser()
        setUser(userData)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch devices
        const devicesData = await deviceService.getDevices()
        setDevices(devicesData)

        // Fetch messages and calculate stats
        const messages = await messageService.getMessages()
        
        const sentMessages = messages.filter(msg => 
          msg.type === 'outbound'
        )

        const deliveredMessages = messages.filter(msg => 
          msg.status === 'delivered'
        )

        const successRate = messages.length > 0 
          ? ((deliveredMessages.length / messages.length) * 100).toFixed(1)
          : 100

        // Calculate hourly activity
        const hourlyData = messages.reduce((acc, msg) => {
          const hour = new Date(msg.createdAt).getHours()
          acc[hour] = (acc[hour] || 0) + 1
          return acc
        }, {})

        const hourlyActivity = Array.from({ length: 24 }, (_, i) => ({
          time: `${i.toString().padStart(2, '0')}:00`,
          messages: hourlyData[i] || 0
        }))

        setMessageStats({
          sentCount: sentMessages.length,
          successRate: `${successRate}%`,
          hourlyActivity
        })

        // Get recent activity
        const recent = messages
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10)
        setRecentActivity(recent)

      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      }
    }

    fetchDashboardData()
  }, [])

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.firstName || 'User'}
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your messages
            </p>
          </div>
          <Button onClick={() => navigate('/messages/new')}>
            New Message <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <PhoneIcon className="h-5 w-5" />
                <span>Active Devices</span>
              </div>
              <div className="text-2xl font-bold">{devices.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                <span>Messages Sent</span>
              </div>
              <div className="text-2xl font-bold">{messageStats.sentCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <ChartBarIcon className="h-5 w-5" />
                <span>Success Rate</span>
              </div>
              <div className="text-2xl font-bold">{messageStats.successRate}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <Cog6ToothIcon className="h-5 w-5" />
                <span>API Status</span>
              </div>
              <div className="text-2xl font-bold text-green-500">Active</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Message Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={messageStats.hourlyActivity}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="time"
                    className="text-sm text-muted-foreground"
                  />
                  <YAxis 
                    className="text-sm text-muted-foreground"
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }}
                    labelStyle={{
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="messages" 
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="pb-4">Time</th>
                    <th className="pb-4">Device</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentActivity.map(activity => (
                    <tr key={activity.id}>
                      <td className="py-3">{new Date(activity.createdAt).toLocaleString()}</td>
                      <td>{activity.deviceId}</td>
                      <td>{activity.type}</td>
                      <td>
                        <span className={`text-${activity.status === 'delivered' ? 'green' : 'yellow'}-500`}>
                          {activity.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
