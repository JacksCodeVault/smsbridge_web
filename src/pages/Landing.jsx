import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { 
  DevicePhoneMobileIcon, 
  CloudArrowUpIcon,
  CommandLineIcon,
  CodeBracketIcon,
  UsersIcon,
  GlobeAltIcon,
  ServerIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline"

export default function Landing() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <motion.div 
          className="container mx-auto px-4 py-4 flex justify-between items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-2xl font-bold">SMSBridge</div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to ="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <a href="https://github.com/JacksCodeVault/smsbridge_web" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">GitHub</Button>
            </a>

            <Link to="/docs">
              <Button variant="ghost">Docs</Button>
            </Link>
          </div>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <motion.div 
          className="text-center space-y-6 max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h1 
            className="text-6xl font-bold tracking-tighter"
            variants={fadeIn}
          >
            Open Source SMS Gateway for Developers
          </motion.h1>
          <motion.p 
            className="text-xl text-muted-foreground"
            variants={fadeIn}
          >
            Transform your Android device into a powerful SMS gateway. Free, open-source, and built for developers.
          </motion.p>
          <motion.div 
            className="flex justify-center gap-4"
            variants={fadeIn}
          >
            <a href="https://github.com/JacksCodeVault/smsbridge_web" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="gap-2">
                <CodeBracketIcon className="h-5 w-5" />
                View on GitHub
              </Button>
            </a>
            <Link to="/docs">
              <Button size="lg" variant="outline">Get Started</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24 border-t">
        <motion.h2 
          className="text-3xl font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Core Features
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: <DevicePhoneMobileIcon className="h-12 w-12 mx-auto text-primary" />,
              title: "Device Integration",
              description: "Connect multiple Android devices and manage them through a single interface"
            },
            {
              icon: <CloudArrowUpIcon className="h-12 w-12 mx-auto text-primary" />,
              title: "RESTful API",
              description: "Simple and powerful API for seamless integration with your applications"
            },
            {
              icon: <CommandLineIcon className="h-12 w-12 mx-auto text-primary" />,
              title: "Self Hosted",
              description: "Host on your own infrastructure with complete control over your data"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="space-y-4 text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              {feature.icon}
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Open Source Benefits */}
      <section className="bg-muted/50 py-24">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Open Source?
          </motion.h2>
          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: <GlobeAltIcon className="h-8 w-8" />, title: "Community Driven", description: "Built by developers, for developers" },
              { icon: <ShieldCheckIcon className="h-8 w-8" />, title: "Transparent", description: "Review and audit the code yourself" },
              { icon: <ServerIcon className="h-8 w-8" />, title: "Self Hosted", description: "Full control over your infrastructure" },
              { icon: <UsersIcon className="h-8 w-8" />, title: "Collaborative", description: "Contribute and shape the future" }
            ].map((benefit, index) => (
              <motion.div 
                key={index}
                className="space-y-4"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-primary">{benefit.icon}</div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Developer Resources */}
      <section className="container mx-auto px-4 py-24">
        <motion.h2 
          className="text-3xl font-bold text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Developer Resources
        </motion.h2>
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: <DocumentTextIcon className="h-12 w-12 mx-auto text-primary" />,
              title: "Documentation",
              description: "Comprehensive guides and API references",
              link: "/docs"
            },
            {
              icon: <CodeBracketIcon className="h-12 w-12 mx-auto text-primary" />,
              title: "Example Projects",
              description: "Sample implementations and use cases",
              link: "/examples"
            },
            {
              icon: <ChatBubbleLeftRightIcon className="h-12 w-12 mx-auto text-primary" />,
              title: "Community Support",
              description: "Get help from the developer community",
              link: "/community"
            }
          ].map((resource, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-6 text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              {resource.icon}
              <h3 className="text-xl font-bold mt-4">{resource.title}</h3>
              <p className="text-muted-foreground mt-2">{resource.description}</p>
              <Link to={resource.link}>
                <Button variant="outline" className="mt-4">Learn More</Button>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="container mx-auto px-4 py-24 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Join the Community</h2>
          <p className="text-muted-foreground">
            Contribute to SMSBridge and help shape the future of SMS integration
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://github.com/JacksCodeVault/smsbridge_web" target="_blank" rel="noopener noreferrer">
              <Button size="lg">Star on GitHub</Button>
            </a>
            <Link to="/docs">
              <Button size="lg" variant="outline">Read the Docs</Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">SMSBridge</h3>
              <p className="text-sm text-muted-foreground">
                Open-source SMS gateway for developers
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/docs">Documentation</Link></li>
                <li><Link to="/examples">Examples</Link></li>
                <li><Link to="/community">Community</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="https://github.com/JacksCodeVault/smsbridge_web" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://discord.gg/yourinvite" target="_blank" rel="noopener noreferrer">Discord</a></li>
                <li><Link to="/contribute">Contribute</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Use</Link></li>
                <li><Link to="/license">License</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} SMSBridge. Open source under MIT License.
          </div>
        </div>
      </footer>
    </div>
  )
}
