"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export default function PharmacySection() {
  const receivedBatches = [
    {
      id: "BATCH-2024-001",
      name: "Aspirin 500mg",
      quantity: 100,
      receivedDate: "2024-10-20",
      status: "In Stock",
    },
    {
      id: "BATCH-2024-002",
      name: "Ibuprofen 200mg",
      quantity: 50,
      receivedDate: "2024-10-19",
      status: "In Stock",
    },
    {
      id: "BATCH-2024-003",
      name: "Paracetamol 500mg",
      quantity: 75,
      receivedDate: "2024-10-18",
      status: "In Stock",
    },
  ]

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl font-bold text-foreground mb-2">Pharmacy Inventory</h2>
        <p className="text-muted-foreground">View received medicine batches</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {receivedBatches.map((batch, index) => (
          <motion.div
            key={batch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{batch.name}</h3>
                  <p className="text-sm text-muted-foreground">{batch.id}</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  ✓ {batch.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium text-foreground">{batch.quantity} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Received:</span>
                  <span className="font-medium text-foreground">{batch.receivedDate}</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
