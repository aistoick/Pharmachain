"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Pill, Truck, Store, Lock } from "lucide-react"

type UserRole = "manufacturer" | "distributor" | "pharmacy"

interface LoginPageProps {
  onLogin: (role: UserRole, name: string) => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("manufacturer")
  const [password, setPassword] = useState("1234")

  const roles: { value: UserRole; label: string; icon: typeof Pill; description: string }[] = [
    {
      value: "manufacturer",
      label: "Manufacturer",
      icon: Pill,
      description: "Create and manage medicine batches",
    },
    {
      value: "distributor",
      label: "Distributor",
      icon: Truck,
      description: "Accept and transfer batches",
    },
    {
      value: "pharmacy",
      label: "Pharmacy",
      icon: Store,
      description: "Receive and track medicines",
    },
  ]

  const handleLogin = () => {
    if (password === "1234") {
      onLogin(selectedRole, selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Pill className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">PharmaChain</CardTitle>
            <CardDescription>Blockchain-based Medicine Tracking System</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium">Select Your Role</label>
              <div className="grid gap-3">
                {roles.map((role) => {
                  const IconComponent = role.icon
                  return (
                    <motion.button
                      key={role.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedRole(role.value)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedRole === role.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-6 h-6 text-primary flex-shrink-0" />
                        <div>
                          <div className="font-semibold">{role.label}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Enter password"
              />
              <p className="text-xs text-muted-foreground">Demo password: 1234</p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleLogin}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                <Lock className="w-4 h-4 mr-2" />
                Login
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          Demo credentials • All roles use password: 1234
        </motion.p>
      </motion.div>
    </div>
  )
}
