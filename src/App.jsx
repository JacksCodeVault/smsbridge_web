import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from '@/context/AuthContext'
import { GatewayProvider } from '@/context/GatewayContext'
import AppRoutes from '@/routes/AppRoutes'


function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <GatewayProvider>
          <Router>
            <AppRoutes />
          </Router>
        </GatewayProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App