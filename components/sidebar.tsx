"use client"

import { motion } from "framer-motion"

export default function Sidebar() {
  const userAddress = "0x742d35Cc6634C0532925a3b844Bc9e7595f42bE"
  const userRole = "Manufacturer"

  return (
    <motion.aside
      className="w-64 border-r border-border bg-sidebar p-6 min-h-screen"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div className="rounded-xl bg-card p-4 shadow-sm border border-border">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">User Info</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Wallet Address</p>
              <p className="text-sm font-mono text-foreground truncate">{userAddress}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Account Role</p>
              <p className="text-sm font-semibold text-primary">{userRole}</p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-foreground">Connected to Blockchain</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-4 border border-primary/20">
          <p className="text-xs text-muted-foreground mb-2">Network Status</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <p className="text-sm font-medium text-foreground">Ethereum Mainnet</p>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
