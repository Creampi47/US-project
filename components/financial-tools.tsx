"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  DollarSign,
  Calculator,
  FileText,
  TrendingDown,
  CreditCard,
  PiggyBank,
  BarChart3,
  ArrowRight,
  Check,
  AlertCircle,
  Percent,
  Building2,
  Calendar,
  Copy,
  Download,
} from "lucide-react";

const insurancePlans = [
  {
    name: "Blue Cross Blue Shield PPO",
    premium: 450,
    deductible: 1500,
    maxOOP: 6000,
    coinsurance: 20,
    network: "Large",
    rating: 4.2,
  },
  {
    name: "Aetna Select EPO",
    premium: 380,
    deductible: 2000,
    maxOOP: 7000,
    coinsurance: 25,
    network: "Medium",
    rating: 4.0,
  },
  {
    name: "United Healthcare HDHP",
    premium: 290,
    deductible: 3000,
    maxOOP: 6500,
    coinsurance: 20,
    network: "Large",
    rating: 3.9,
  },
  {
    name: "Cigna Open Access Plus",
    premium: 520,
    deductible: 1000,
    maxOOP: 5000,
    coinsurance: 15,
    network: "Large",
    rating: 4.3,
  },
];

const paymentProviders = [
  {
    name: "CareCredit",
    apr: "0%",
    term: "6-24 months",
    minAmount: 200,
    approval: "Instant",
  },
  {
    name: "Prosper Healthcare",
    apr: "0%",
    term: "6-12 months",
    minAmount: 250,
    approval: "Same day",
  },
  {
    name: "Alpheon Credit",
    apr: "5.99%",
    term: "12-60 months",
    minAmount: 500,
    approval: "Instant",
  },
  {
    name: "AccessOne",
    apr: "0%",
    term: "Up to 24 months",
    minAmount: 0,
    approval: "Varies",
  },
];

const negotiationTemplates = [
  {
    title: "Request Itemized Bill",
    description: "First step in negotiation - get a detailed breakdown",
  },
  {
    title: "Request Financial Hardship Review",
    description: "For patients facing financial difficulties",
  },
  {
    title: "Dispute Incorrect Charges",
    description: "Challenge billing errors or duplicate charges",
  },
  {
    title: "Negotiate Cash Pay Discount",
    description: "Request self-pay discount (typically 20-50% off)",
  },
];

const spendingData = [
  { month: "Jan", amount: 450 },
  { month: "Feb", amount: 320 },
  { month: "Mar", amount: 1250 },
  { month: "Apr", amount: 180 },
  { month: "May", amount: 890 },
  { month: "Jun", amount: 240 },
];

export function FinancialTools() {
  const [billAmount, setBillAmount] = useState("");
  const [negotiatedAmount, setNegotiatedAmount] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [expectedCosts, setExpectedCosts] = useState("");

  const calculateNegotiation = () => {
    const original = parseFloat(billAmount);
    if (original) {
      const negotiated = original * 0.4; // 60% reduction estimate
      setNegotiatedAmount(negotiated);
    }
  };

  const totalSpending = spendingData.reduce((sum, item) => sum + item.amount, 0);
  const avgMonthly = totalSpending / spendingData.length;

  return (
    <section id="financial" className="bg-secondary/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            <DollarSign className="mr-1 h-3 w-3" />
            Financial Tools
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Insurance & Billing Tools
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Compare insurance plans, negotiate bills, find payment options, and
            track your healthcare spending all in one place.
          </p>
        </div>

        <Tabs defaultValue="insurance" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="insurance">
              <Building2 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Insurance</span>
            </TabsTrigger>
            <TabsTrigger value="negotiation">
              <TrendingDown className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Bill Negotiation</span>
            </TabsTrigger>
            <TabsTrigger value="payment">
              <CreditCard className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Payment Plans</span>
            </TabsTrigger>
            <TabsTrigger value="hsa">
              <PiggyBank className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">HSA/FSA</span>
            </TabsTrigger>
            <TabsTrigger value="spending">
              <BarChart3 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Spending</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="insurance">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Compare Insurance Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label>Expected Annual Healthcare Costs</Label>
                    <Input
                      type="number"
                      placeholder="$0"
                      value={expectedCosts}
                      onChange={(e) => setExpectedCosts(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Coverage Type</Label>
                    <Select defaultValue="individual">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="couple">Couple</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  {insurancePlans.map((plan) => (
                    <div
                      key={plan.name}
                      className={`cursor-pointer rounded-lg border p-4 transition-all ${
                        selectedPlan === plan.name
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedPlan(plan.name)}
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">
                              {plan.name}
                            </h4>
                            <Badge variant="secondary">{plan.network} Network</Badge>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Monthly Premium
                              </p>
                              <p className="font-semibold text-foreground">
                                ${plan.premium}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Deductible
                              </p>
                              <p className="font-semibold text-foreground">
                                ${plan.deductible.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Max Out-of-Pocket
                              </p>
                              <p className="font-semibold text-foreground">
                                ${plan.maxOOP.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Coinsurance
                              </p>
                              <p className="font-semibold text-foreground">
                                {plan.coinsurance}%
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            ${(plan.premium * 12 + (parseFloat(expectedCosts) || 0) * (plan.coinsurance / 100)).toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Est. Annual Cost
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Calculator className="h-6 w-6 text-primary" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Out-of-Network Cost Calculator
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      See an out-of-network provider? Use our calculator to estimate
                      your actual costs including balance billing risks.
                    </p>
                    <Button className="mt-4 bg-transparent" variant="outline">
                      Open Calculator
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="negotiation">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Bill Negotiation Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Original Bill Amount</Label>
                    <Input
                      type="number"
                      placeholder="$0.00"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label>Service Type</Label>
                    <Select defaultValue="er">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="er">Emergency Room</SelectItem>
                        <SelectItem value="surgery">Surgery</SelectItem>
                        <SelectItem value="imaging">Imaging/Radiology</SelectItem>
                        <SelectItem value="lab">Lab Work</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Provider Type</Label>
                    <Select defaultValue="hospital">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hospital">Hospital</SelectItem>
                        <SelectItem value="clinic">Clinic</SelectItem>
                        <SelectItem value="private">Private Practice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={calculateNegotiation}>
                    Calculate Negotiation Potential
                  </Button>

                  {negotiatedAmount !== null && (
                    <div className="rounded-lg bg-accent/10 p-4">
                      <p className="text-sm text-muted-foreground">
                        Estimated Negotiated Amount
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-accent-foreground">
                          ${negotiatedAmount.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground line-through">
                          ${parseFloat(billAmount).toLocaleString()}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Potential savings of{" "}
                        <span className="font-semibold text-accent-foreground">
                          ${(parseFloat(billAmount) - negotiatedAmount).toLocaleString()}
                        </span>{" "}
                        (60%)
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Negotiation Templates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {negotiationTemplates.map((template) => (
                    <div
                      key={template.title}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">
                          {template.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {template.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4">
                    <Label>Custom Letter Generator</Label>
                    <Textarea
                      placeholder="Describe your situation and we'll help draft a negotiation letter..."
                      className="mt-1"
                      rows={4}
                    />
                    <Button className="mt-2 w-full">
                      Generate Letter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payment">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Payment Plan Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {paymentProviders.map((provider) => (
                    <div
                      key={provider.name}
                      className="rounded-lg border border-border p-4 transition-all hover:border-primary hover:shadow-md"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">
                          {provider.name}
                        </h4>
                        {provider.apr === "0%" && (
                          <Badge className="bg-accent text-accent-foreground">
                            0% APR
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">APR</span>
                          <span className="font-medium text-foreground">
                            {provider.apr}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Term</span>
                          <span className="font-medium text-foreground">
                            {provider.term}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Min Amount
                          </span>
                          <span className="font-medium text-foreground">
                            ${provider.minAmount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Approval</span>
                          <span className="font-medium text-foreground">
                            {provider.approval}
                          </span>
                        </div>
                      </div>
                      <Button className="mt-4 w-full bg-transparent" variant="outline">
                        Check Eligibility
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-accent/20 bg-accent/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-accent-foreground" />
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Need Financial Assistance?
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Many hospitals offer charity care programs for patients who
                      qualify. We can connect you with crowdfunding platforms and
                      financial assistance programs.
                    </p>
                    <Button className="mt-4 bg-transparent" variant="outline">
                      Explore Options
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hsa">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5" />
                    HSA Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 rounded-lg bg-primary/10 p-4">
                    <p className="text-sm text-muted-foreground">
                      Available Balance
                    </p>
                    <p className="text-3xl font-bold text-foreground">$4,250.00</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Annual Contribution
                      </span>
                      <span className="font-medium text-foreground">
                        $3,200 / $4,150
                      </span>
                    </div>
                    <Progress value={77} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      $950 remaining until max contribution
                    </p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Button variant="outline" className="bg-transparent">
                      View Transactions
                    </Button>
                    <Button>
                      Pay Bill with HSA
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    FSA Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 rounded-lg bg-accent/10 p-4">
                    <p className="text-sm text-muted-foreground">
                      Available Balance
                    </p>
                    <p className="text-3xl font-bold text-foreground">$1,850.00</p>
                  </div>
                  <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <p className="text-sm font-medium text-foreground">
                        Use it or lose it!
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Your FSA funds expire on Dec 31. Plan qualifying expenses now.
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="mb-2 text-sm font-medium text-foreground">
                      Eligible Expenses
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Prescriptions",
                        "Copays",
                        "Dental",
                        "Vision",
                        "First Aid",
                      ].map((item) => (
                        <Badge key={item} variant="secondary">
                          <Check className="mr-1 h-3 w-3" />
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="spending">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Healthcare Spending Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-primary/10 p-4">
                    <p className="text-sm text-muted-foreground">YTD Spending</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${totalSpending.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-lg bg-secondary p-4">
                    <p className="text-sm text-muted-foreground">Monthly Avg</p>
                    <p className="text-2xl font-bold text-foreground">
                      ${avgMonthly.toFixed(0)}
                    </p>
                  </div>
                  <div className="rounded-lg bg-accent/10 p-4">
                    <p className="text-sm text-muted-foreground">Total Saved</p>
                    <p className="text-2xl font-bold text-accent-foreground">
                      $2,450
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-4 font-medium text-foreground">
                    Monthly Spending Trend
                  </h4>
                  <div className="flex h-48 items-end gap-2">
                    {spendingData.map((item) => (
                      <div key={item.month} className="flex flex-1 flex-col items-center gap-1">
                        <div
                          className="w-full rounded-t bg-primary transition-all hover:bg-primary/80"
                          style={{
                            height: `${(item.amount / 1500) * 100}%`,
                            minHeight: "8px",
                          }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {item.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 font-medium text-foreground">
                    Spending by Category
                  </h4>
                  <div className="space-y-3">
                    {[
                      { name: "Doctor Visits", amount: 1200, percent: 36 },
                      { name: "Prescriptions", amount: 890, percent: 27 },
                      { name: "Lab Work", amount: 650, percent: 20 },
                      { name: "Dental", amount: 350, percent: 11 },
                      { name: "Vision", amount: 200, percent: 6 },
                    ].map((category) => (
                      <div key={category.name}>
                        <div className="mb-1 flex items-center justify-between text-sm">
                          <span className="text-foreground">{category.name}</span>
                          <span className="text-muted-foreground">
                            ${category.amount} ({category.percent}%)
                          </span>
                        </div>
                        <Progress value={category.percent} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button variant="outline" className="bg-transparent">
                    <Download className="mr-2 h-4 w-4" />
                    Export Tax Report
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
