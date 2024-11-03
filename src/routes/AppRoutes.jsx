  import { Routes, Route, Navigate } from 'react-router-dom'
  import Landing from '@/pages/Landing'
  import Dashboard from '@/pages/Dashboard'
  import Devices from '@/pages/Devices'
  import Messages from '@/pages/Messages'
  import Settings from '@/pages/Settings'
  import Login from '@/pages/Login'
  import Register from '@/pages/Register'
  import ForgotPassword from '@/pages/ForgotPassword'
  import LearnMore from '@/pages/LearnMore'
  import NewMessage from '@/pages/NewMessage'
  import NewDevice from '@/pages/NewDevice'
  import NotFound from '@/pages/NotFound'

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    if (!token) {
      return <Navigate to="/login" />
    }
    return children
  }

  export default function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/learn-more" element={<LearnMore />} />
      
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/devices" element={
          <ProtectedRoute>
            <Devices />
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="/messages/new" element={
          <ProtectedRoute>
            <NewMessage />
          </ProtectedRoute>
        } />
        <Route path="/devices/new" element={
          <ProtectedRoute>
            <NewDevice />
          </ProtectedRoute>
        } />
      
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
  }