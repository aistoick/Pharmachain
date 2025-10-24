"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Inbox, CheckCircle, Barcode, Store, Package } from "lucide-react"

// Demo data
const DEMO_BATCHES = [
  {
    id: "1697752897",
    medicineName: "Aspirin",
    manufactureDate: "2025-04-28",
    expiryDate: "2026-04-28",
    status: "incoming",
  },
  {
    id: "2666179123",
    medicineName: "Ibuprofen",
    manufactureDate: "2025-04-28",
    expiryDate: "2026-04-28",
    status: "accepted",
  },
]

export default function PharmacyDashboard() {
  const [batches, setBatches] = useState(DEMO_BATCHES)

  const incomingBatches = batches.filter((b) => b.status === "incoming")
  const acceptedBatches = batches.filter((b) => b.status === "accepted")

  const handleAcceptBatch = (batchId: string) => {
    setBatches(batches.map((b) => (b.id === batchId ? { ...b, status: "accepted" } : b)))
  }

  const generateBarcode = (batchId: string) => {
    return `EAN-13: ${batchId.padEnd(13, "0").slice(0, 13)}`
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const configs = {
      accepted: { icon: CheckCircle, label: "In Stock", color: "bg-green-500/20 text-green-700" },
      incoming: { icon: Inbox, label: "Incoming", color: "bg-amber-500/20 text-amber-700" },
    }
    const config = configs[status as keyof typeof configs] || configs.incoming
    const IconComponent = config.icon
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${config.color}`}>
        <IconComponent className="w-3 h-3" />
        {config.label}
      </span>
    )
  }

  const BatchCard = ({
    batch,
    showActions,
  }: {
    batch: (typeof DEMO_BATCHES)[0]
    showActions?: boolean
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold">{batch.medicineName}</h4>
            <p className="text-sm text-muted-foreground">Batch {batch.id}</p>
          </div>
        </div>
        <StatusBadge status={batch.status} />
      </div>
      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Manufacture Date:</span>
          <span className="font-medium">{batch.manufactureDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Expiry Date:</span>
          <span className="font-medium">{batch.expiryDate}</span>
        </div>
      </div>

      {showActions && (
        <Button
          onClick={() => handleAcceptBatch(batch.id)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="sm"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Accept Batch
        </Button>
      )}

      {batch.status === "accepted" && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
            <Barcode className="w-3 h-3" />
            Barcode (EAN-13)
          </p>
          <div className="bg-white p-2 rounded border border-border text-center font-mono text-sm">
            {generateBarcode(batch.id)}
          </div>
        </div>
      )}
    </motion.div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Store className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Pharmacy Portal</h2>
          <p className="text-muted-foreground mt-1">Receive and track medicine batches with barcodes</p>
        </div>
      </div>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="incoming" className="flex items-center gap-2">
            <Inbox className="w-4 h-4" />
            <span className="hidden sm:inline">Incoming</span>
            <span className="ml-1 text-xs">({incomingBatches.length})</span>
          </TabsTrigger>
          <TabsTrigger value="accepted" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">In Stock</span>
            <span className="ml-1 text-xs">({acceptedBatches.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Incoming Batches */}
        <TabsContent value="incoming" className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Inbox className="w-5 h-5 text-amber-600" />
              Incoming Batches ({incomingBatches.length})
            </h3>
            {incomingBatches.length > 0 ? (
              <div className="grid gap-4">
                {incomingBatches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} showActions />
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No incoming batches. Waiting for distributors to send batches.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Accepted Batches */}
        <TabsContent value="accepted" className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              In Stock ({acceptedBatches.length})
            </h3>
            {acceptedBatches.length > 0 ? (
              <div className="grid gap-4">
                {acceptedBatches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} />
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No batches in stock yet. Accept incoming batches to add them to inventory.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
