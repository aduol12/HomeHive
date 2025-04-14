"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function RegisterPage() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [error, setError] = useState<string | null>(null)

  interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement
    password: HTMLInputElement
    name: HTMLInputElement
  }

  interface RegisterForm extends HTMLFormElement {
    readonly elements: FormElements
  }

  const handleSubmit = async (e: React.FormEvent<RegisterForm>) => {
    e.preventDefault()
    setError(null)
    
    try {
      const response = await fetch(`${window.location.origin}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: e.currentTarget.elements.email.value,
          password: e.currentTarget.elements.password.value,
          name: e.currentTarget.elements.name.value,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      console.log('Registration successful:', data)
      setIsOpen(false)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Registration error:', error.message)
        setError(error.message)
      } else {
        console.error('Registration error:', 'An unknown error occurred')
        setError('An unknown error occurred')
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Join HomeHive to find your perfect property or list your real estate</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label>Account Type</label>
              <RadioGroup defaultValue="buyer" className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="buyer" id="buyer" />
                  <Label htmlFor="buyer" className="font-normal">
                    Buyer/Renter
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="owner" id="owner" />
                  <Label htmlFor="owner" className="font-normal">
                    Property Owner
                  </Label>
                </div>
              </RadioGroup>
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
