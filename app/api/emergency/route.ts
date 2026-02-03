import { NextRequest, NextResponse } from "next/server";
import { healthcareDataAggregator } from "@/lib/services/healthcare-data-aggregator";
import type { APIResponse, EmergencyRoom, UrgentCare } from "@/lib/types/healthcare";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const type = searchParams.get("type") || "all"; // "er", "urgent", or "all"
    const radius = searchParams.get("radius") ? Number(searchParams.get("radius")) : 25;

    if (!lat || !lng) {
      return NextResponse.json({
        success: false,
        error: {
          code: "MISSING_LOCATION",
          message: "lat and lng query parameters are required",
        },
      } as APIResponse<null>, { status: 400 });
    }

    const latitude = Number(lat);
    const longitude = Number(lng);

    let erRooms: EmergencyRoom[] = [];
    let urgentCare: UrgentCare[] = [];

    if (type === "er" || type === "all") {
      erRooms = await healthcareDataAggregator.fetchERWaitTimes(latitude, longitude, radius);
    }

    if (type === "urgent" || type === "all") {
      urgentCare = await healthcareDataAggregator.fetchUrgentCareFacilities(latitude, longitude, radius);
    }

    const response: APIResponse<{ emergencyRooms: EmergencyRoom[]; urgentCare: UrgentCare[] }> = {
      success: true,
      data: {
        emergencyRooms: erRooms,
        urgentCare: urgentCare,
      },
      meta: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        cached: false,
        dataSources: [
          {
            name: "Hospital Real-Time Data",
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
    console.error("[v0] Error fetching emergency services:", error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: "EMERGENCY_FETCH_ERROR",
        message: "Failed to fetch emergency services data",
        details: error instanceof Error ? { message: error.message } : undefined,
      },
    } as APIResponse<null>, { status: 500 });
  }
}
