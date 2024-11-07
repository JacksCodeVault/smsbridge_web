import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authService } from '@/services/authService'
import { toast } from '@/components/ui/use-toast'
import { Loader2, ArrowLeft } from 'lucide-react'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('request') // 'request' or 'reset'
  const [email, setEmail] = useState('')
  const [resetData, setResetData] = useState({
    otp: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleRequestReset = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      await authService.requestPasswordReset(email)
      toast({
        title: "Success",
        description: "If an account exists with that email, you'll receive a reset code"
      })
      setStep('reset')
    } catch (error) {
      toast({
        title: "Request failed",
        description: error.response?.data?.message || "Failed to send reset code",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    
    if (resetData.newPassword !== resetData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      })
      return
    }

    try {
      setLoading(true)
      await authService.resetPassword({
        email,
        otp: resetData.otp,
        newPassword: resetData.newPassword
      })
      toast({
        title: "Success",
        description: "Password has been reset successfully"
      })
      navigate('/login')
    } catch (error) {
      toast({
        title: "Reset failed",
        description: error.response?.data?.message || "Failed to reset password",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => step === 'request' ? navigate('/login') : setStep('request')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Reset Password</h1>
        </div>

        {step === 'request' ? (
          <form onSubmit={handleRequestReset} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                required
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
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
                  Sending Reset Code...
                </>
              ) : (
                'Send Reset Code'
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label>Reset Code</Label>
              <Input
                required
                disabled={loading}
                value={resetData.otp}
                onChange={(e) => setResetData({...resetData, otp: e.target.value})}
                placeholder="Enter the reset code"
              />
            </div>

            <div className="space-y-2">
              <Label>New Password</Label>
              <Input
                type="password"
                required
                disabled={loading}
                value={resetData.newPassword}
                onChange={(e) => setResetData({...resetData, newPassword: e.target.value})}
                placeholder="Enter new password"
              />
            </div>

            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                required
                disabled={loading}
                value={resetData.confirmPassword}
                onChange={(e) => setResetData({...resetData, confirmPassword: e.target.value})}
                placeholder="Confirm new password"
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
                  Resetting Password...
                </>
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>
        )}

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Remember your password?{' '}
          <Button 
            variant="link" 
            className="p-0" 
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </div>
      </Card>
    </div>
  )
}
