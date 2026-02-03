"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Shield,
  TrendingDown,
  Award,
  ArrowRight,
} from "lucide-react";

const popularSearches = [
  "MRI Scan",
  "Blood Test",
  "Colonoscopy",
  "X-Ray",
  "Physical Therapy",
  "Dermatology",
];

const stats = [
  { label: "Average Savings", value: "47%", icon: TrendingDown },
  { label: "Verified Providers", value: "12,000+", icon: Award },
  { label: "Procedures Compared", value: "5,000+", icon: Shield },
];

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background pb-20 pt-12 sm:pb-32 sm:pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Announcement Badge */}
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1.5 text-sm font-medium"
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />
            Now with wearable device integration
          </Badge>

          {/* Main Heading */}
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Know Your Healthcare Costs{" "}
            <span className="text-primary">Before You Go</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
            Compare prices across thousands of providers, check symptoms, and
            make informed healthcare decisions. Save an average of 47% on
            medical procedures.
          </p>

          {/* Search Box */}
          <div className="mx-auto mt-10 max-w-3xl">
            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-lg sm:flex-row sm:items-center sm:gap-2 sm:p-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search procedures, tests, or treatments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 border-0 bg-transparent pl-10 text-base shadow-none focus-visible:ring-0"
                />
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-40">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="h-12 border-0 bg-secondary/50 pl-9 shadow-none focus:ring-0 sm:border-l sm:border-border sm:bg-transparent sm:pl-9">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ny">New York, NY</SelectItem>
                      <SelectItem value="la">Los Angeles, CA</SelectItem>
                      <SelectItem value="ch">Chicago, IL</SelectItem>
                      <SelectItem value="ho">Houston, TX</SelectItem>
                      <SelectItem value="ph">Phoenix, AZ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button size="lg" className="h-12 px-6">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => setSearchQuery(search)}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-6"
              >
                <stat.icon className="h-8 w-8 text-accent" />
                <span className="text-3xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 text-center">
          <p className="mb-6 text-sm font-medium text-muted-foreground">
            Trusted by leading healthcare organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
            {[
              "Blue Cross",
              "Aetna",
              "United Health",
              "Cigna",
              "Humana",
              "Kaiser",
            ].map((brand) => (
              <div
                key={brand}
                className="text-lg font-semibold text-muted-foreground"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button variant="link" className="text-primary">
            See how it works
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
