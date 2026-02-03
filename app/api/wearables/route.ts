import { NextRequest, NextResponse } from "next/server";
import { healthcareDataAggregator } from "@/lib/services/healthcare-data-aggregator";
import type { APIResponse, HealthMetrics } from "@/lib/types/healthcare";

// Sync wearable data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, deviceType, accessToken } = body;

    if (!userId || !deviceType || !accessToken) {
      return NextResponse.json({
        success: false,
        error: {
          code: "MISSING_PARAMS",
          message: "userId, deviceType, and accessToken are required",
        },
      } as APIResponse<null>, { status: 400 });
    }

    const validDevices = ["apple_health", "fitbit", "garmin", "google_fit", "oura", "withings"];
    if (!validDevices.includes(deviceType)) {
      return NextResponse.json({
        success: false,
        error: {
          code: "INVALID_DEVICE",
          message: `deviceType must be one of: ${validDevices.join(", ")}`,
        },
      } as APIResponse<null>, { status: 400 });
    }

    const metrics = await healthcareDataAggregator.syncWearableData(userId, deviceType, accessToken);

    const response: APIResponse<HealthMetrics[]> = {
      success: true,
      data: metrics,
      meta: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        cached: false,
        dataSources: [
          {
            name: deviceType,
            type: "partner",
            lastFetched: new Date().toISOString(),
            confidenceLevel: "high",
            requiresAttribution: false,
          },
        ],
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[v0] Error syncing wearable data:", error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: "WEARABLE_SYNC_ERROR",
        message: "Failed to sync wearable data",
        details: error instanceof Error ? { message: error.message } : undefined,
      },
    } as APIResponse<null>, { status: 500 });
  }
}

// Get supported devices and connection status
export async function GET() {
  const supportedDevices = [
    {
      id: "apple_health",
      name: "Apple Health",
      platform: "iOS",
      metrics: ["steps", "heartRate", "sleep", "activeMinutes", "caloriesBurned"],
      authType: "healthkit",
    },
    {
      id: "google_fit",
      name: "Google Fit",
      platform: "Android",
      metrics: ["steps", "heartRate", "sleep", "activeMinutes", "caloriesBurned"],
      authType: "oauth2",
    },
    {
      id: "fitbit",
      name: "Fitbit",
      platform: "Cross-platform",
      metrics: ["steps", "heartRate", "sleep", "activeMinutes", "caloriesBurned", "weight"],
      authType: "oauth2",
    },
    {
      id: "garmin",
      name: "Garmin",
      platform: "Cross-platform",
      metrics: ["steps", "heartRate", "sleep", "activeMinutes", "caloriesBurned", "stress"],
      authType: "oauth2",
    },
    {
      id: "oura",
      name: "Oura Ring",
      platform: "Cross-platform",
      metrics: ["sleep", "heartRate", "readiness", "activity"],
      authType: "oauth2",
    },
    {
      id: "withings",
      name: "Withings",
      platform: "Cross-platform",
      metrics: ["weight", "bloodPressure", "sleep", "steps"],
      authType: "oauth2",
    },
  ];

  return NextResponse.json({
    success: true,
    data: { supportedDevices },
    meta: {
      requestId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      cached: true,
      dataSources: [],
    },
  });
}
