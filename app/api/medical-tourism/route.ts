import { NextRequest, NextResponse } from "next/server";
import { healthcareDataAggregator } from "@/lib/services/healthcare-data-aggregator";
import type { APIResponse, MedicalTourismDestination, PriceRange } from "@/lib/types/healthcare";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const procedure = searchParams.get("procedure") || undefined;
    const destinationId = searchParams.get("destinationId");
    const calculateCosts = searchParams.get("calculateCosts") === "true";
    const userLocation = searchParams.get("userLocation");
    const stayDays = searchParams.get("stayDays") ? Number(searchParams.get("stayDays")) : undefined;

    const destinations = await healthcareDataAggregator.fetchMedicalTourismDestinations(procedure);

    // If specific destination and cost calculation requested
    if (destinationId && calculateCosts && userLocation && stayDays) {
      const destination = destinations.find(d => d.id === destinationId);
      
      if (!destination) {
        return NextResponse.json({
          success: false,
          error: {
            code: "DESTINATION_NOT_FOUND",
            message: "Destination not found",
          },
        } as APIResponse<null>, { status: 404 });
      }

      const travelCosts = await healthcareDataAggregator.calculateTotalTravelCost(
        userLocation,
        destination,
        stayDays
      );

      const response: APIResponse<{
        destination: MedicalTourismDestination;
        travelCosts: {
          flights: PriceRange;
          accommodation: number;
          meals: number;
          transport: number;
          total: PriceRange;
        };
      }> = {
        success: true,
        data: {
          destination,
          travelCosts,
        },
        meta: {
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          cached: false,
          dataSources: [
            {
              name: "Medical Tourism Association",
              type: "partner",
              lastFetched: new Date().toISOString(),
              confidenceLevel: "high",
              requiresAttribution: true,
            },
            {
              name: "Skyscanner",
              type: "commercial",
              lastFetched: new Date().toISOString(),
              confidenceLevel: "high",
              requiresAttribution: true,
            },
          ],
        },
      };

      return NextResponse.json(response);
    }

    // Return all destinations
    const response: APIResponse<MedicalTourismDestination[]> = {
      success: true,
      data: destinations,
      meta: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        cached: false,
        dataSources: [
          {
            name: "Joint Commission International",
            type: "partner",
            lastFetched: new Date().toISOString(),
            confidenceLevel: "high",
            requiresAttribution: true,
          },
          {
            name: "Medical Tourism Association",
            type: "partner",
            lastFetched: new Date().toISOString(),
            confidenceLevel: "high",
            requiresAttribution: true,
          },
        ],
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[v0] Error fetching medical tourism data:", error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: "TOURISM_FETCH_ERROR",
        message: "Failed to fetch medical tourism data",
        details: error instanceof Error ? { message: error.message } : undefined,
      },
    } as APIResponse<null>, { status: 500 });
  }
}
