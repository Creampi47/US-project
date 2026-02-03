"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Video,
  Clock,
  Star,
  Shield,
  Languages,
  Calendar,
  MessageSquare,
  Phone,
  Search,
  CheckCircle,
  Zap,
} from "lucide-react";

const telemedProviders = [
  {
    id: 1,
    name: "Teladoc Health",
    specialty: "General Medicine",
    price: 75,
    waitTime: "< 10 min",
    rating: 4.6,
    reviews: 12500,
    languages: ["English", "Spanish"],
    available: true,
    features: ["24/7 Available", "Prescriptions", "Mental Health"],
    image: "/providers/teladoc.jpg",
  },
  {
    id: 2,
    name: "MDLive",
    specialty: "Urgent Care",
    price: 82,
    waitTime: "< 15 min",
    rating: 4.5,
    reviews: 8900,
    languages: ["English", "Spanish", "Mandarin"],
    available: true,
    features: ["Board Certified", "Lab Orders", "Specialist Referrals"],
    image: "/providers/mdlive.jpg",
  },
  {
    id: 3,
    name: "Amwell",
    specialty: "Family Medicine",
    price: 79,
    waitTime: "< 20 min",
    rating: 4.4,
    reviews: 7200,
    languages: ["English"],
    available: true,
    features: ["Insurance Accepted", "Follow-up Care", "E-Prescriptions"],
    image: "/providers/amwell.jpg",
  },
  {
    id: 4,
    name: "PlushCare",
    specialty: "Primary Care",
    price: 119,
    waitTime: "Scheduled",
    rating: 4.8,
    reviews: 5600,
    languages: ["English", "Spanish"],
    available: true,
    features: ["Same-Day Appointments", "Chronic Care", "Lab Interpretation"],
    image: "/providers/plushcare.jpg",
  },
  {
    id: 5,
    name: "BetterHelp",
    specialty: "Mental Health",
    price: 65,
    waitTime: "Scheduled",
    rating: 4.7,
    reviews: 25000,
    languages: ["English", "Spanish", "Portuguese"],
    available: true,
    features: ["Licensed Therapists", "Messaging", "Video Sessions"],
    image: "/providers/betterhelp.jpg",
  },
  {
    id: 6,
    name: "Hims / Hers",
    specialty: "Wellness",
    price: 39,
    waitTime: "< 5 min",
    rating: 4.3,
    reviews: 18000,
    languages: ["English"],
    available: true,
    features: ["Dermatology", "Hair Loss", "Sexual Health"],
    image: "/providers/hims.jpg",
  },
];

const specialties = [
  "All Specialties",
  "General Medicine",
  "Urgent Care",
  "Mental Health",
  "Dermatology",
  "Primary Care",
  "Pediatrics",
  "Women's Health",
];

export function TelemedicineMarketplace() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProviders = telemedProviders.filter((provider) => {
    const matchesSpecialty =
      selectedSpecialty === "All Specialties" ||
      provider.specialty === selectedSpecialty;
    const matchesSearch = provider.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <section id="telemedicine" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            <Video className="mr-1 h-3 w-3" />
            Virtual Care
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Telemedicine Marketplace
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Compare virtual care providers and book appointments instantly. See a
            doctor from the comfort of your home.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search providers..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select specialty" />
            </SelectTrigger>
            <SelectContent>
              {specialties.map((specialty) => (
                <SelectItem key={specialty} value={specialty}>
                  {specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{"< 15min"}</p>
                <p className="text-sm text-muted-foreground">Avg Wait Time</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Shield className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">100%</p>
                <p className="text-sm text-muted-foreground">Board Certified</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Clock className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">Availability</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Languages className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">15+</p>
                <p className="text-sm text-muted-foreground">Languages</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.map((provider) => (
            <Card
              key={provider.id}
              className="group overflow-hidden transition-all hover:shadow-lg"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <Video className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{provider.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {provider.specialty}
                      </p>
                    </div>
                  </div>
                  {provider.available && (
                    <Badge className="bg-accent text-accent-foreground">
                      <span className="mr-1 h-2 w-2 animate-pulse rounded-full bg-current" />
                      Available
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="font-medium text-foreground">
                      {provider.rating}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({provider.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {provider.waitTime}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {provider.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Languages className="h-4 w-4" />
                  {provider.languages.join(", ")}
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      ${provider.price}
                    </p>
                    <p className="text-xs text-muted-foreground">per visit</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      <Video className="mr-2 h-4 w-4" />
                      Book Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:text-left">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground">
                Need to see a specialist?
              </h3>
              <p className="text-muted-foreground">
                Book a virtual consultation with board-certified specialists in
                cardiology, dermatology, psychiatry, and more.
              </p>
            </div>
            <Button size="lg">
              Browse Specialists
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
