import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import authService from '@/services/authService'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      console.log('Login attempt with:', { email: formData.email })
      
      const response = await authService.login(formData.email, formData.password)
      console.log('Login successful:', response)
      
      toast({
        title: "Welcome back!",
        description: "Login successful",
      })
      navigate('/dashboard', { replace: true })
    } catch (error) {
      console.error('Login failed:', error)
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
}
 
  return (
    <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              required
              disabled={loading}
              value={formData.email}
              onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Password</Label>
              <Link 
                to="/reset-password" 
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              required
              disabled={loading}
              value={formData.password}
              onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
              placeholder="Enter your password"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/register" className="text-sm text-primary hover:underline">
            Don't have an account? Register
          </Link>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => authService.loginWithGoogle()}
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
            <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
            <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 16.0099 17.34 17.26 16.12 18.0949L19.93 21.1C22.1899 19.0099 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
            <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 12C4.88501 11.2 5.01998 10.43 5.26498 9.70496L1.27002 6.60995C0.460022 8.22995 0 10.0599 0 12C0 13.9399 0.460022 15.7699 1.28497 17.3899L5.26498 14.2949Z" fill="#FBBC05"/>
            <path d="M12.0004 24C15.2404 24 17.9654 22.935 19.9304 21.095L16.1204 18.09C15.0454 18.8449 13.6204 19.25 12.0004 19.25C8.8704 19.25 6.21537 17.14 5.2704 14.295L1.28539 17.39C3.25539 21.31 7.31039 24 12.0004 24Z" fill="#34A853"/>
          </svg>
          Continue with Google
        </Button>
      </Card>
    </div>
  )
}