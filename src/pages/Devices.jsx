import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link } from "react-router-dom"
import { DevicePhoneMobileIcon } from "@heroicons/react/24/outline"
import { MainNav } from "@/components/MainNav"

export default function Devices() {
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
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Devices</h1>
            <Link to="/devices/new">
  <Button>
    <DevicePhoneMobileIcon className="h-4 w-4 mr-2" />
    Add Device
  </Button>
</Link>

          </div>

          {/* API Key Management */}
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">API Keys</h2>
              <Button>Generate New Key</Button>
            </div>
            <div className="bg-card rounded-lg border">
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pb-4">Key Name</th>
                      <th className="pb-4">Generated</th>
                      <th className="pb-4">Last Used</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="py-3">Primary Key</td>
                      <td>2024-01-11</td>
                      <td>2024-01-11 14:23</td>
                      <td><span className="text-green-500">Active</span></td>
                      <td>
                        <Button variant="ghost" size="sm">Revoke</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Connected Devices */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Connected Devices</h2>
            <div className="bg-card rounded-lg border">
              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-muted-foreground">
                      <th className="pb-4">Device Name</th>
                      <th className="pb-4">Device ID</th>
                      <th className="pb-4">Last Active</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr>
                      <td className="py-3">Pixel 6</td>
                      <td>DEV_123456</td>
                      <td>2024-01-11 14:23</td>
                      <td><span className="text-green-500">Online</span></td>
                      <td>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-destructive-foreground">Remove</Button>
                        </div>
                      </td>
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
