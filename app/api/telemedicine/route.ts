import { NextRequest, NextResponse } from "next/server";
import { healthcareDataAggregator } from "@/lib/services/healthcare-data-aggregator";
import type { APIResponse, TelemedicineProvider } from "@/lib/types/healthcare";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const specialty = searchParams.get("specialty") || undefined;
    const state = searchParams.get("state") || undefined;

    const providers = await healthcareDataAggregator.fetchTelemedicineProviders(specialty, state);

    const response: APIResponse<TelemedicineProvider[]> = {
      success: true,
      data: providers,
      meta: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        cached: false,
        dataSources: [
          {
            name: "Telemedicine Provider Directory",
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
    console.error("[v0] Error fetching telemedicine providers:", error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: "TELEMEDICINE_FETCH_ERROR",
        message: "Failed to fetch telemedicine provider data",
        details: error instanceof Error ? { message: error.message } : undefined,
      },
    } as APIResponse<null>, { status: 500 });
  }
}
