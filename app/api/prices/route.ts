import { NextRequest, NextResponse } from "next/server";
import { healthcareDataAggregator } from "@/lib/services/healthcare-data-aggregator";
import type { SearchFilters, APIResponse, ProcedurePrice, SearchResult } from "@/lib/types/healthcare";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const procedureCode = searchParams.get("procedureCode");
    if (!procedureCode) {
      return NextResponse.json({
        success: false,
        error: {
          code: "MISSING_PROCEDURE_CODE",
          message: "procedureCode query parameter is required",
        },
      } as APIResponse<null>, { status: 400 });
    }

    const filters: SearchFilters = {
      procedureCode,
      zipCode: searchParams.get("zipCode") || undefined,
      state: searchParams.get("state") || undefined,
      sortBy: (searchParams.get("sortBy") as SearchFilters["sortBy"]) || "price",
      sortOrder: (searchParams.get("sortOrder") as SearchFilters["sortOrder"]) || "asc",
      page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
      limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 20,
    };

    // Parse price range
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      filters.priceRange = {
        min: minPrice ? Number(minPrice) : 0,
        max: maxPrice ? Number(maxPrice) : Number.MAX_SAFE_INTEGER,
      };
    }

    // Parse location
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radius = searchParams.get("radius");
    
    if (lat && lng) {
      filters.location = {
        lat: Number(lat),
        lng: Number(lng),
        radius: radius ? Number(radius) : 50,
      };
    }

    const result = await healthcareDataAggregator.fetchProcedurePrices(procedureCode, filters);

    const response: APIResponse<SearchResult<ProcedurePrice>> = {
      success: true,
      data: result,
      meta: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        cached: false,
        dataSources: [
          {
            name: "CMS Price Transparency",
            type: "government",
            lastFetched: new Date().toISOString(),
            confidenceLevel: "high",
            requiresAttribution: false,
          },
          {
            name: "FAIR Health",
            type: "commercial",
            lastFetched: new Date().toISOString(),
            confidenceLevel: "high",
            requiresAttribution: true,
          },
        ],
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("[v0] Error fetching prices:", error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: "PRICE_FETCH_ERROR",
        message: "Failed to fetch pricing data",
        details: error instanceof Error ? { message: error.message } : undefined,
      },
    } as APIResponse<null>, { status: 500 });
  }
}
