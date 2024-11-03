import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link } from "react-router-dom"
import { 
  PhoneIcon, 
  LockClosedIcon, 
  BoltIcon,
  ArrowRightIcon,
  DevicePhoneMobileIcon,
  CloudArrowUpIcon,
  CommandLineIcon
} from "@heroicons/react/24/outline"

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">SMSBridge</div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold tracking-tighter">
            Connect, Monitor, and Manage SMS Data Seamlessly
          </h1>
          <p className="text-xl text-muted-foreground">
            A self-hosted SMS gateway that helps you manage and automate SMS messaging without relying on costly third-party services. Use your existing SIM card and mobile provider's SMS tariffs.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/learn-more">
  <Button size="lg" variant="outline">Learn More</Button>
</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24 border-t">
        <h2 className="text-3xl font-bold text-center mb-16">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4 text-center">
            <DevicePhoneMobileIcon className="h-12 w-12 mx-auto text-primary" />
            <h3 className="text-2xl font-bold">Seamless Device Linking</h3>
            <p className="text-muted-foreground">
              Connect your devices instantly with secure API keys for reliable communication
            </p>
          </div>
          <div className="space-y-4 text-center">
            <CloudArrowUpIcon className="h-12 w-12 mx-auto text-primary" />
            <h3 className="text-2xl font-bold">Real-Time Sync</h3>
            <p className="text-muted-foreground">
              Instant message synchronization with offline support for low connectivity areas
            </p>
          </div>
          <div className="space-y-4 text-center">
            <CommandLineIcon className="h-12 w-12 mx-auto text-primary" />
            <h3 className="text-2xl font-bold">Open Source</h3>
            <p className="text-muted-foreground">
              Fully customizable solution for personal or professional use
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">01</div>
              <h3 className="text-xl font-bold">Generate API Key</h3>
              <p className="text-muted-foreground">Create your unique API key from the web dashboard</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">02</div>
              <h3 className="text-xl font-bold">Configure Mobile App</h3>
              <p className="text-muted-foreground">Set up the mobile app using your generated API key</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl font-bold text-primary">03</div>
              <h3 className="text-xl font-bold">Start Managing</h3>
              <p className="text-muted-foreground">Begin sending and receiving messages in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-muted-foreground">
            Join us and experience seamless SMS management with complete control over your data
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Sign Up Now <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">SMSBridge</h3>
              <p className="text-sm text-muted-foreground">
                Open-source SMS gateway for seamless communication
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/learn-more#features">Features</Link></li>
                <li><Link to="/learn-more">Documentation</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/support">Support</Link></li>
                <li><Link to="/terms">Terms</Link></li>
                <li><Link to="/privacy">Privacy</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
                <li><a href="mailto:ojangoh2@outlook..com">Email</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 SMSBridge. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
