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

export default function NewMessage() {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Backend implementation will go here
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
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="device1">Pixel 6</SelectItem>
                  <SelectItem value="device2">Galaxy S21</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input 
                id="recipient" 
                type="tel" 
                placeholder="+251912345678"
                required 
              />
              <p className="text-sm text-muted-foreground">Enter phone number in international format</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Type your message here" 
                required
                className="min-h-[150px]"
              />
            </div>

            <Button type="submit" className="w-full">
              <PaperAirplaneIcon className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
