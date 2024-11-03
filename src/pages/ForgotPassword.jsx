import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <div className="w-full max-w-md space-y-8 p-8 bg-background rounded-lg shadow-lg">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground">
            Enter your email to receive a password reset link
          </p>
        </div>

        {/* Reset Form */}
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>

          <Button className="w-full" type="submit">
            Send Reset Link
          </Button>
        </form>

        {/* Back to Login */}
        <div className="text-center text-sm">
          Remember your password?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}
