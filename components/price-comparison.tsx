"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  Heart,
  ArrowUpDown,
  Filter,
  DollarSign,
  Database,
} from "lucide-react";
import {
  DataSourceIndicator,
  ConfidenceBadge,
  PriceDisclaimer,
} from "@/components/data-source-indicator";
import type { DataSource, DataFreshness } from "@/lib/types/healthcare";

// Mock data sources for display
const mockDataSources: DataSource[] = [
  {
    name: "CMS Hospital Price Transparency",
    type: "government",
    lastFetched: new Date().toISOString(),
    confidenceLevel: "high",
    requiresAttribution: false,
  },
  {
    name: "FAIR Health",
    type: "commercial",
    lastFetched: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    confidenceLevel: "high",
    requiresAttribution: true,
  },
  {
    name: "User Reported Prices",
    type: "user_reported",
    lastFetched: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    confidenceLevel: "medium",
    requiresAttribution: false,
  },
];

const mockDataFreshness: DataFreshness = {
  lastUpdated: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  updateFrequency: "weekly",
  isStale: false,
};

const procedures = [
  {
    id: 1,
    name: "MRI Scan (Brain)",
    procedureCode: "70553",
    nationalAverage: 475,
    regionalAverage: 520,
    providers: [
      {
        name: "City Medical Center",
        address: "123 Health Ave, New York",
        distance: "2.3 mi",
        cashPrice: 450,
        insurancePrice: 180,
        rating: 4.8,
        reviews: 324,
        waitTime: "2-3 days",
        quality: "high",
        accredited: true,
        confidenceScore: 92,
        dataSource: "CMS Transparency Files",
      },
      {
        name: "Regional Imaging Center",
        address: "456 Care Blvd, New York",
        distance: "4.1 mi",
        cashPrice: 380,
        insurancePrice: 150,
        rating: 4.6,
        reviews: 189,
        waitTime: "1-2 days",
        quality: "high",
        accredited: true,
        confidenceScore: 88,
        dataSource: "FAIR Health",
      },
      {
        name: "University Hospital",
        address: "789 Medical Dr, New York",
        distance: "5.8 mi",
        cashPrice: 650,
        insurancePrice: 220,
        rating: 4.9,
        reviews: 512,
        waitTime: "5-7 days",
        quality: "premium",
        accredited: true,
        confidenceScore: 95,
        dataSource: "CMS Transparency Files",
      },
      {
        name: "Quick Scan Clinic",
        address: "321 Express St, Brooklyn",
        distance: "7.2 mi",
        cashPrice: 320,
        insurancePrice: 140,
        rating: 4.3,
        reviews: 98,
        waitTime: "Same day",
        quality: "standard",
        accredited: false,
        confidenceScore: 72,
        dataSource: "User Reported",
      },
    ],
  },
];

const priceRanges = {
  low: { min: 200, max: 400, label: "Below Average" },
  average: { min: 400, max: 600, label: "Average" },
  high: { min: 600, max: 1000, label: "Above Average" },
};

export function PriceComparison() {
  const [sortBy, setSortBy] = useState("price");
  const [priceType, setPriceType] = useState("cash");
  const [savedProviders, setSavedProviders] = useState<string[]>([]);

  const toggleSaved = (name: string) => {
    setSavedProviders((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  const procedure = procedures[0];
  const sortedProviders = [...procedure.providers].sort((a, b) => {
    if (sortBy === "price") {
      return priceType === "cash"
        ? a.cashPrice - b.cashPrice
        : a.insurancePrice - b.insurancePrice;
    }
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "distance")
      return Number.parseFloat(a.distance) - Number.parseFloat(b.distance);
    return 0;
  });

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "premium":
        return "bg-accent text-accent-foreground";
      case "high":
        return "bg-primary/10 text-primary";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <section id="search" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            Price Transparency
          </Badge>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Compare Healthcare Prices
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            See real prices from verified providers. Filter by insurance,
            quality ratings, and wait times.
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="border-b border-border bg-secondary/30">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-xl">{procedure.name}</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {procedure.providers.length} providers found in your area
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Tabs
                  value={priceType}
                  onValueChange={setPriceType}
                  className="w-auto"
                >
                  <TabsList className="h-9">
                    <TabsTrigger value="cash" className="text-xs">
                      Cash Price
                    </TabsTrigger>
                    <TabsTrigger value="insurance" className="text-xs">
                      With Insurance
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-9 w-36">
                    <ArrowUpDown className="mr-2 h-3 w-3" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Sort by Price</SelectItem>
                    <SelectItem value="rating">Sort by Rating</SelectItem>
                    <SelectItem value="distance">Sort by Distance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price Range Indicator */}
            <div className="mt-6 rounded-lg bg-card p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Regional Price Range
                </span>
                <span className="font-medium text-foreground">$200 - $800</span>
              </div>
              <div className="relative h-2 rounded-full bg-secondary">
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-accent to-primary"
                  style={{ left: "15%", right: "25%" }}
                />
                {sortedProviders.map((provider, idx) => {
                  const price =
                    priceType === "cash"
                      ? provider.cashPrice
                      : provider.insurancePrice;
                  const position = ((price - 200) / 600) * 100;
                  return (
                    <div
                      key={provider.name}
                      className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-primary"
                      style={{ left: `${Math.min(Math.max(position, 5), 95)}%` }}
                      title={`${provider.name}: $${price}`}
                    />
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>$200</span>
                <span>$500</span>
                <span>$800</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {sortedProviders.map((provider, index) => {
                const price =
                  priceType === "cash"
                    ? provider.cashPrice
                    : provider.insurancePrice;
                const isBestValue =
                  index === 0 && sortBy === "price" && provider.rating >= 4.5;

                return (
                  <div
                    key={provider.name}
                    className="relative flex flex-col gap-4 p-6 transition-colors hover:bg-secondary/30 sm:flex-row sm:items-center sm:justify-between"
                  >
                    {isBestValue && (
                      <div className="absolute left-0 top-0 rounded-br-lg bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                        Best Value
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <DollarSign className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {provider.name}
                          </h3>
                          <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {provider.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              {provider.rating} ({provider.reviews})
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {provider.waitTime}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge
                              variant="secondary"
                              className={getQualityColor(provider.quality)}
                            >
                              {provider.quality.charAt(0).toUpperCase() +
                                provider.quality.slice(1)}{" "}
                              Quality
                            </Badge>
                            {provider.accredited && (
                              <Badge
                                variant="outline"
                                className="border-accent text-accent"
                              >
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Accredited
                              </Badge>
                            )}
                            <ConfidenceBadge score={provider.confidenceScore} />
                          </div>
                          <div className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Database className="h-3 w-3" />
                            <span>Source: {provider.dataSource}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">
                          ${price}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {priceType === "cash"
                            ? "Cash/Self-Pay"
                            : "Est. with Insurance"}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleSaved(provider.name)}
                          className={
                            savedProviders.includes(provider.name)
                              ? "text-destructive"
                              : ""
                          }
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              savedProviders.includes(provider.name)
                                ? "fill-current"
                                : ""
                            }`}
                          />
                        </Button>
                        <Button size="sm">Book Now</Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col items-center gap-6">
          <Button variant="outline" size="lg">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>

          {/* Data Sources & Disclaimer */}
          <div className="w-full max-w-3xl space-y-4">
            <DataSourceIndicator
              sources={mockDataSources}
              freshness={mockDataFreshness}
            />
            <PriceDisclaimer />
          </div>
        </div>
      </div>
    </section>
  );
}
