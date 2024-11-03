
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  )
}
