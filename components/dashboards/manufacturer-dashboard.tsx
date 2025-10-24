"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Clock, Truck, CheckCircle, Package } from "lucide-react"

// Demo data
const DEMO_BATCHES = [
  {
    id: "1697752897",
    medicineName: "Aspirin",
    manufactureDate: "2025-04-28",
    expiryDate: "2026-04-28",
    certificateHash: "0x1a2b3c4d5e6f7g8h",
    status: "delivered",
  },
  {
    id: "2666179123",
    medicineName: "Ibuprofen",
    manufactureDate: "2025-04-28",
    expiryDate: "2026-04-28",
    certificateHash: "0x9i8j7k6l5m4n3o2p",
    status: "delivered",
  },
  {
    id: "1234567890",
    medicineName: "Paracetamol",
    manufactureDate: "2025-05-01",
    expiryDate: "2026-05-01",
    certificateHash: "0xq1w2e3r4t5y6u7i8",
    status: "pending",
  },
]

export default function ManufacturerDashboard() {
  const [batches, setBatches] = useState(DEMO_BATCHES)
  const [formData, setFormData] = useState({
    medicineName: "",
    manufactureDate: new Date().toISOString().split("T")[0],
    expiryDate: new Date().toISOString().split("T")[0],
    certificateHash: "",
  })

  const pendingBatches = batches.filter((b) => b.status === "pending")
  const inDistributorBatches = batches.filter((b) => b.status === "in-distributor")
  const deliveredBatches = batches.filter((b) => b.status === "delivered")

  const handleCreateBatch = () => {
    if (formData.medicineName) {
      const newBatch = {
        id: Math.floor(Math.random() * 10000000000).toString(),
        ...formData,
        status: "pending",
      }
      setBatches([...batches, newBatch])
      setFormData({
        medicineName: "",
        manufactureDate: new Date().toISOString().split("T")[0],
        expiryDate: new Date().toISOString().split("T")[0],
        certificateHash: "",
      })
    }
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const configs = {
      delivered: { icon: CheckCircle, label: "Delivered", color: "bg-green-500/20 text-green-700" },
      "in-distributor": { icon: Truck, label: "In Transit", color: "bg-blue-500/20 text-blue-700" },
      pending: { icon: Clock, label: "Pending", color: "bg-amber-500/20 text-amber-700" },
    }
    const config = configs[status as keyof typeof configs] || configs.pending
    const IconComponent = config.icon
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${config.color}`}>
        <IconComponent className="w-3 h-3" />
        {config.label}
      </span>
    )
  }

  const BatchCard = ({ batch }: { batch: (typeof DEMO_BATCHES)[0] }) => (
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
            <h4 className="font-semibold">Batch {batch.id}</h4>
            <p className="text-sm text-muted-foreground">{batch.medicineName}</p>
          </div>
        </div>
        <StatusBadge status={batch.status} />
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Manufacture Date:</span>
          <span className="font-medium">{batch.manufactureDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Expiry Date:</span>
          <span className="font-medium">{batch.expiryDate}</span>
        </div>
        {batch.certificateHash && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Certificate:</span>
            <span className="font-mono text-xs">{batch.certificateHash.slice(0, 10)}...</span>
          </div>
        )}
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Package className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Manufacturer Portal</h2>
          <p className="text-muted-foreground mt-1">Create and manage medicine batches for distribution</p>
        </div>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Create</span>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="hidden sm:inline">Pending</span>
            <span className="ml-1 text-xs">({pendingBatches.length})</span>
          </TabsTrigger>
          <TabsTrigger value="distributor" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span className="hidden sm:inline">In Transit</span>
            <span className="ml-1 text-xs">({inDistributorBatches.length})</span>
          </TabsTrigger>
          <TabsTrigger value="delivered" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Delivered</span>
            <span className="ml-1 text-xs">({deliveredBatches.length})</span>
          </TabsTrigger>
        </TabsList>

        {/* Create Batch Tab */}
        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                Create a New Medicine Batch
              </CardTitle>
              <CardDescription>Fill in all details to create and register a new batch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="medicine-name">Medicine Name *</Label>
                  <Input
                    id="medicine-name"
                    placeholder="e.g., Aspirin, Ibuprofen"
                    value={formData.medicineName}
                    onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="manufacture-date">Manufacture Date *</Label>
                    <Input
                      id="manufacture-date"
                      type="date"
                      value={formData.manufactureDate}
                      onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry-date">Expiry Date *</Label>
                    <Input
                      id="expiry-date"
                      type="date"
                      value={formData.expiryDate}
                      onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="certificate-hash">Certificate Hash (Optional)</Label>
                  <Input
                    id="certificate-hash"
                    placeholder="0x..."
                    value={formData.certificateHash}
                    onChange={(e) => setFormData({ ...formData, certificateHash: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={handleCreateBatch}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Batch
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Batches Tab */}
        <TabsContent value="pending" className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              Pending Batches ({pendingBatches.length})
            </h3>
            {pendingBatches.length > 0 ? (
              <div className="grid gap-4">
                {pendingBatches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} />
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No pending batches. Create one to get started.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* In Distributor Tab */}
        <TabsContent value="distributor" className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              In Transit ({inDistributorBatches.length})
            </h3>
            {inDistributorBatches.length > 0 ? (
              <div className="grid gap-4">
                {inDistributorBatches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} />
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No batches currently in transit.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Delivered Batches Tab */}
        <TabsContent value="delivered" className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Delivered Batches ({deliveredBatches.length})
            </h3>
            {deliveredBatches.length > 0 ? (
              <div className="grid gap-4">
                {deliveredBatches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} />
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center text-muted-foreground">No delivered batches yet.</CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
