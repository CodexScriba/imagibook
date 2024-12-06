"use client"

import { useState } from "react"
import { Eye, EyeOff, Facebook } from 'lucide-react'
import Link from "next/link"
import { login, signup } from "../actions" // Make sure the path is correct
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function AuthForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Card className="w-full max-w-[420px] bg-[#F7F9FC] dark:bg-[#1E1E1E]">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-[#333333] dark:text-[#E0E0E0]">
          Welcome to Imagibook.ai
        </CardTitle>
        <CardDescription className="text-center text-[#757575] dark:text-[#A0A0A0]">
          Where stories come alive!
        </CardDescription>
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
              className="h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-11 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-11 w-11 px-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-[#757575] dark:text-[#A0A0A0]" />
                ) : (
                  <Eye className="h-4 w-4 text-[#757575] dark:text-[#A0A0A0]" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              className="w-full h-11 bg-[#8A4FFF] hover:bg-[#7B61FF] text-white"
              formAction={login}
            >
              Sign In
            </Button>
            <Button
              className="w-full h-11"
              variant="outline"
              formAction={signup}
            >
              Sign Up
            </Button>
          </div>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#F7F9FC] dark:bg-[#1E1E1E] px-2 text-[#757575] dark:text-[#A0A0A0]">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button variant="outline" className="h-11">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </Button>
          <Button variant="outline" className="h-11">
            <Facebook className="mr-2 h-4 w-4 text-[#1877F2]" />
            Facebook
          </Button>
        </div>
        
        <div className="text-center text-sm">
          <span className="text-[#757575] dark:text-[#A0A0A0]">Already have an account? </span>
          <Link href="#" className="text-[#8A4FFF] hover:underline">
            Recover Password
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
