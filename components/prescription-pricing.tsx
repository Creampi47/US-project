"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pill,
  Search,
  MapPin,
  Tag,
  TrendingDown,
  AlertTriangle,
  Check,
  ExternalLink,
  Truck,
  Store,
} from "lucide-react";

const medications = [
  {
    id: 1,
    name: "Atorvastatin",
    brandName: "Lipitor",
    dosage: "20mg",
    quantity: 30,
    category: "Cholesterol",
    hasGeneric: true,
  },
  {
    id: 2,
    name: "Metformin",
    brandName: "Glucophage",
    dosage: "500mg",
    quantity: 60,
    category: "Diabetes",
    hasGeneric: true,
  },
  {
    id: 3,
    name: "Lisinopril",
    brandName: "Prinivil",
    dosage: "10mg",
    quantity: 30,
    category: "Blood Pressure",
    hasGeneric: true,
  },
  {
    id: 4,
    name: "Omeprazole",
    brandName: "Prilosec",
    dosage: "20mg",
    quantity: 30,
    category: "Acid Reflux",
    hasGeneric: true,
  },
];

const pharmacyPrices = [
  {
    id: 1,
    name: "CVS Pharmacy",
    type: "retail",
    distance: "0.5 mi",
    brandPrice: 285,
    genericPrice: 12,
    couponPrice: 8,
    hasDelivery: true,
    rating: 4.2,
  },
  {
    id: 2,
    name: "Walgreens",
    type: "retail",
    distance: "0.8 mi",
    brandPrice: 295,
    genericPrice: 15,
    couponPrice: 10,
    hasDelivery: true,
    rating: 4.0,
  },
  {
    id: 3,
    name: "Costco Pharmacy",
    type: "warehouse",
    distance: "2.3 mi",
    brandPrice: 220,
    genericPrice: 6,
    couponPrice: 5,
    hasDelivery: false,
    rating: 4.5,
  },
  {
    id: 4,
    name: "Amazon Pharmacy",
    type: "online",
    distance: "Mail",
    brandPrice: 240,
    genericPrice: 8,
    couponPrice: 4,
    hasDelivery: true,
    rating: 4.3,
  },
  {
    id: 5,
    name: "Mark Cuban Cost Plus",
    type: "online",
    distance: "Mail",
    brandPrice: 180,
    genericPrice: 4,
    couponPrice: 4,
    hasDelivery: true,
    rating: 4.7,
  },
];

const coupons = [
  { provider: "GoodRx", discount: "Up to 80% off", code: "GRX2024" },
  { provider: "RxSaver", discount: "Up to 75% off", code: "RXSAVE" },
  { provider: "SingleCare", discount: "Up to 80% off", code: "SINGLE80" },
];

export function PrescriptionPricing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMed, setSelectedMed] = useState(medications[0]);

  const filteredMeds = medications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.brandName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="prescriptions" className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            <Pill className="mr-1 h-3 w-3" />
            Prescription Savings
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Compare Prescription Drug Prices
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Find the lowest prices on your medications. Compare pharmacies, find
            coupons, and discover generic alternatives.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Search className="h-5 w-5" />
                Find Your Medication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search medications..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                {filteredMeds.map((med) => (
                  <button
                    key={med.id}
                    onClick={() => setSelectedMed(med)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      selectedMed.id === med.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          {med.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {med.brandName} - {med.dosage}
                        </p>
                      </div>
                      {med.hasGeneric && (
                        <Badge
                          variant="secondary"
                          className="bg-accent/20 text-accent-foreground"
                        >
                          Generic
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {med.category} | Qty: {med.quantity}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Prices for {selectedMed.name} {selectedMed.dosage}
                </CardTitle>
                <Badge variant="outline">
                  <MapPin className="mr-1 h-3 w-3" />
                  New York, NY
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="all">All Pharmacies</TabsTrigger>
                  <TabsTrigger value="retail">
                    <Store className="mr-1 h-4 w-4" />
                    Retail
                  </TabsTrigger>
                  <TabsTrigger value="online">
                    <Truck className="mr-1 h-4 w-4" />
                    Online
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-3">
                  {pharmacyPrices.map((pharmacy) => (
                    <div
                      key={pharmacy.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          {pharmacy.type === "online" ? (
                            <Truck className="h-6 w-6 text-primary" />
                          ) : (
                            <Store className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {pharmacy.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {pharmacy.distance}
                            {pharmacy.hasDelivery && " | Free delivery"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground line-through">
                            ${pharmacy.brandPrice}
                          </span>
                          <span className="text-xl font-bold text-primary">
                            ${pharmacy.couponPrice}
                          </span>
                        </div>
                        <p className="text-xs text-accent">
                          With coupon | Generic: ${pharmacy.genericPrice}
                        </p>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="retail" className="space-y-3">
                  {pharmacyPrices
                    .filter((p) => p.type === "retail" || p.type === "warehouse")
                    .map((pharmacy) => (
                      <div
                        key={pharmacy.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Store className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {pharmacy.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {pharmacy.distance}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-primary">
                            ${pharmacy.couponPrice}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            With coupon
                          </p>
                        </div>
                      </div>
                    ))}
                </TabsContent>

                <TabsContent value="online" className="space-y-3">
                  {pharmacyPrices
                    .filter((p) => p.type === "online")
                    .map((pharmacy) => (
                      <div
                        key={pharmacy.id}
                        className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Truck className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {pharmacy.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Free delivery | 2-5 days
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xl font-bold text-primary">
                            ${pharmacy.couponPrice}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            With coupon
                          </p>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>

              <div className="mt-6 rounded-lg border border-accent/30 bg-accent/10 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-accent-foreground" />
                  <h4 className="font-semibold text-foreground">
                    Available Coupons
                  </h4>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {coupons.map((coupon) => (
                    <div
                      key={coupon.provider}
                      className="flex items-center justify-between rounded-lg bg-card p-3"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {coupon.provider}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {coupon.discount}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {selectedMed.hasGeneric && (
                <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        Generic Alternative Available
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedMed.name} is the generic version of{" "}
                        {selectedMed.brandName}. You could save up to 95% by
                        switching from brand to generic.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Drug Interaction Checker
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Input placeholder="Enter first medication..." className="flex-1" />
              <Input placeholder="Enter second medication..." className="flex-1" />
              <Button>
                <Check className="mr-2 h-4 w-4" />
                Check Interactions
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Enter two or more medications to check for potential drug
              interactions. Always consult your healthcare provider before making
              changes to your medications.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
