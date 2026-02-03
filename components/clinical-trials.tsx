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
import { Progress } from "@/components/ui/progress";
import {
  FlaskConical,
  Search,
  MapPin,
  Calendar,
  Users,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const clinicalTrials = [
  {
    id: "NCT04892017",
    title: "Novel Treatment for Type 2 Diabetes",
    condition: "Type 2 Diabetes",
    phase: "Phase 3",
    status: "Recruiting",
    sponsor: "Eli Lilly and Company",
    location: "Multiple locations",
    distance: "3.2 mi",
    compensation: "$1,500",
    duration: "12 months",
    enrolled: 245,
    target: 400,
    eligibility: ["Age 18-65", "Diagnosed T2D", "No insulin use"],
    description:
      "Investigating a new oral medication for blood sugar control in adults with type 2 diabetes.",
  },
  {
    id: "NCT05123456",
    title: "Immunotherapy for Advanced Melanoma",
    condition: "Melanoma",
    phase: "Phase 2",
    status: "Recruiting",
    sponsor: "Memorial Sloan Kettering",
    location: "New York, NY",
    distance: "5.8 mi",
    compensation: "$2,000",
    duration: "6 months",
    enrolled: 89,
    target: 150,
    eligibility: ["Age 21+", "Stage III/IV Melanoma", "Prior treatment"],
    description:
      "Testing a combination immunotherapy approach for patients with advanced melanoma.",
  },
  {
    id: "NCT05789012",
    title: "Gene Therapy for Sickle Cell Disease",
    condition: "Sickle Cell Disease",
    phase: "Phase 1",
    status: "Enrolling",
    sponsor: "NIH",
    location: "Bethesda, MD",
    distance: "Travel provided",
    compensation: "$3,500",
    duration: "24 months",
    enrolled: 12,
    target: 50,
    eligibility: ["Age 12-35", "Confirmed SCD", "No recent transfusions"],
    description:
      "Pioneering gene therapy trial for patients with severe sickle cell disease.",
  },
  {
    id: "NCT05345678",
    title: "Depression Treatment with Psilocybin",
    condition: "Major Depression",
    phase: "Phase 2",
    status: "Recruiting",
    sponsor: "Johns Hopkins University",
    location: "Baltimore, MD",
    distance: "45 mi",
    compensation: "$800",
    duration: "3 months",
    enrolled: 67,
    target: 100,
    eligibility: ["Age 25-65", "Treatment-resistant depression", "No psychosis history"],
    description:
      "Evaluating psilocybin-assisted therapy for treatment-resistant major depression.",
  },
];

const conditions = [
  "All Conditions",
  "Diabetes",
  "Cancer",
  "Heart Disease",
  "Mental Health",
  "Autoimmune",
  "Neurological",
];

export function ClinicalTrials() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");

  const filteredTrials = clinicalTrials.filter((trial) => {
    const matchesSearch =
      trial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trial.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition =
      selectedCondition === "All Conditions" ||
      trial.condition.toLowerCase().includes(selectedCondition.toLowerCase());
    return matchesSearch && matchesCondition;
  });

  return (
    <section id="clinical-trials" className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            <FlaskConical className="mr-1 h-3 w-3" />
            Research Opportunities
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Clinical Trial Finder
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Access cutting-edge treatments through clinical trials. Many trials
            offer free treatment and compensation for participants.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by condition, treatment, or trial ID..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={selectedCondition}
                onValueChange={setSelectedCondition}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>
                      {condition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Location..." className="pl-10 md:w-48" />
              </div>
              <Button>
                <Search className="mr-2 h-4 w-4" />
                Search Trials
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Found <span className="font-semibold text-foreground">{filteredTrials.length}</span> trials matching your criteria
          </p>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="compensation">Compensation</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-6">
          {filteredTrials.map((trial) => (
            <Card key={trial.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          trial.status === "Recruiting"
                            ? "border-accent bg-accent/10 text-accent-foreground"
                            : "border-primary bg-primary/10 text-primary"
                        }
                      >
                        {trial.status}
                      </Badge>
                      <Badge variant="secondary">{trial.phase}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {trial.id}
                      </span>
                    </div>
                    <CardTitle className="text-xl">{trial.title}</CardTitle>
                    <p className="mt-1 text-muted-foreground">
                      {trial.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {trial.compensation}
                    </div>
                    <p className="text-xs text-muted-foreground">compensation</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {trial.sponsor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {trial.location} ({trial.distance})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {trial.duration} duration
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">
                      {trial.enrolled}/{trial.target} enrolled
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Enrollment Progress</span>
                    <span className="font-medium text-foreground">
                      {Math.round((trial.enrolled / trial.target) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(trial.enrolled / trial.target) * 100}
                    className="h-2"
                  />
                </div>

                <div className="rounded-lg bg-secondary/50 p-4">
                  <h4 className="mb-2 text-sm font-medium text-foreground">
                    Key Eligibility Criteria
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {trial.eligibility.map((criteria) => (
                      <Badge
                        key={criteria}
                        variant="outline"
                        className="bg-card"
                      >
                        <CheckCircle className="mr-1 h-3 w-3 text-accent" />
                        {criteria}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                  <Button variant="outline" className="bg-transparent">
                    <FileText className="mr-2 h-4 w-4" />
                    Full Details
                  </Button>
                  <Button>
                    Check Eligibility
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:text-left">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground">
                Get Matched to Trials Automatically
              </h3>
              <p className="text-muted-foreground">
                Create a health profile and we&apos;ll notify you when new trials
                matching your conditions become available in your area.
              </p>
            </div>
            <Button size="lg">
              Create Health Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
