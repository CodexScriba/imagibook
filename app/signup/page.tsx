'use client'

import { useState } from 'react'
import { signup } from './actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await signup(formData)

    setIsLoading(false)

    if (result.success) {
      toast({
        title: "Yay! You're signed up!",
        description: "Welcome to our fun world of learning and adventure!",
        action: <ToastAction altText="Go to homepage">Let's Go!</ToastAction>,
      })
    } else {
      toast({
        variant: "destructive",
        title: "Uh-oh! Something went wrong.",
        description: result.error,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-purple-200 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-[90%] sm:max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-blue-600 mb-4 sm:mb-6">Join the Fun!</h2>
          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="email" className="text-base sm:text-lg">Your Email:</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                required 
                className="w-full p-2 sm:p-3 border-2 border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg">Secret Password:</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="w-full p-3 border-2 border-blue-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Let's Play!"}
            </Button>
          </form>
        </div>
        <div className="px-4 sm:px-8 py-4 sm:py-6 bg-blue-100 border-t border-blue-200">
          <p className="text-xs sm:text-sm text-center text-blue-600">
            Already have an account? <a href="/login" className="font-medium text-blue-700 hover:underline">Log in here</a>
          </p>
        </div>
      </div>
      <div className="hidden sm:block absolute bottom-4 left-4 w-16 h-16 sm:w-24 sm:h-24 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/placeholder.svg?height=96&width=96')" }} />
      <div className="hidden sm:block absolute top-4 right-4 w-16 h-16 sm:w-24 sm:h-24 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: "url('/placeholder.svg?height=96&width=96')" }} />    </div>
  )
}