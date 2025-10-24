"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Inbox, CheckCircle, Send, Truck, Package } from "lucide-react"

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
  {
    id: "1234567890",
    medicineName: "Paracetamol",
    manufactureDate: "2025-05-01",
    expiryDate: "2026-05-01",
    status: "transferred",
  },
]

const PHARMACIES = [
  { name: "Central Pharmacy", address: "0x1A0ee922e717C44d8D99F195b1Fe435C8380DD01" },
  { name: "Downtown Clinic", address: "0x2B1ff933f828D55e9Aa0G206c2Gf546D9491EE12" },
  { name: "Westside Medical", address: "0x3C2gg944g939E66fBb1H317d3Hg657E0A502FF23" },
]

export default function DistributorDashboard() {
  const [batches, setBatches] = useState(DEMO_BATCHES)
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>("")

  const incomingBatches = batches.filter((b) => b.status === "incoming")
  const acceptedBatches = batches.filter((b) => b.status === "accepted")
  const transferredBatches = batches.filter((b) => b.status === "transferred")

  const handleAcceptBatch = (batchId: string) => {
    setBatches(batches.map((b) => (b.id === batchId ? { ...b, status: "accepted" } : b)))
  }

  const handleTransferBatch = (batchId: string) => {
    if (selectedPharmacy) {
      setBatches(batches.map((b) => (b.id === batchId ? { ...b, status: "transferred" } : b)))
      setSelectedPharmacy("")
    }
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const configs = {
      transferred: { icon: Send, label: "Transferred", color: "bg-green-500/20 text-green-700" },
      accepted: { icon: CheckCircle, label: "Accepted", color: "bg-blue-500/20 text-blue-700" },
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
    actionType,
  }: {
    batch: (typeof DEMO_BATCHES)[0]
    showActions?: boolean
    actionType?: "accept" | "transfer"
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
            <h4 className="font-semibold">Batch {batch.id}</h4>
            <p className="text-sm text-muted-foreground">{batch.medicineName}</p>
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

      {showActions && actionType === "accept" && (
        <Button
          onClick={() => handleAcceptBatch(batch.id)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          size="sm"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Accept Batch
        </Button>
      )}

      {showActions && actionType === "transfer" && (
        <div className="space-y-2">
          <Select value={selectedPharmacy} onValueChange={setSelectedPharmacy}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select pharmacy to transfer to..." />
            </SelectTrigger>
            <SelectContent>
              {PHARMACIES.map((pharmacy) => (
                <SelectItem key={pharmacy.address} value={pharmacy.address}>
                  {pharmacy.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => handleTransferBatch(batch.id)}
            disabled={!selectedPharmacy}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            size="sm"
          >
            <Send className="w-4 h-4 mr-2" />
            Transfer to Pharmacy
          </Button>
        </div>
      )}
    </motion.div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Truck className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Distributor Portal</h2>
          <p className="text-muted-foreground mt-1">Accept batches from manufacturers and transfer to pharmacies</p>
        </div>
      </div>

      <Tabs defaultValue="incoming" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="incoming" className="flex items-center gap-2">
            <Inbox className="w-4 h-4" />
            <span className="hidden sm:inline">Incoming</span>
            <span className="ml-1 text-xs">({incomingBatches.length})</span>
          </TabsTrigger>
          <TabsTrigger value="accepted" className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Accepted</span>
            <span className="ml-1 text-xs">({acceptedBatches.length})</span>
          </TabsTrigger>
          <TabsTrigger value="transferred" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Transferred</span>
            <span className="ml-1 text-xs">({transferredBatches.length})</span>
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
                  <BatchCard key={batch.id} batch={batch} showActions actionType="accept" />
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No incoming batches. Waiting for manufacturers to send batches.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Accepted Batches */}
        <TabsContent value="accepted" className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Accepted Batches ({acceptedBatches.length})
            </h3>
            {acceptedBatches.length > 0 ? (
              <div className="grid gap-4">
                {acceptedBatches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} showActions actionType="transfer" />
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No accepted batches. Accept incoming batches to transfer them.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* Transferred Batches */}
        <TabsContent value="transferred" className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-green-600" />
              Transferred Batches ({transferredBatches.length})
            </h3>
            {transferredBatches.length > 0 ? (
              <div className="grid gap-4">
                {transferredBatches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} />
                ))}
              </div>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6 text-center text-muted-foreground">
                  No transferred batches yet.
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
