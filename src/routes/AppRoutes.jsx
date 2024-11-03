  import { Routes, Route } from 'react-router-dom'
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

  export default function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/messages/new" element={<NewMessage />} />
        <Route path="/devices/new" element={<NewDevice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    )
  }