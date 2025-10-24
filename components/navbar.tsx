"use client"

import { motion } from "framer-motion"

interface NavbarProps {
  activeRole: string
  setActiveRole: (role: any) => void
}

export default function Navbar({ activeRole, setActiveRole }: NavbarProps) {
  const roles = [
    { id: "manufacturer", label: "Manufacturer" },
    { id: "distributor", label: "Distributor" },
    { id: "pharmacy", label: "Pharmacy" },
    { id: "track", label: "Track Medicine" },
  ]

  return (
    <nav className="border-b border-border bg-card shadow-sm">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">💊</div>
          <h1 className="text-2xl font-bold text-primary">PharmaChain</h1>
        </div>
        <div className="flex gap-2">
          {roles.map((role) => (
            <motion.button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeRole === role.id
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted text-foreground hover:bg-secondary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {role.label}
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  )
}
