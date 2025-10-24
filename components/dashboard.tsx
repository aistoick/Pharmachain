"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import ManufacturerDashboard from "@/components/dashboards/manufacturer-dashboard"
import DistributorDashboard from "@/components/dashboards/distributor-dashboard"
import PharmacyDashboard from "@/components/dashboards/pharmacy-dashboard"

interface DashboardProps {
  userRole: "manufacturer" | "distributor" | "pharmacy" | null
  username: string
  onLogout: () => void
}

export default function Dashboard({ userRole, username, onLogout }: DashboardProps) {
  const renderDashboard = () => {
    switch (userRole) {
      case "manufacturer":
        return <ManufacturerDashboard />
      case "distributor":
        return <DistributorDashboard />
      case "pharmacy":
        return <PharmacyDashboard />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Pill className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">PharmaChain</h1>
              <p className="text-xs text-muted-foreground">Blockchain Medicine Tracking</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Logged in as</p>
              <p className="text-xs text-muted-foreground capitalize">{username}</p>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="border-destructive/50 text-destructive hover:bg-destructive/10 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {renderDashboard()}
        </motion.div>
      </main>
    </div>
  )
}

import { Pill } from "lucide-react"
