"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  Navigation,
  Ambulance,
  Building2,
  Heart,
  Brain,
  Stethoscope,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Shield,
} from "lucide-react";

const emergencyRooms = [
  {
    id: 1,
    name: "NYU Langone Emergency",
    type: "Level 1 Trauma",
    distance: "0.8 mi",
    waitTime: 45,
    waitTrend: "increasing",
    rating: 4.2,
    phone: "(212) 555-0100",
    address: "550 First Ave, New York, NY",
    avgCost: 1850,
    specialties: ["Cardiac", "Stroke", "Trauma"],
  },
  {
    id: 2,
    name: "Mount Sinai ER",
    type: "Level 1 Trauma",
    distance: "1.2 mi",
    waitTime: 32,
    waitTrend: "stable",
    rating: 4.4,
    phone: "(212) 555-0200",
    address: "1 Gustave L. Levy Pl, New York, NY",
    avgCost: 2100,
    specialties: ["Pediatric", "Cardiac", "Neuro"],
  },
  {
    id: 3,
    name: "Bellevue Hospital ER",
    type: "Level 1 Trauma",
    distance: "1.5 mi",
    waitTime: 78,
    waitTrend: "decreasing",
    rating: 3.9,
    phone: "(212) 555-0300",
    address: "462 First Ave, New York, NY",
    avgCost: 1450,
    specialties: ["Trauma", "Psychiatric", "Burns"],
  },
];

const urgentCares = [
  {
    id: 1,
    name: "CityMD - Midtown",
    distance: "0.3 mi",
    waitTime: 15,
    rating: 4.6,
    phone: "(212) 555-0400",
    hours: "8am - 10pm",
    avgCost: 185,
    services: ["X-Ray", "Lab Tests", "Stitches"],
  },
  {
    id: 2,
    name: "GoHealth Urgent Care",
    distance: "0.5 mi",
    waitTime: 8,
    rating: 4.5,
    phone: "(212) 555-0500",
    hours: "8am - 8pm",
    avgCost: 195,
    services: ["X-Ray", "IV Fluids", "Minor Procedures"],
  },
  {
    id: 3,
    name: "MedExpress Urgent Care",
    distance: "0.9 mi",
    waitTime: 22,
    rating: 4.3,
    phone: "(212) 555-0600",
    hours: "9am - 9pm",
    avgCost: 165,
    services: ["X-Ray", "Physical Exams", "Vaccinations"],
  },
];

const ambulanceServices = [
  {
    name: "FDNY EMS",
    type: "Public",
    responseTime: "8 min",
    cost: "$1,200 - $2,500",
    insurance: "Most insurance accepted",
  },
  {
    name: "Northwell Health Ambulance",
    type: "Private",
    responseTime: "12 min",
    cost: "$800 - $1,800",
    insurance: "In-network with major plans",
  },
];

const erCostEstimates = [
  { condition: "Chest Pain (non-cardiac)", avgCost: 2450, range: "$1,500 - $4,200" },
  { condition: "Broken Bone (simple)", avgCost: 1850, range: "$1,200 - $3,000" },
  { condition: "Laceration (stitches)", avgCost: 1200, range: "$800 - $2,000" },
  { condition: "Allergic Reaction", avgCost: 1650, range: "$1,000 - $2,800" },
  { condition: "Abdominal Pain", avgCost: 2100, range: "$1,400 - $3,500" },
  { condition: "Migraine/Severe Headache", avgCost: 1750, range: "$1,100 - $2,900" },
];

function getWaitTimeColor(minutes: number) {
  if (minutes < 30) return "text-accent bg-accent/10";
  if (minutes < 60) return "text-yellow-600 bg-yellow-50";
  return "text-destructive bg-destructive/10";
}

export function EmergencyServices() {
  const [location, setLocation] = useState("");

  return (
    <section id="emergency" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="destructive" className="mb-4">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Emergency Services
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            ER Wait Times & Urgent Care
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Find real-time ER wait times, locate urgent care centers, and estimate
            emergency visit costs before you go.
          </p>
        </div>

        <Card className="mb-8 border-destructive/20 bg-destructive/5">
          <CardContent className="flex flex-col items-center justify-between gap-4 p-6 md:flex-row">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20">
                <Phone className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  If this is a life-threatening emergency, call 911 immediately
                </p>
                <p className="text-sm text-muted-foreground">
                  Don&apos;t wait - chest pain, difficulty breathing, stroke symptoms
                  require immediate attention
                </p>
              </div>
            </div>
            <Button variant="destructive" size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Call 911
            </Button>
          </CardContent>
        </Card>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Enter your location..."
              className="pl-10"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <Button>
            <Navigation className="mr-2 h-4 w-4" />
            Use Current Location
          </Button>
        </div>

        <Tabs defaultValue="er" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-4">
            <TabsTrigger value="er">
              <Building2 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Emergency Rooms</span>
              <span className="sm:hidden">ER</span>
            </TabsTrigger>
            <TabsTrigger value="urgent">
              <Stethoscope className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Urgent Care</span>
              <span className="sm:hidden">Urgent</span>
            </TabsTrigger>
            <TabsTrigger value="ambulance">
              <Ambulance className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Ambulance</span>
              <span className="sm:hidden">Amb</span>
            </TabsTrigger>
            <TabsTrigger value="costs">
              <DollarSign className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Cost Estimates</span>
              <span className="sm:hidden">Costs</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="er" className="space-y-4">
            {emergencyRooms.map((er) => (
              <Card key={er.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="border-destructive/50">
                          {er.type}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{er.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {er.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {er.address}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {er.specialties.map((spec) => (
                          <Badge key={spec} variant="secondary" className="text-xs">
                            {spec === "Cardiac" && <Heart className="mr-1 h-3 w-3" />}
                            {spec === "Neuro" && <Brain className="mr-1 h-3 w-3" />}
                            {spec === "Stroke" && <Brain className="mr-1 h-3 w-3" />}
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-6 lg:flex-col lg:items-end lg:gap-3">
                      <div className="text-center lg:text-right">
                        <div
                          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 ${getWaitTimeColor(
                            er.waitTime
                          )}`}
                        >
                          <Clock className="h-5 w-5" />
                          <span className="text-2xl font-bold">
                            {er.waitTime} min
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground lg:justify-end">
                          <TrendingUp
                            className={`h-3 w-3 ${
                              er.waitTrend === "increasing"
                                ? "text-destructive"
                                : er.waitTrend === "decreasing"
                                  ? "text-accent"
                                  : ""
                            }`}
                          />
                          {er.waitTrend}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {er.distance}
                        </p>
                        <p className="mt-1">
                          Avg: ${er.avgCost.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:ml-4">
                      <Button size="sm">
                        <Navigation className="mr-2 h-4 w-4" />
                        Directions
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Phone className="mr-2 h-4 w-4" />
                        {er.phone}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="urgent" className="space-y-4">
            {urgentCares.map((uc) => (
              <Card key={uc.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{uc.rating}</span>
                        </div>
                        <Badge variant="secondary">{uc.hours}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {uc.name}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {uc.services.map((service) => (
                          <Badge key={service} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-row items-center gap-6 lg:flex-col lg:items-end lg:gap-3">
                      <div
                        className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 ${getWaitTimeColor(
                          uc.waitTime
                        )}`}
                      >
                        <Clock className="h-5 w-5" />
                        <span className="text-2xl font-bold">{uc.waitTime} min</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {uc.distance}
                        </p>
                        <p className="mt-1">Avg: ${uc.avgCost}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 lg:ml-4">
                      <Button size="sm">
                        <Navigation className="mr-2 h-4 w-4" />
                        Directions
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Phone className="mr-2 h-4 w-4" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="ambulance" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {ambulanceServices.map((service) => (
                <Card key={service.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Ambulance className="h-5 w-5 text-destructive" />
                        {service.name}
                      </CardTitle>
                      <Badge variant="outline">{service.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Response Time</span>
                      <span className="font-semibold text-foreground">
                        {service.responseTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Estimated Cost</span>
                      <span className="font-semibold text-foreground">
                        {service.cost}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Insurance</span>
                      <span className="text-sm text-foreground">
                        {service.insurance}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Understanding Ambulance Costs
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Ambulance costs vary significantly based on distance traveled,
                      level of care required, and whether the service is in-network.
                      Many insurance plans cover emergency ambulance transport, but
                      you may still be responsible for copays or out-of-network costs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>ER Visit Cost Estimates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  These are average out-of-pocket costs for common ER visits.
                  Actual costs depend on your insurance, the facility, and treatment
                  required.
                </p>
                <div className="space-y-3">
                  {erCostEstimates.map((estimate) => (
                    <div
                      key={estimate.condition}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {estimate.condition}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Range: {estimate.range}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">
                          ${estimate.avgCost.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">average</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <DollarSign className="h-6 w-6 text-accent-foreground" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      ER vs Urgent Care: Know the Difference
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Urgent care visits typically cost $150-$300, while ER visits
                      average $1,500+. If your condition isn&apos;t life-threatening,
                      consider urgent care first to save money and time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-destructive" />
              Crisis Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold text-foreground">
                  National Suicide Prevention
                </h4>
                <p className="mt-1 text-2xl font-bold text-primary">988</p>
                <p className="text-sm text-muted-foreground">
                  Available 24/7 for crisis support
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold text-foreground">Crisis Text Line</h4>
                <p className="mt-1 text-2xl font-bold text-primary">
                  Text HOME to 741741
                </p>
                <p className="text-sm text-muted-foreground">
                  Free, 24/7 text support
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-semibold text-foreground">SAMHSA Helpline</h4>
                <p className="mt-1 text-2xl font-bold text-primary">
                  1-800-662-4357
                </p>
                <p className="text-sm text-muted-foreground">
                  Substance abuse & mental health
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
