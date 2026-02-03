"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Pill,
  UserCheck,
  MessageSquare,
  FileText,
  Search,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  CalendarCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const upcomingAppointments = [
  {
    id: 1,
    provider: "Dr. Sarah Chen",
    specialty: "Primary Care",
    date: "Feb 8, 2026",
    time: "10:30 AM",
    location: "City Medical Center",
    type: "In-person",
    status: "confirmed",
  },
  {
    id: 2,
    provider: "Dr. Michael Park",
    specialty: "Cardiology",
    date: "Feb 15, 2026",
    time: "2:00 PM",
    location: "Heart & Vascular Institute",
    type: "Telehealth",
    status: "pending",
  },
];

const prescriptions = [
  {
    name: "Lisinopril 10mg",
    pharmacy: "CVS Pharmacy",
    refillDate: "Feb 10, 2026",
    price: 12.99,
    genericAvailable: true,
    alternativePrice: 4.99,
  },
  {
    name: "Metformin 500mg",
    pharmacy: "Walgreens",
    refillDate: "Feb 18, 2026",
    price: 18.99,
    genericAvailable: true,
    alternativePrice: 7.99,
  },
  {
    name: "Atorvastatin 20mg",
    pharmacy: "CVS Pharmacy",
    refillDate: "Mar 1, 2026",
    price: 24.99,
    genericAvailable: false,
    alternativePrice: null,
  },
];

const secondOpinionProviders = [
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Oncology",
    hospital: "Memorial Cancer Center",
    rating: 4.9,
    reviews: 245,
    waitTime: "3-5 days",
    telehealth: true,
  },
  {
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgery",
    hospital: "Sports Medicine Institute",
    rating: 4.8,
    reviews: 312,
    waitTime: "5-7 days",
    telehealth: true,
  },
];

export function CareCoordination() {
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            Care Hub
          </Badge>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Care Coordination Center
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Manage appointments, compare prescriptions, and coordinate your care
            all in one place.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="mx-auto grid w-full max-w-xl grid-cols-4">
            <TabsTrigger
              value="appointments"
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Appointments</span>
            </TabsTrigger>
            <TabsTrigger
              value="prescriptions"
              className="flex items-center gap-2"
            >
              <Pill className="h-4 w-4" />
              <span className="hidden sm:inline">Rx Prices</span>
            </TabsTrigger>
            <TabsTrigger value="second-opinion" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              <span className="hidden sm:inline">2nd Opinion</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Records</span>
            </TabsTrigger>
          </TabsList>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-foreground">
                Upcoming Appointments
              </h3>
              <Button>
                <CalendarCheck className="mr-2 h-4 w-4" />
                Schedule New
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {upcomingAppointments.map((apt) => (
                <Card key={apt.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-foreground">
                          {apt.provider}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {apt.specialty}
                        </p>
                      </div>
                      <Badge
                        variant={
                          apt.status === "confirmed" ? "default" : "secondary"
                        }
                        className={
                          apt.status === "confirmed"
                            ? "bg-accent text-accent-foreground"
                            : ""
                        }
                      >
                        {apt.status === "confirmed" ? (
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                        ) : (
                          <AlertCircle className="mr-1 h-3 w-3" />
                        )}
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {apt.date} at {apt.time}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {apt.location}
                      </div>
                      <Badge variant="outline">{apt.type}</Badge>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Reschedule
                      </Button>
                      <Button size="sm" className="flex-1">
                        {apt.type === "Telehealth" ? "Join Call" : "Check In"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Prescriptions Tab */}
          <TabsContent value="prescriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Prescription Price Comparison</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search medications..."
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {prescriptions.map((rx) => (
                    <div
                      key={rx.name}
                      className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Pill className="h-5 w-5 text-primary" />
                          <h4 className="font-semibold text-foreground">
                            {rx.name}
                          </h4>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {rx.pharmacy} • Refill by {rx.refillDate}
                        </p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">
                            ${rx.price}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Current price
                          </p>
                        </div>

                        {rx.genericAvailable && rx.alternativePrice && (
                          <div className="rounded-lg bg-accent/10 p-3 text-right">
                            <p className="text-lg font-bold text-accent">
                              ${rx.alternativePrice}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Generic available
                            </p>
                          </div>
                        )}

                        <Button variant="outline" size="sm">
                          Compare
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        Potential Monthly Savings
                      </p>
                      <p className="text-sm text-muted-foreground">
                        By switching to generic alternatives
                      </p>
                    </div>
                    <p className="text-2xl font-bold text-accent">
                      $24.00/month
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Second Opinion Tab */}
          <TabsContent value="second-opinion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Find a Second Opinion</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Connect with specialists for a second opinion on your
                  diagnosis or treatment plan.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {secondOpinionProviders.map((provider) => (
                    <div
                      key={provider.name}
                      className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <UserCheck className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {provider.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {provider.specialty} • {provider.hospital}
                          </p>
                          <div className="mt-2 flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {provider.rating} ({provider.reviews} reviews)
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {provider.waitTime}
                            </span>
                            {provider.telehealth && (
                              <Badge variant="secondary" className="text-xs">
                                Telehealth
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button>Request Consultation</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Records Tab */}
          <TabsContent value="records" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Records</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Access and share your medical records securely.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      title: "Lab Results",
                      count: 12,
                      lastUpdated: "Jan 28, 2026",
                    },
                    {
                      title: "Imaging Reports",
                      count: 4,
                      lastUpdated: "Dec 15, 2025",
                    },
                    {
                      title: "Visit Summaries",
                      count: 8,
                      lastUpdated: "Jan 30, 2026",
                    },
                    {
                      title: "Prescriptions",
                      count: 6,
                      lastUpdated: "Feb 1, 2026",
                    },
                    {
                      title: "Immunizations",
                      count: 15,
                      lastUpdated: "Oct 2025",
                    },
                    {
                      title: "Allergies & Conditions",
                      count: 3,
                      lastUpdated: "Jan 2026",
                    },
                  ].map((record) => (
                    <Card
                      key={record.title}
                      className="cursor-pointer transition-colors hover:bg-secondary/50"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <FileText className="h-5 w-5 text-primary" />
                          <Badge variant="secondary">{record.count}</Badge>
                        </div>
                        <h4 className="mt-3 font-medium text-foreground">
                          {record.title}
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Last updated: {record.lastUpdated}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 flex justify-center">
                  <Button variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Request Records from Provider
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
