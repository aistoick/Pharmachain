"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function TrackSection() {
  const [medicineId, setMedicineId] = useState("")
  const [trackingData, setTrackingData] = useState<any>(null)

  const mockTrackingData: Record<string, any> = {
    "BATCH-2024-001": {
      name: "Aspirin 500mg",
      status: "Delivered",
      timeline: [
        { stage: "Manufacturer", icon: "🏭", completed: true, date: "2024-10-15" },
        { stage: "In Transit", icon: "🚚", completed: true, date: "2024-10-17" },
        { stage: "Pharmacy", icon: "🏥", completed: true, date: "2024-10-20" },
      ],
    },
    "BATCH-2024-002": {
      name: "Ibuprofen 200mg",
      status: "In Transit",
      timeline: [
        { stage: "Manufacturer", icon: "🏭", completed: true, date: "2024-10-16" },
        { stage: "In Transit", icon: "🚚", completed: true, date: "2024-10-18" },
        { stage: "Pharmacy", icon: "🏥", completed: false, date: "Pending" },
      ],
    },
  }

  const handleTrack = () => {
    if (medicineId && mockTrackingData[medicineId]) {
      setTrackingData(mockTrackingData[medicineId])
    }
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl font-bold text-foreground mb-2">Track Medicine</h2>
        <p className="text-muted-foreground">Check the authenticity and location of medicines</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <Card className="p-6 border border-border shadow-sm">
          <div className="flex gap-4">
            <input
              type="text"
              value={medicineId}
              onChange={(e) => setMedicineId(e.target.value)}
              placeholder="Enter Batch ID (e.g., BATCH-2024-001)"
              className="flex-1 px-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              onClick={handleTrack}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2 rounded-lg transition-all"
            >
              Track
            </Button>
          </div>
        </Card>
      </motion.div>

      {trackingData && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="p-8 border border-border shadow-sm">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground">{trackingData.name}</h3>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    trackingData.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : trackingData.status === "In Transit"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {trackingData.status === "Delivered" && "✓"} {trackingData.status}
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="flex justify-between items-start">
                {trackingData.timeline.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    className="flex flex-col items-center flex-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl mb-3 border-2 ${
                        item.completed
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-muted border-border text-muted-foreground"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {item.icon}
                    </motion.div>
                    <p className="font-semibold text-foreground text-center text-sm">{item.stage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                  </motion.div>
                ))}
              </div>
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-border -z-10">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${(trackingData.timeline.filter((t: any) => t.completed).length / trackingData.timeline.length) * 100}%`,
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
