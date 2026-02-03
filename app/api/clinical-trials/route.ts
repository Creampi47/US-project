import { NextRequest, NextResponse } from "next/server";
import { healthcareDataAggregator } from "@/lib/services/healthcare-data-aggregator";
import type { APIResponse, ClinicalTrial } from "@/lib/types/healthcare";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const condition = searchParams.get("condition");
    if (!condition) {
      return NextResponse.json({
        success: false,
        error: {
          code: "MISSING_CONDITION",
          message: "condition query parameter is required",
        },
      } as APIResponse<null>, { status: 400 });
    }

    const filters: {
      status?: string[];
      phase?: string[];
      location?: { lat: number; lng: number; radius: number };
    } = {};

    // Parse status filter
    const status = searchParams.get("status");
    if (status) {
      filters.status = status.split(",");
    }

    // Parse phase filter
    const phase = searchParams.get("phase");
    if (phase) {
      filters.phase = phase.split(",");
    }

    // Parse location filter
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius");
    
    if (lat && lng) {
      filters.location = {
        lat: Number(lat),
        lng: Number(lng),
        radius: radius ? Number(radius) : 100,
      };
    }

    const trials = await healthcareDataAggregator.fetchClinicalTrials(condition, filters);

    const response: APIResponse<ClinicalTrial[]> = {
      success: true,
      data: trials,
      meta: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        cached: false,
        dataSources: [
          {
            name: "ClinicalTrials.gov",
            type: "government",
            lastFetched: new Date().toISOString(),
            confidenceLevel: "high",
            requiresAttribution: true,
          },
        ],
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[v0] Error fetching clinical trials:", error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: "TRIALS_FETCH_ERROR",
        message: "Failed to fetch clinical trials data",
        details: error instanceof Error ? { message: error.message } : undefined,
      },
    } as APIResponse<null>, { status: 500 });
  }
}
