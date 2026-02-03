import { NextRequest, NextResponse } from "next/server";
import { healthcareDataAggregator } from "@/lib/services/healthcare-data-aggregator";
import type { APIResponse, Drug, DrugPrice } from "@/lib/types/healthcare";

// Search drugs
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const drugId = searchParams.get("drugId");
    const zipCode = searchParams.get("zipCode");

    // If drugId and zipCode provided, fetch prices
    if (drugId && zipCode) {
      const prices = await healthcareDataAggregator.fetchDrugPrices(drugId, zipCode);

      const response: APIResponse<DrugPrice[]> = {
        success: true,
        data: prices,
        meta: {
          requestId: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          cached: false,
          dataSources: [
            {
              name: "GoodRx",
              type: "commercial",
              lastFetched: new Date().toISOString(),
              confidenceLevel: "high",
              requiresAttribution: true,
            },
            {
              name: "RxSaver",
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

    // Otherwise, search for drugs
    if (!query) {
      return NextResponse.json({
        success: false,
        error: {
          code: "MISSING_QUERY",
          message: "Either 'query' parameter for search or 'drugId' and 'zipCode' for prices is required",
        },
      } as APIResponse<null>, { status: 400 });
    }

    const drugs = await healthcareDataAggregator.searchDrugs(query);

    const response: APIResponse<Drug[]> = {
      success: true,
      data: drugs,
      meta: {
        requestId: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        cached: false,
        dataSources: [
          {
            name: "FDA NDC Directory",
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
    console.error("[v0] Error in drugs API:", error);
    
    return NextResponse.json({
      success: false,
      error: {
        code: "DRUG_API_ERROR",
        message: "Failed to fetch drug data",
        details: error instanceof Error ? { message: error.message } : undefined,
      },
    } as APIResponse<null>, { status: 500 });
  }
}
