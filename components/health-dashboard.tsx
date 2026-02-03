"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Activity,
  Moon,
  Footprints,
  Flame,
  Droplets,
  TrendingUp,
  TrendingDown,
  Watch,
  Smartphone,
  Plus,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const healthMetrics = [
  {
    name: "Heart Rate",
    value: 72,
    unit: "bpm",
    icon: Heart,
    trend: "stable",
    change: 0,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    target: "60-100 bpm",
    status: "normal",
  },
  {
    name: "Steps Today",
    value: 8432,
    unit: "steps",
    icon: Footprints,
    trend: "up",
    change: 12,
    color: "text-accent",
    bgColor: "bg-accent/10",
    target: "10,000 steps",
    status: "good",
  },
  {
    name: "Sleep",
    value: 7.2,
    unit: "hours",
    icon: Moon,
    trend: "up",
    change: 8,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    target: "7-9 hours",
    status: "normal",
  },
  {
    name: "Calories",
    value: 1840,
    unit: "kcal",
    icon: Flame,
    trend: "down",
    change: -5,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    target: "2,000 kcal",
    status: "good",
  },
];

const weeklyData = [
  { day: "Mon", heartRate: 74, steps: 6200, sleep: 6.5, calories: 1950 },
  { day: "Tue", heartRate: 71, steps: 8100, sleep: 7.0, calories: 2100 },
  { day: "Wed", heartRate: 76, steps: 5400, sleep: 6.8, calories: 1800 },
  { day: "Thu", heartRate: 72, steps: 9200, sleep: 7.5, calories: 2200 },
  { day: "Fri", heartRate: 70, steps: 7800, sleep: 7.2, calories: 1900 },
  { day: "Sat", heartRate: 68, steps: 10500, sleep: 8.0, calories: 2300 },
  { day: "Sun", heartRate: 72, steps: 8432, sleep: 7.2, calories: 1840 },
];

const connectedDevices = [
  { name: "Apple Watch", connected: true, lastSync: "2 min ago" },
  { name: "Fitbit Sense", connected: false, lastSync: "Never" },
  { name: "Garmin Venu", connected: false, lastSync: "Never" },
];

const healthInsights = [
  {
    type: "positive",
    title: "Great Sleep Pattern",
    message:
      "Your sleep has improved 15% this week. Keep maintaining your bedtime routine.",
  },
  {
    type: "warning",
    title: "Activity Goal",
    message:
      "You're 1,568 steps away from your daily goal. A 15-minute walk would help!",
  },
  {
    type: "positive",
    title: "Heart Rate Stable",
    message:
      "Your resting heart rate has been consistent. This is a sign of good cardiovascular health.",
  },
];

export function HealthDashboard() {
  const [selectedMetric, setSelectedMetric] = useState("steps");

  return (
    <section id="dashboard" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4">
            Wearable Integration
          </Badge>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Your Health Dashboard
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Connect your wearable devices to track your health metrics in
            real-time and get personalized insights.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Metrics Cards */}
          {healthMetrics.map((metric) => (
            <Card
              key={metric.name}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => setSelectedMetric(metric.name.toLowerCase())}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`rounded-lg p-2 ${metric.bgColor}`}>
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  {metric.trend !== "stable" && (
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        metric.trend === "up"
                          ? "text-accent"
                          : "text-destructive"
                      }`}
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {Math.abs(metric.change)}%
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">{metric.name}</p>
                  <p className="mt-1 text-2xl font-bold text-foreground">
                    {metric.value.toLocaleString()}
                    <span className="ml-1 text-sm font-normal text-muted-foreground">
                      {metric.unit}
                    </span>
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground">
                    Target: {metric.target}
                  </p>
                  <Progress
                    value={
                      metric.name === "Steps Today"
                        ? (metric.value / 10000) * 100
                        : metric.name === "Sleep"
                          ? (metric.value / 8) * 100
                          : metric.name === "Calories"
                            ? (metric.value / 2000) * 100
                            : 72
                    }
                    className="mt-2 h-1.5"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Weekly Trends</CardTitle>
                <Tabs
                  value={selectedMetric}
                  onValueChange={setSelectedMetric}
                  className="w-auto"
                >
                  <TabsList className="h-8">
                    <TabsTrigger value="steps" className="text-xs">
                      Steps
                    </TabsTrigger>
                    <TabsTrigger value="heart rate" className="text-xs">
                      Heart Rate
                    </TabsTrigger>
                    <TabsTrigger value="sleep" className="text-xs">
                      Sleep
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient
                        id="colorMetric"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-primary)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-primary)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border"
                    />
                    <XAxis
                      dataKey="day"
                      className="text-xs"
                      tick={{ fill: "var(--color-muted-foreground)" }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "var(--color-muted-foreground)" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        borderColor: "var(--color-border)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={
                        selectedMetric === "heart rate" ? "heartRate" : selectedMetric
                      }
                      stroke="var(--color-primary)"
                      strokeWidth={2}
                      fill="url(#colorMetric)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Connected Devices & Insights */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Watch className="h-4 w-4" />
                  Connected Devices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {connectedDevices.map((device) => (
                  <div
                    key={device.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          device.connected ? "bg-accent" : "bg-muted"
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {device.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {device.connected
                            ? `Synced ${device.lastSync}`
                            : "Not connected"}
                        </p>
                      </div>
                    </div>
                    {!device.connected && (
                      <Button variant="ghost" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" className="mt-2 w-full bg-transparent">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Connect New Device
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Activity className="h-4 w-4" />
                  Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {healthInsights.map((insight, index) => (
                  <div
                    key={index}
                    className="flex gap-3 rounded-lg border border-border p-3"
                  >
                    {insight.type === "positive" ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    ) : (
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {insight.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {insight.message}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button variant="outline" size="lg">
            Share Data with Provider
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
