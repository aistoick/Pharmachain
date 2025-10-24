"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function DistributorSection() {
  const [selectedBatch, setSelectedBatch] = useState("")
  const [targetPharmacy, setTargetPharmacy] = useState("")

  const batches = [
    { id: "BATCH-2024-001", name: "Aspirin 500mg", quantity: 1000 },
    { id: "BATCH-2024-002", name: "Ibuprofen 200mg", quantity: 500 },
    { id: "BATCH-2024-003", name: "Paracetamol 500mg", quantity: 750 },
  ]

  const pharmacies = [
    { id: "PHARM-001", name: "Central Pharmacy" },
    { id: "PHARM-002", name: "Health Plus Pharmacy" },
    { id: "PHARM-003", name: "MediCare Pharmacy" },
  ]

  const handleTransfer = () => {
    if (selectedBatch && targetPharmacy) {
      alert(`Transferred ${selectedBatch} to ${targetPharmacy}`)
      setSelectedBatch("")
      setTargetPharmacy("")
    }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl font-bold text-foreground mb-2">Distribute Medicine</h2>
        <p className="text-muted-foreground">Transfer batches to pharmacies</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="p-6 border border-border shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Available Batches</h3>
            <div className="space-y-3">
              {batches.map((batch) => (
                <motion.button
                  key={batch.id}
                  onClick={() => setSelectedBatch(batch.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedBatch === batch.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-semibold text-foreground">{batch.name}</p>
                  <p className="text-sm text-muted-foreground">{batch.id}</p>
                  <p className="text-sm text-primary font-medium">Qty: {batch.quantity}</p>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-6 border border-border shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Select Pharmacy</h3>
            <div className="space-y-3 mb-6">
              {pharmacies.map((pharmacy) => (
                <motion.button
                  key={pharmacy.id}
                  onClick={() => setTargetPharmacy(pharmacy.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    targetPharmacy === pharmacy.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="font-semibold text-foreground">{pharmacy.name}</p>
                  <p className="text-sm text-muted-foreground">{pharmacy.id}</p>
                </motion.button>
              ))}
            </div>
            <Button
              onClick={handleTransfer}
              disabled={!selectedBatch || !targetPharmacy}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-lg transition-all disabled:opacity-50"
            >
              Transfer Batch
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
