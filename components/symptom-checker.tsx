"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Stethoscope,
  Clock,
  Building2,
  Home,
  ChevronRight,
  Info,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const symptomCategories = [
  {
    name: "Head & Neurological",
    symptoms: [
      "Headache",
      "Dizziness",
      "Vision changes",
      "Confusion",
      "Numbness/Tingling",
    ],
  },
  {
    name: "Chest & Respiratory",
    symptoms: [
      "Chest pain",
      "Shortness of breath",
      "Cough",
      "Wheezing",
      "Rapid heartbeat",
    ],
  },
  {
    name: "Digestive",
    symptoms: [
      "Nausea",
      "Abdominal pain",
      "Vomiting",
      "Diarrhea",
      "Loss of appetite",
    ],
  },
  {
    name: "General",
    symptoms: [
      "Fever",
      "Fatigue",
      "Body aches",
      "Chills",
      "Unexplained weight loss",
    ],
  },
];

const triageResults = {
  emergency: {
    level: "Emergency",
    color: "bg-destructive text-destructive-foreground",
    icon: AlertTriangle,
    message:
      "Based on your symptoms, you should seek emergency care immediately.",
    action: "Call 911 or go to the nearest emergency room",
  },
  urgent: {
    level: "Urgent Care",
    color: "bg-amber-500 text-white",
    icon: Clock,
    message:
      "Your symptoms suggest you should see a healthcare provider within 24 hours.",
    action: "Visit an urgent care clinic or schedule a same-day appointment",
  },
  primary: {
    level: "Primary Care",
    color: "bg-primary text-primary-foreground",
    icon: Stethoscope,
    message:
      "Your symptoms warrant a visit to your primary care physician within a few days.",
    action: "Schedule an appointment with your doctor",
  },
  selfCare: {
    level: "Self-Care",
    color: "bg-accent text-accent-foreground",
    icon: Home,
    message:
      "Your symptoms can likely be managed at home with self-care measures.",
    action: "Monitor symptoms and rest. Seek care if symptoms worsen.",
  },
};

export function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [step, setStep] = useState<"select" | "result">("select");
  const [result, setResult] = useState<keyof typeof triageResults | null>(null);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const analyzeSymptoms = () => {
    // Simple logic for demo - in production, this would use AI/ML
    const emergencySymptoms = ["Chest pain", "Shortness of breath", "Confusion"];
    const urgentSymptoms = [
      "Fever",
      "Severe abdominal pain",
      "Rapid heartbeat",
    ];

    if (selectedSymptoms.some((s) => emergencySymptoms.includes(s))) {
      setResult("emergency");
    } else if (
      selectedSymptoms.some((s) => urgentSymptoms.includes(s)) ||
      selectedSymptoms.length >= 4
    ) {
      setResult("urgent");
    } else if (selectedSymptoms.length >= 2) {
      setResult("primary");
    } else {
      setResult("selfCare");
    }
    setStep("result");
  };

  const reset = () => {
    setSelectedSymptoms([]);
    setStep("select");
    setResult(null);
  };

  const currentResult = result ? triageResults[result] : null;

  return (
    <section id="symptoms" className="bg-secondary/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            AI-Powered
          </Badge>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Symptom Checker
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Get guidance on the appropriate level of care based on your
            symptoms. Not a substitute for professional medical advice.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {step === "select" ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  Select Your Symptoms
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Check all symptoms that apply to help us provide the best
                  guidance.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {symptomCategories.map((category) => (
                    <div
                      key={category.name}
                      className="rounded-lg border border-border p-4"
                    >
                      <h3 className="mb-3 font-semibold text-foreground">
                        {category.name}
                      </h3>
                      <div className="space-y-3">
                        {category.symptoms.map((symptom) => (
                          <label
                            key={symptom}
                            className="flex cursor-pointer items-center gap-3"
                          >
                            <Checkbox
                              checked={selectedSymptoms.includes(symptom)}
                              onCheckedChange={() => toggleSymptom(symptom)}
                            />
                            <span className="text-sm text-foreground">
                              {symptom}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {selectedSymptoms.length > 0 && (
                  <div className="mt-6 rounded-lg bg-secondary/50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        Selected symptoms: {selectedSymptoms.length}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedSymptoms([])}
                      >
                        Clear all
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <Badge
                          key={symptom}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => toggleSymptom(symptom)}
                        >
                          {symptom} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-end">
                  <Button
                    size="lg"
                    disabled={selectedSymptoms.length === 0}
                    onClick={analyzeSymptoms}
                  >
                    Analyze Symptoms
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {currentResult && (
                <>
                  <Card className="overflow-hidden">
                    <div className={`p-6 ${currentResult.color}`}>
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                          <currentResult.icon className="h-8 w-8" />
                        </div>
                        <div>
                          <p className="text-sm opacity-90">
                            Recommended Care Level
                          </p>
                          <h3 className="text-2xl font-bold">
                            {currentResult.level}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="mb-4 text-foreground">
                        {currentResult.message}
                      </p>
                      <div className="rounded-lg bg-secondary/50 p-4">
                        <p className="font-medium text-foreground">
                          Recommended Action:
                        </p>
                        <p className="mt-1 text-muted-foreground">
                          {currentResult.action}
                        </p>
                      </div>

                      <div className="mt-6">
                        <h4 className="mb-3 font-medium text-foreground">
                          Your Symptoms:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedSymptoms.map((symptom) => (
                            <Badge key={symptom} variant="outline">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Important Disclaimer</AlertTitle>
                    <AlertDescription>
                      This symptom checker is for informational purposes only
                      and is not a substitute for professional medical advice,
                      diagnosis, or treatment. Always seek the advice of your
                      physician or other qualified health provider.
                    </AlertDescription>
                  </Alert>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={reset}
                      className="flex-1 bg-transparent"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Start Over
                    </Button>
                    <Button size="lg" className="flex-1">
                      Find Providers Near Me
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
