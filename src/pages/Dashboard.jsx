import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

const analyticsData = [
  { time: '00:00', messages: 12 },
  { time: '03:00', messages: 8 },
  { time: '06:00', messages: 15 },
  { time: '09:00', messages: 45 },
  { time: '12:00', messages: 68 },
  { time: '15:00', messages: 80 },
  { time: '18:00', messages: 55 },
  { time: '21:00', messages: 25 }
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="text-2xl font-bold">SMSBridge</Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, User</h1>
            <p className="text-muted-foreground">Here's what's happening with your messages</p>
          </div>
          <Button>
            New Message <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <PhoneIcon className="h-5 w-5" />
                <span>Active Devices</span>
              </div>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                <span>Messages Today</span>
              </div>
              <div className="text-2xl font-bold">147</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <ChartBarIcon className="h-5 w-5" />
                <span>Success Rate</span>
              </div>
              <div className="text-2xl font-bold">99.8%</div>
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

        {/* Analytics Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Message Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
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

        {/* Recent Activity */}
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
                  <tr>
                    <td className="py-3">2024-01-11 14:23</td>
                    <td>Pixel 6</td>
                    <td>Outbound SMS</td>
                    <td><span className="text-green-500">Delivered</span></td>
                  </tr>
                  <tr>
                    <td className="py-3">2024-01-11 14:20</td>
                    <td>Galaxy S21</td>
                    <td>Inbound SMS</td>
                    <td><span className="text-green-500">Received</span></td>
                  </tr>
                  <tr>
                    <td className="py-3">2024-01-11 14:15</td>
                    <td>OnePlus 9</td>
                    <td>Outbound SMS</td>
                    <td><span className="text-yellow-500">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}