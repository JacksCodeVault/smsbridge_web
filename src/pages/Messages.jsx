import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link, useNavigate } from "react-router-dom"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"
import { MainNav } from "@/components/MainNav"
import { authService } from "@/services/authService"

export default function Messages() {
  const navigate = useNavigate()

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
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Messages</h1>
            <Link to="/messages/new">
  <Button>
    <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
    New Message
  </Button>
</Link>

          </div>

          {/* Message History */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border">
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pb-4">Time</th>
                      <th className="pb-4">Device</th>
                      <th className="pb-4">Recipient</th>
                      <th className="pb-4">Message</th>
                      <th className="pb-4">Type</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="py-3">2024-01-11 14:23</td>
                      <td>Pixel 6</td>
                      <td>+1234567890</td>
                      <td className="max-w-xs truncate">Hello, this is a test message...</td>
                      <td>Outbound</td>
                      <td><span className="text-green-500">Delivered</span></td>
                    </tr>
                    <tr>
                      <td className="py-3">2024-01-11 14:20</td>
                      <td>Galaxy S21</td>
                      <td>+0987654321</td>
                      <td className="max-w-xs truncate">Incoming message content...</td>
                      <td>Inbound</td>
                      <td><span className="text-green-500">Received</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
