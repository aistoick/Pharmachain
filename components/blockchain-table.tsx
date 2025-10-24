"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function BlockchainTable() {
  const blockchainEvents = [
    {
      id: 1,
      batchId: "BATCH-2024-001",
      from: "Manufacturer A",
      to: "Distributor B",
      timestamp: "2024-10-15 10:30 AM",
      status: "Completed",
      icon: "✓",
    },
    {
      id: 2,
      batchId: "BATCH-2024-002",
      from: "Distributor B",
      to: "Pharmacy C",
      timestamp: "2024-10-18 02:15 PM",
      status: "Completed",
      icon: "✓",
    },
    {
      id: 3,
      batchId: "BATCH-2024-003",
      from: "Manufacturer A",
      to: "Distributor B",
      timestamp: "2024-10-19 09:45 AM",
      status: "Pending",
      icon: "⏳",
    },
    {
      id: 4,
      batchId: "BATCH-2024-001",
      from: "Pharmacy C",
      to: "Customer",
      timestamp: "2024-10-20 04:20 PM",
      status: "Completed",
      icon: "✓",
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="p-6 border border-border shadow-sm">
        <h3 className="text-xl font-bold text-foreground mb-6">Blockchain Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Batch ID</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">From</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">To</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Timestamp</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {blockchainEvents.map((event, index) => (
                <motion.tr
                  key={event.id}
                  className="border-b border-border hover:bg-muted/50 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <td className="py-4 px-4 text-foreground font-medium">{event.batchId}</td>
                  <td className="py-4 px-4 text-muted-foreground">{event.from}</td>
                  <td className="py-4 px-4 text-muted-foreground">{event.to}</td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{event.timestamp}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {event.icon} {event.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  )
}
