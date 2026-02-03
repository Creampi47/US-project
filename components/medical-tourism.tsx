"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Globe,
  Plane,
  Shield,
  Star,
  MapPin,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Award,
} from "lucide-react";

const destinations = [
  {
    country: "Mexico",
    city: "Tijuana",
    flag: "🇲🇽",
    specialties: ["Dental", "Bariatric Surgery", "Cosmetic"],
    avgSavings: 65,
    topHospital: "Hospital Angeles Tijuana",
    accreditation: "JCI",
    rating: 4.7,
    reviews: 1240,
    flightTime: "3h from LA",
  },
  {
    country: "Thailand",
    city: "Bangkok",
    flag: "🇹🇭",
    specialties: ["Cosmetic Surgery", "Cardiac", "Orthopedic"],
    avgSavings: 70,
    topHospital: "Bumrungrad International",
    accreditation: "JCI",
    rating: 4.9,
    reviews: 3420,
    flightTime: "17h from NYC",
  },
  {
    country: "Costa Rica",
    city: "San Jose",
    flag: "🇨🇷",
    specialties: ["Dental", "Cosmetic", "Weight Loss"],
    avgSavings: 55,
    topHospital: "CIMA Hospital",
    accreditation: "JCI",
    rating: 4.6,
    reviews: 890,
    flightTime: "5h from Miami",
  },
  {
    country: "India",
    city: "New Delhi",
    flag: "🇮🇳",
    specialties: ["Cardiac", "Orthopedic", "Transplant"],
    avgSavings: 80,
    topHospital: "Apollo Hospitals",
    accreditation: "JCI, NABH",
    rating: 4.8,
    reviews: 2150,
    flightTime: "15h from NYC",
  },
];

const procedures = [
  { name: "Hip Replacement", usPrice: 40000, intlPrice: 12000 },
  { name: "Heart Bypass", usPrice: 123000, intlPrice: 25000 },
  { name: "Dental Implants (per tooth)", usPrice: 4500, intlPrice: 900 },
  { name: "Knee Replacement", usPrice: 35000, intlPrice: 10000 },
  { name: "Gastric Bypass", usPrice: 25000, intlPrice: 8000 },
];

export function MedicalTourism() {
  const [selectedProcedure, setSelectedProcedure] = useState("");
  const [travelCosts, setTravelCosts] = useState(2000);

  const procedure = procedures.find((p) => p.name === selectedProcedure);
  const totalSavings = procedure
    ? procedure.usPrice - procedure.intlPrice - travelCosts
    : 0;

  return (
    <section id="tourism" className="bg-secondary/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            Global Healthcare
          </Badge>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Medical Tourism Options
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore accredited international hospitals and save up to 80% on
            medical procedures without compromising quality.
          </p>
        </div>

        {/* Cost Calculator */}
        <Card className="mx-auto mb-12 max-w-3xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Savings Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Procedure
                </label>
                <Select
                  value={selectedProcedure}
                  onValueChange={setSelectedProcedure}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select procedure" />
                  </SelectTrigger>
                  <SelectContent>
                    {procedures.map((p) => (
                      <SelectItem key={p.name} value={p.name}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Est. Travel Costs
                </label>
                <Input
                  type="number"
                  value={travelCosts}
                  onChange={(e) => setTravelCosts(Number(e.target.value))}
                  className="h-10"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Potential Savings
                </label>
                <div className="flex h-10 items-center rounded-lg bg-accent/10 px-4">
                  <span className="text-xl font-bold text-accent">
                    {totalSavings > 0
                      ? `$${totalSavings.toLocaleString()}`
                      : "Select a procedure"}
                  </span>
                </div>
              </div>
            </div>

            {procedure && (
              <div className="mt-6 rounded-lg border border-border p-4">
                <div className="grid gap-4 text-sm sm:grid-cols-4">
                  <div>
                    <p className="text-muted-foreground">US Average Price</p>
                    <p className="text-lg font-semibold text-foreground">
                      ${procedure.usPrice.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">International Price</p>
                    <p className="text-lg font-semibold text-accent">
                      ${procedure.intlPrice.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Travel & Stay</p>
                    <p className="text-lg font-semibold text-foreground">
                      ${travelCosts.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Your Savings</p>
                    <p className="text-lg font-semibold text-accent">
                      {Math.round(
                        ((procedure.usPrice - procedure.intlPrice - travelCosts) /
                          procedure.usPrice) *
                          100
                      )}
                      % saved
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Destinations */}
        <div className="grid gap-6 md:grid-cols-2">
          {destinations.map((dest) => (
            <Card
              key={dest.country}
              className="overflow-hidden transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{dest.flag}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {dest.city}, {dest.country}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {dest.flightTime}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-accent text-accent-foreground">
                    Save up to {dest.avgSavings}%
                  </Badge>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {dest.specialties.map((spec) => (
                    <Badge key={spec} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">
                      {dest.topHospital}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Shield className="h-3 w-3" />
                      {dest.accreditation}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {dest.rating} ({dest.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    View Hospitals
                  </Button>
                  <Button className="flex-1">
                    Get Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 rounded-xl border border-border bg-card p-8">
          <h3 className="mb-6 text-center text-lg font-semibold text-foreground">
            Quality & Safety Assurance
          </h3>
          <div className="grid gap-6 sm:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "JCI Accredited",
                desc: "All partner hospitals meet international standards",
              },
              {
                icon: CheckCircle2,
                title: "Verified Reviews",
                desc: "Real patient experiences and outcomes",
              },
              {
                icon: Globe,
                title: "Travel Support",
                desc: "Visa, travel, and accommodation assistance",
              },
              {
                icon: DollarSign,
                title: "Price Guarantee",
                desc: "No hidden fees, all costs upfront",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-medium text-foreground">{item.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
