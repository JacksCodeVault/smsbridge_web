import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link, useNavigate } from "react-router-dom"
import { MainNav } from "@/components/MainNav"
import { authService } from '@/services/authService'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Settings() {
  const navigate = useNavigate()

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure? This action cannot be undone.')) {
      try {
        await authService.deleteAccount()
        authService.logout(); // Terminate session
        navigate('/login')
      } catch (error) {
        console.error('Failed to delete account:', error)
      }
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
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Settings</h1>
          
          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Email Notifications</h3>
                  <p className="text-muted-foreground mb-2">Manage your email notification preferences</p>
                  <Button variant="outline">Configure</Button>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Change Password</h3>
                  <p className="text-muted-foreground mb-2">Update your account password</p>
                  <Button variant="outline">Update</Button>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-2xl font-bold mb-4">Application Settings</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Theme Preferences</h3>
                  <p className="text-muted-foreground mb-2">Customize the application appearance</p>
                  <ThemeToggle />
                </div>
                <div>
                  <h3 className="font-medium mb-2">Message Templates</h3>
                  <p className="text-muted-foreground mb-2">Manage your message templates</p>
                  <Button variant="outline">Manage Templates</Button>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border p-6">
              <h2 className="text-2xl font-bold mb-4">Danger Zone</h2>
              <div>
                <h3 className="font-medium mb-2">Delete Account</h3>
                <p className="text-muted-foreground mb-2">Permanently delete your account and all data</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete Account</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove all your data from our servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button 
                        variant="destructive"
                        onClick={handleDeleteAccount}
                      >
                        Delete Account
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}