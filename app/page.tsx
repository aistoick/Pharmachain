"use client"

import { useState } from "react"
import LoginPage from "@/components/login-page"
import Dashboard from "@/components/dashboard"

type UserRole = "manufacturer" | "distributor" | "pharmacy" | null

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [username, setUsername] = useState("")

  const handleLogin = (role: UserRole, name: string) => {
    setUserRole(role)
    setUsername(name)
    setAuthenticated(true)
  }

  const handleLogout = () => {
    setAuthenticated(false)
    setUserRole(null)
    setUsername("")
  }

  if (!authenticated) {
    return <LoginPage onLogin={handleLogin} />
  }

  return <Dashboard userRole={userRole} username={username} onLogout={handleLogout} />
}
