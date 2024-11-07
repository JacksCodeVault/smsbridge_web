  import { createContext, useContext, useState, useEffect } from 'react'
  import authService from '@/services/authService'
  import { getStoredUser } from '@/utils/helpers'
  import { toast } from '@/components/ui/use-toast'

  const AuthContext = createContext()

  export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initialUser = getStoredUser()
    if (initialUser) {
      setUser(initialUser)
    }
    setLoading(false)
  }, [])

  // Remove the automatic redirect in checkAuth
  const checkAuth = async () => {
    try {
      const response = await authService.whoAmI()
      setUser(response.data)
    } catch (error) {
      setUser(null)
    }
  }
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)
      setUser(response.user)
      toast({
        title: "Welcome back!",
        description: "Successfully logged in"
      })
      return response
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive"
      })
      throw error
    }
  }
  

    const register = async (userData) => {
      try {
        const response = await authService.register(userData)
        setUser(response.data.user)
        toast({
          title: "Welcome!",
          description: "Account created successfully"
        })
        return response
      } catch (error) {
        toast({
          title: "Registration failed",
          description: error.response?.data?.message || "Failed to create account",
          variant: "destructive"
        })
        throw error
      }
    }

    const updateProfile = async (profileData) => {
      try {
        const response = await authService.updateProfile(profileData)
        setUser(response.data)
        toast({
          title: "Success",
          description: "Profile updated successfully"
        })
        return response
      } catch (error) {
        toast({
          title: "Update failed",
          description: error.response?.data?.message || "Failed to update profile",
          variant: "destructive"
        })
        throw error
      }
    }

    const logout = () => {
      authService.logout()
      setUser(null)
      toast({
        title: "Logged out",
        description: "Successfully logged out"
      })
    }

    const value = {
      user,
      loading,
      login,
      register,
      logout,
      updateProfile,
      checkAuth
    }

    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    )
  }

  export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
  }
