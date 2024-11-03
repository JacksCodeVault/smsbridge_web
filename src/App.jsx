import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from "@/components/theme-provider"
import AppRoutes from '@/routes/AppRoutes'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
  )
}

export default App