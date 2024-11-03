import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link } from "react-router-dom"

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">SMSBridge</Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Documentation Sections */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Introduction */}
          <section className="space-y-6">
            <h1 className="text-4xl font-bold">Documentation</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to set up and use SMSBridge for your messaging needs.
            </p>
          </section>

          {/* Getting Started */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Getting Started</h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">1. Create an Account</h3>
              <p className="text-muted-foreground">Sign up for a new account on the web platform.</p>
              
              <h3 className="text-2xl font-semibold">2. Generate API Key</h3>
              <p className="text-muted-foreground">Create an API key from your dashboard settings.</p>
              
              <h3 className="text-2xl font-semibold">3. Install Mobile App</h3>
              <p className="text-muted-foreground">Download and install the SMSBridge mobile app from the Play Store.</p>
              
              <h3 className="text-2xl font-semibold">4. Connect Device</h3>
              <p className="text-muted-foreground">Enter your API key in the mobile app to link your device.</p>
            </div>
          </section>

          {/* Web Platform Features */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Web Platform Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Dashboard Overview</h3>
                <p className="text-muted-foreground">Monitor message statistics and device status.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Message Management</h3>
                <p className="text-muted-foreground">Send, receive, and track all SMS messages.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Device Control</h3>
                <p className="text-muted-foreground">Manage connected devices and permissions.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">API Integration</h3>
                <p className="text-muted-foreground">Integrate SMS capabilities into your applications.</p>
              </div>
            </div>
          </section>

          {/* Mobile App Features */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Mobile App Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Background Service</h3>
                <p className="text-muted-foreground">Reliable message forwarding even when app is in background.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Battery Optimization</h3>
                <p className="text-muted-foreground">Efficient power usage for extended operation.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Offline Support</h3>
                <p className="text-muted-foreground">Message queueing during connection loss.</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Security</h3>
                <p className="text-muted-foreground">End-to-end encryption for message transmission.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
