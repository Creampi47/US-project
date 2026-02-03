"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FolderLock,
  Upload,
  FileText,
  ImageIcon,
  Download,
  Share2,
  Search,
  Calendar,
  Building2,
  Pill,
  Syringe,
  Activity,
  Shield,
  Plus,
  Eye,
  Trash2,
  Clock,
  CheckCircle,
} from "lucide-react";

const documents = [
  {
    id: 1,
    name: "Annual Physical Results",
    type: "Lab Report",
    date: "2024-01-15",
    provider: "Dr. Sarah Chen",
    facility: "NYU Langone",
    size: "2.4 MB",
    format: "PDF",
  },
  {
    id: 2,
    name: "MRI Brain Scan",
    type: "Imaging",
    date: "2023-12-08",
    provider: "Dr. James Wilson",
    facility: "Mount Sinai",
    size: "45.2 MB",
    format: "DICOM",
  },
  {
    id: 3,
    name: "Colonoscopy Report",
    type: "Procedure",
    date: "2023-11-20",
    provider: "Dr. Lisa Park",
    facility: "Memorial Hospital",
    size: "1.8 MB",
    format: "PDF",
  },
  {
    id: 4,
    name: "Blood Work - Complete Panel",
    type: "Lab Report",
    date: "2023-10-05",
    provider: "LabCorp",
    facility: "LabCorp NYC",
    size: "856 KB",
    format: "PDF",
  },
  {
    id: 5,
    name: "Chest X-Ray",
    type: "Imaging",
    date: "2023-09-12",
    provider: "Dr. Michael Torres",
    facility: "Urgent Care Plus",
    size: "12.3 MB",
    format: "DICOM",
  },
];

const medications = [
  {
    id: 1,
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    prescriber: "Dr. Sarah Chen",
    startDate: "2023-06-01",
    refillsLeft: 3,
    status: "Active",
  },
  {
    id: 2,
    name: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    prescriber: "Dr. Sarah Chen",
    startDate: "2023-01-15",
    refillsLeft: 1,
    status: "Active",
  },
  {
    id: 3,
    name: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily (evening)",
    prescriber: "Dr. James Wilson",
    startDate: "2022-09-01",
    refillsLeft: 5,
    status: "Active",
  },
];

const immunizations = [
  {
    name: "COVID-19 Booster",
    date: "2023-10-15",
    provider: "CVS Pharmacy",
    dueDate: null,
  },
  {
    name: "Flu Shot",
    date: "2023-09-20",
    provider: "Walgreens",
    dueDate: "2024-09-01",
  },
  {
    name: "Tdap",
    date: "2020-05-10",
    provider: "Dr. Sarah Chen",
    dueDate: "2030-05-10",
  },
  {
    name: "Shingles (Shingrix)",
    date: "2023-03-15",
    provider: "CVS Pharmacy",
    dueDate: null,
  },
];

const allergies = [
  { name: "Penicillin", severity: "Severe", reaction: "Anaphylaxis" },
  { name: "Shellfish", severity: "Moderate", reaction: "Hives, swelling" },
  { name: "Latex", severity: "Mild", reaction: "Skin irritation" },
];

export function HealthRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const storageUsed = 68;

  const filteredDocs = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="records" className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            <FolderLock className="mr-1 h-3 w-3" />
            Secure Storage
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Personal Health Records
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Your secure vault for all medical documents, test results, and health
            information. HIPAA-compliant and encrypted end-to-end.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {documents.length}
                </p>
                <p className="text-sm text-muted-foreground">Documents</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Pill className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {medications.length}
                </p>
                <p className="text-sm text-muted-foreground">Medications</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <Syringe className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {immunizations.length}
                </p>
                <p className="text-sm text-muted-foreground">Immunizations</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="text-sm font-medium text-foreground">
                  {storageUsed}%
                </span>
              </div>
              <Progress value={storageUsed} className="h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                6.8 GB of 10 GB used
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-4">
            <TabsTrigger value="documents">
              <FileText className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
            </TabsTrigger>
            <TabsTrigger value="medications">
              <Pill className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Medications</span>
            </TabsTrigger>
            <TabsTrigger value="immunizations">
              <Syringe className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Immunizations</span>
            </TabsTrigger>
            <TabsTrigger value="allergies">
              <Activity className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Allergies</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle>Medical Documents</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search documents..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredDocs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          {doc.format === "DICOM" ? (
                            <ImageIcon className="h-5 w-5 text-primary" />
                          ) : (
                            <FileText className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{doc.name}</p>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(doc.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3 w-3" />
                              {doc.facility}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="hidden text-right sm:block">
                          <Badge variant="secondary">{doc.type}</Badge>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {doc.size}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Current Medications</CardTitle>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medication
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((med) => (
                    <div
                      key={med.id}
                      className="rounded-lg border border-border p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">
                              {med.name}
                            </h4>
                            <Badge
                              variant="outline"
                              className="border-accent bg-accent/10 text-accent-foreground"
                            >
                              {med.status}
                            </Badge>
                          </div>
                          <p className="mt-1 text-muted-foreground">
                            {med.dosage} - {med.frequency}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Prescribed by {med.prescriber}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Since {new Date(med.startDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {med.refillsLeft} refills remaining
                          </span>
                        </div>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Request Refill
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="immunizations">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Immunization Records</CardTitle>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Record
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {immunizations.map((imm) => (
                    <div
                      key={imm.name}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                          <Syringe className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{imm.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Administered: {new Date(imm.date).toLocaleDateString()}{" "}
                            at {imm.provider}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {imm.dueDate ? (
                          <div>
                            <Badge variant="secondary">
                              <Clock className="mr-1 h-3 w-3" />
                              Due: {new Date(imm.dueDate).toLocaleDateString()}
                            </Badge>
                          </div>
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-accent bg-accent/10 text-accent-foreground"
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Up to date
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allergies">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Allergies & Sensitivities</CardTitle>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Allergy
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allergies.map((allergy) => (
                    <div
                      key={allergy.name}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            allergy.severity === "Severe"
                              ? "bg-destructive/10"
                              : allergy.severity === "Moderate"
                                ? "bg-yellow-100"
                                : "bg-secondary"
                          }`}
                        >
                          <Activity
                            className={`h-5 w-5 ${
                              allergy.severity === "Severe"
                                ? "text-destructive"
                                : allergy.severity === "Moderate"
                                  ? "text-yellow-600"
                                  : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {allergy.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Reaction: {allergy.reaction}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            allergy.severity === "Severe"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {allergy.severity}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center md:flex-row md:text-left">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground">
                Your Data is Protected
              </h3>
              <p className="text-muted-foreground">
                All records are encrypted with AES-256 and stored in HIPAA-compliant
                data centers. You control who can access your information.
              </p>
            </div>
            <Button variant="outline" className="bg-transparent">
              Manage Access
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
