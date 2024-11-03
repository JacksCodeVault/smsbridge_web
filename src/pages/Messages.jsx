import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link } from "react-router-dom"
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline"
import { MainNav } from "@/components/MainNav"
import { authService } from "@/services/authService"
import { messageService } from "@/services/messageService"
import { useNavigate } from 'react-router-dom'

export default function Messages() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const messagesData = await messageService.getMessages()
      setMessages(messagesData.sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      ))
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-500'
      case 'failed':
        return 'text-red-500'
      case 'pending':
        return 'text-yellow-500'
      default:
        return 'text-gray-500'
    }
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

          <div className="space-y-6">
            <div className="bg-card rounded-lg border">
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-4">Loading messages...</div>
                ) : (
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
                      {messages.map(message => (
                        <tr key={message.id}>
                          <td className="py-3">
                            {new Date(message.createdAt).toLocaleString()}
                          </td>
                          <td>{message.deviceId}</td>
                          <td>{message.recipient}</td>
                          <td className="max-w-xs truncate">
                            {message.content}
                          </td>
                          <td className="capitalize">{message.type}</td>
                          <td>
                            <span className={getStatusColor(message.status)}>
                              {message.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {messages.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            No messages found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
