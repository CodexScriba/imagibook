import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { login, signup } from './actions'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="Enter your email"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                placeholder="Enter your password"
                required 
              />
            </div>
            <CardFooter className="flex justify-between px-0">
              <Button formAction={login} className="w-[48%]">
                Log in
              </Button>
              <Button formAction={signup} variant="outline" className="w-[48%]">
                Sign up
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}