import { useState } from 'react'
import { Navbar } from "@/components/common/Navbar"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  CommandLineIcon,
  CodeBracketIcon,
  ServerIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline"

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('getting-started')

  const sections = {
    'getting-started': {
      title: 'Getting Started',
      content: `
        # Quick Start Guide

        ## Installation
        \`\`\`bash
        git clone https://github.com/yourusername/smsbridge
        cd smsbridge
        npm install
        \`\`\`

        ## Configuration
        1. Create a .env file
        2. Set up your environment variables
        3. Configure your database

        ## Running the Application
        \`\`\`bash
        npm run dev
        \`\`\`
      `
    },
    'api-reference': {
      title: 'API Reference',
      content: `
        # API Documentation

        ## Authentication
        All API requests require authentication using API keys.

        ### Send SMS
        \`\`\`javascript
        POST /api/v1/sms/send
        {
          "to": "+1234567890",
          "message": "Hello from SMSBridge"
        }
        \`\`\`

        ### Get Devices
        \`\`\`javascript
        GET /api/v1/devices
        \`\`\`
      `
    },
    'android-setup': {
      title: 'Android Setup',
      content: `
        # Android Device Setup

        1. Install the SMSBridge Android app
        2. Generate an API key from the dashboard
        3. Link your device using the API key
        4. Grant necessary permissions
      `
    },
    'integration': {
      title: 'Integration Guide',
      content: `
        # Integration Examples

        ## Node.js
        \`\`\`javascript
        const SMSBridge = require('smsbridge-client');
        
        const client = new SMSBridge({
          apiKey: 'your-api-key'
        });

        await client.sendSMS({
          to: '+1234567890',
          message: 'Hello World'
        });
        \`\`\`
      `
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
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-10">
        <motion.div 
          className="grid grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Sidebar Navigation */}
          <motion.div 
            className="col-span-1 space-y-2"
            variants={itemVariants}
          >
            {Object.entries(sections).map(([key, section]) => (
              <Button
                key={key}
                variant={activeSection === key ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveSection(key)}
              >
                {section.title}
              </Button>
            ))}
          </motion.div>

          {/* Main Content */}
          <motion.div 
            className="col-span-3 prose dark:prose-invert max-w-none"
            variants={itemVariants}
          >
            <div className="bg-card rounded-lg p-6">
              <h1 className="text-3xl font-bold mb-6">{sections[activeSection].title}</h1>
              <pre className="whitespace-pre-wrap">
                {sections[activeSection].content}
              </pre>
            </div>

            {/* Quick Reference Cards */}
            <div className="grid grid-cols-2 gap-6 mt-6">
              <motion.div 
                className="bg-card rounded-lg p-6"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="https://github.com/yourusername/smsbridge" 
                       className="text-primary hover:underline"
                       target="_blank" 
                       rel="noopener noreferrer">
                      GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a href="/examples" 
                       className="text-primary hover:underline">
                      Example Projects
                    </a>
                  </li>
                  <li>
                    <a href="/community" 
                       className="text-primary hover:underline">
                      Community Forums
                    </a>
                  </li>
                </ul>
              </motion.div>

              <motion.div 
                className="bg-card rounded-lg p-6"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                <p className="text-muted-foreground mb-4">
                  Join our community for support and discussions.
                </p>
                <Button variant="outline" className="w-full">
                  Join Discord
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
