import { NextRequest, NextResponse } from "next/server";
import { healthcareDataAggregator } from "@/lib/services/healthcare-data-aggregator";
import type { SearchFilters, APIResponse, Provider, SearchResult } from "@/lib/types/healthcare";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const filters: SearchFilters = {
      query: searchParams.get("query") || undefined,
      procedureCode: searchParams.get("procedureCode") || undefined,
      zipCode: searchParams.get("zipCode") || undefined,
      state: searchParams.get("state") || undefined,
      qualityRating: searchParams.get("qualityRating") 
        ? Number(searchParams.get("qualityRating")) 
        : undefined,
      sortBy: (searchParams.get("sortBy") as SearchFilters["sortBy"]) || "rating",
      sortOrder: (searchParams.get("sortOrder") as SearchFilters["sortOrder"]) || "desc",
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 20,
    };

    // Parse location if provided
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius");
    
    if (lat && lng) {
      filters.location = {
        lat: Number(lat),
        lng: Number(lng),
        radius: radius ? Number(radius) : 25,
      };
    }

    // Parse array filters
    const providerTypes = searchParams.get("providerTypes");
    if (providerTypes) {
      filters.providerTypes = providerTypes.split(",") as Provider["type"][];
    }

    const insurance = searchParams.get("insurance");
    if (insurance) {
      filters.insuranceAccepted = insurance.split(",");
    }

    const accreditations = searchParams.get("accreditations");
    if (accreditations) {
      filters.accreditations = accreditations.split(",");
    }

    const result = await healthcareDataAggregator.fetchProviders(filters);

    const response: APIResponse<SearchResult<Provider>> = {
      success: true,
      data: result,
      meta: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        cached: false,
        dataSources: [
          {
            name: "NPI Registry",
            type: "government",
            lastFetched: new Date().toISOString(),
            confidenceLevel: "high",
            requiresAttribution: false,
          },
          {
            name: "CMS Hospital Compare",
            type: "government",
            lastFetched: new Date().toISOString(),
            confidenceLevel: "high",
            requiresAttribution: false,
          },
        ],
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[v0] Error fetching providers:", error);
    
    const response: APIResponse<null> = {
      success: false,
      error: {
        code: "PROVIDER_FETCH_ERROR",
        message: "Failed to fetch provider data",
        details: error instanceof Error ? { message: error.message } : undefined,
      },
    };

    return NextResponse.json(response, { status: 500 });
  }
}
