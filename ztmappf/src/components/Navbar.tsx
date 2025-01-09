'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const router = useRouter()

  // const handleLogin = (email: string, password: string) => {
  //   // In a real app, you'd handle authentication here
  //   console.log('Login attempt:', email, password)
  //   setIsLoggedIn(true)
  //   setUserName(email.split('@')[0]) // Using email as username for demonstration
  // }
  //
  // const handleRegister = (name: string, email: string, password: string) => {
  //   // In a real app, you'd handle registration here
  //   console.log('Register attempt:', name, email, password)
  //   setIsLoggedIn(true)
  //   setUserName(name)
  // }
  //
  // const handleLogout = () => {
  //   setIsLoggedIn(false)
  //   setUserName('')
  //   // In a real app, you'd handle logout here
  // }

  const handleLogin = () => {
    setIsLoggedIn(true)
    // Fetch user details (optional)
  }

  const handleRegister = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3001/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies
      })
      setIsLoggedIn(false)
      setUserName('')
      router.push('/')
    } catch (error) {
      console.error('Failed to log out', error)
    }
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100">
      <Link href="/" className="text-xl font-bold">
        My App
      </Link>
      <div className="space-x-2">
        {isLoggedIn ? (
          <>
            <Button variant="ghost" onClick={() => router.push('/my-stops')}>
              My Stops
            </Button>
            <Button variant="ghost" onClick={() => router.push('/profile')}>
              {userName}
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <LoginForm onLogin={handleLogin} />
            <RegisterForm onRegister={handleRegister} />
          </>
        )}
      </div>
    </nav>
  )
}

