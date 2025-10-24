"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

type TabType = "create" | "pending" | "distributor" | "delivered"

interface Batch {
  id: string
  medicineName: string
  manufactureDate: string
  expiryDate: string
  status: "pending" | "in-distributor" | "delivered"
}

export default function ManufacturerSection() {
  const [activeTab, setActiveTab] = useState<TabType>("create")
  const [formData, setFormData] = useState({
    medicineName: "",
    manufactureDate: "",
    expiryDate: "",
    certificateHash: "",
  })
  const [batches, setBatches] = useState<Batch[]>([
    {
      id: "1697752897",
      medicineName: "Aspirin",
      manufactureDate: "2025/04/20",
      expiryDate: "2026/04/20",
      status: "delivered",
    },
    {
      id: "2666179123",
      medicineName: "Adam",
      manufactureDate: "2025/04/15",
      expiryDate: "2026/04/15",
      status: "delivered",
    },
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreateBatch = () => {
    if (formData.medicineName && formData.manufactureDate && formData.expiryDate) {
      const newBatch: Batch = {
        id: Math.random().toString().slice(2, 11),
        medicineName: formData.medicineName,
        manufactureDate: formData.manufactureDate,
        expiryDate: formData.expiryDate,
        status: "pending",
      }
      setBatches([...batches, newBatch])
      setFormData({ medicineName: "", manufactureDate: "", expiryDate: "", certificateHash: "" })
      setActiveTab("pending")
    }
  }

  const pendingBatches = batches.filter((b) => b.status === "pending")
  const distributorBatches = batches.filter((b) => b.status === "in-distributor")
  const deliveredBatches = batches.filter((b) => b.status === "delivered")

  const tabs: { id: TabType; label: string; icon: string; count?: number }[] = [
    { id: "create", label: "Create Batch", icon: "🏭" },
    { id: "pending", label: "Pending Batches", icon: "⏳", count: pendingBatches.length },
    { id: "distributor", label: "In Distributor", icon: "🚚", count: distributorBatches.length },
    { id: "delivered", label: "Delivered Batches", icon: "✅", count: deliveredBatches.length },
  ]

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground border-b-2 border-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="ml-1 text-xs bg-background/20 px-2 py-1 rounded">({tab.count})</span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {activeTab === "create" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="p-8 border border-border shadow-sm bg-card">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🏭</span>
              <h2 className="text-2xl font-bold text-foreground">Create a New Medicine Batch</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Medicine Name</label>
                <input
                  type="text"
                  name="medicineName"
                  value={formData.medicineName}
                  onChange={handleInputChange}
                  placeholder="e.g., Aspirin 500mg"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Manufacture Date</label>
                  <input
                    type="date"
                    name="manufactureDate"
                    value={formData.manufactureDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Expiry Date</label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Certificate Hash (optional)</label>
                <input
                  type="text"
                  name="certificateHash"
                  value={formData.certificateHash}
                  onChange={handleInputChange}
                  placeholder="e.g., 0x1a2b3c4d5e6f..."
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <Button
                onClick={handleCreateBatch}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all mt-6"
              >
                ✅ Create Batch
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      {activeTab === "pending" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="p-8 border border-border shadow-sm bg-card">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">⏳</span>
              <h2 className="text-2xl font-bold text-foreground">Pending Batches ({pendingBatches.length})</h2>
            </div>

            {pendingBatches.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No pending batches available.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingBatches.map((batch) => (
                  <div
                    key={batch.id}
                    className="p-4 border border-border rounded-lg bg-background/50 hover:bg-background transition-all"
                  >
                    <p className="font-semibold text-foreground">
                      ⏳ Batch {batch.id} - {batch.medicineName}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manufactured: {batch.manufactureDate} | Expires: {batch.expiryDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {activeTab === "distributor" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="p-8 border border-border shadow-sm bg-card">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">🚚</span>
              <h2 className="text-2xl font-bold text-foreground">In Distributor ({distributorBatches.length})</h2>
            </div>

            {distributorBatches.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No batches in distributor.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {distributorBatches.map((batch) => (
                  <div
                    key={batch.id}
                    className="p-4 border border-border rounded-lg bg-background/50 hover:bg-background transition-all"
                  >
                    <p className="font-semibold text-foreground">
                      🚚 Batch {batch.id} - {batch.medicineName}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manufactured: {batch.manufactureDate} | Expires: {batch.expiryDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      )}

      {activeTab === "delivered" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="p-8 border border-border shadow-sm bg-card">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✅</span>
              <h2 className="text-2xl font-bold text-foreground">Delivered Batches ({deliveredBatches.length})</h2>
            </div>

            {deliveredBatches.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No delivered batches available.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {deliveredBatches.map((batch) => (
                  <div
                    key={batch.id}
                    className="p-4 border border-border rounded-lg bg-background/50 hover:bg-background transition-all"
                  >
                    <p className="font-semibold text-foreground">
                      ✅ Batch {batch.id} - {batch.medicineName}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manufactured: {batch.manufactureDate} | Expires: {batch.expiryDate}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  )
}
