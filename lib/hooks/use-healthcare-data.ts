import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import type {
  Provider,
  ProcedurePrice,
  Drug,
  DrugPrice,
  TelemedicineProvider,
  EmergencyRoom,
  UrgentCare,
  ClinicalTrial,
  MedicalTourismDestination,
  SearchFilters,
  SearchResult,
  APIResponse,
  HealthMetrics,
  PriceRange,
} from "@/lib/types/healthcare";

// Generic fetcher
const fetcher = async (url: string): Promise<any> => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Failed to fetch data");
  }
  const data: APIResponse<any> = await res.json();
  if (!data.success) {
    throw new Error(data.error?.message || "API returned error");
  }
  return data.data;
};

// POST fetcher for mutations
const postFetcher = async (url: string, { arg }: { arg: Record<string, unknown> }): Promise<any> => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error?.message || "Failed to post data");
  }
  const data: APIResponse<any> = await res.json();
  if (!data.success) {
    throw new Error(data.error?.message || "API returned error");
  }
  return data.data;
};

// Build URL with query params
const buildUrl = (base: string, params: Record<string, string | number | boolean | undefined | null>): string => {
  const url = new URL(base, typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
};

// ==========================================
// Provider Hooks
// ==========================================

export function useProviders(filters: SearchFilters) {
  const url = buildUrl("/api/providers", {
    query: filters.query,
    procedureCode: filters.procedureCode,
    zipCode: filters.zipCode,
    state: filters.state,
    qualityRating: filters.qualityRating,
    sortBy: filters.sortBy,
    sortOrder: filters.sortOrder,
    page: filters.page,
    limit: filters.limit,
    lat: filters.location?.lat,
    lng: filters.location?.lng,
    radius: filters.location?.radius,
    providerTypes: filters.providerTypes?.join(","),
    insurance: filters.insuranceAccepted?.join(","),
    accreditations: filters.accreditations?.join(","),
  });

  return useSWR<SearchResult<Provider>>(
    filters.query || filters.zipCode || filters.location ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    }
  );
}

// ==========================================
// Pricing Hooks
// ==========================================

export function useProcedurePrices(procedureCode: string | undefined, filters: Partial<SearchFilters> = {}) {
  const url = buildUrl("/api/prices", {
    procedureCode,
    zipCode: filters.zipCode,
    state: filters.state,
    minPrice: filters.priceRange?.min,
    maxPrice: filters.priceRange?.max,
    sortBy: filters.sortBy || "price",
    sortOrder: filters.sortOrder || "asc",
    page: filters.page,
    limit: filters.limit,
    lat: filters.location?.lat,
    lng: filters.location?.lng,
    radius: filters.location?.radius,
  });

  return useSWR<SearchResult<ProcedurePrice>>(
    procedureCode ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );
}

// ==========================================
// Drug Pricing Hooks
// ==========================================

export function useDrugSearch(query: string | undefined) {
  const url = buildUrl("/api/drugs", { query });

  return useSWR<Drug[]>(
    query && query.length >= 2 ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
}

export function useDrugPrices(drugId: string | undefined, zipCode: string | undefined) {
  const url = buildUrl("/api/drugs", { drugId, zipCode });

  return useSWR<DrugPrice[]>(
    drugId && zipCode ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 3600000, // 1 hour
    }
  );
}

// ==========================================
// Telemedicine Hooks
// ==========================================

export function useTelemedicineProviders(specialty?: string, state?: string) {
  const url = buildUrl("/api/telemedicine", { specialty, state });

  return useSWR<TelemedicineProvider[]>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
    }
  );
}

// ==========================================
// Emergency Services Hooks
// ==========================================

export function useEmergencyServices(
  lat: number | undefined,
  lng: number | undefined,
  type: "er" | "urgent" | "all" = "all",
  radius: number = 25
) {
  const url = buildUrl("/api/emergency", { lat, lng, type, radius });

  return useSWR<{ emergencyRooms: EmergencyRoom[]; urgentCare: UrgentCare[] }>(
    lat !== undefined && lng !== undefined ? url : null,
    fetcher,
    {
      refreshInterval: 120000, // Refresh every 2 minutes for real-time data
      revalidateOnFocus: true,
    }
  );
}

// ==========================================
// Clinical Trials Hooks
// ==========================================

export function useClinicalTrials(
  condition: string | undefined,
  filters?: {
    status?: string[];
    phase?: string[];
    lat?: number;
    lng?: number;
    radius?: number;
  }
) {
  const url = buildUrl("/api/clinical-trials", {
    condition,
    status: filters?.status?.join(","),
    phase: filters?.phase?.join(","),
    lat: filters?.lat,
    lng: filters?.lng,
    radius: filters?.radius,
  });

  return useSWR<ClinicalTrial[]>(
    condition ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 86400000, // 24 hours
    }
  );
}

// ==========================================
// Medical Tourism Hooks
// ==========================================

export function useMedicalTourismDestinations(procedure?: string) {
  const url = buildUrl("/api/medical-tourism", { procedure });

  return useSWR<MedicalTourismDestination[]>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 86400000, // 24 hours
    }
  );
}

export function useTravelCostCalculation(
  destinationId: string | undefined,
  userLocation: string | undefined,
  stayDays: number | undefined
) {
  const url = buildUrl("/api/medical-tourism", {
    destinationId,
    calculateCosts: true,
    userLocation,
    stayDays,
  });

  return useSWR<{
    destination: MedicalTourismDestination;
    travelCosts: {
      flights: PriceRange;
      accommodation: number;
      meals: number;
      transport: number;
      total: PriceRange;
    };
  }>(
    destinationId && userLocation && stayDays ? url : null,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
}

// ==========================================
// Wearables Hooks
// ==========================================

export function useWearableDevices() {
  return useSWR<{ supportedDevices: Array<{
    id: string;
    name: string;
    platform: string;
    metrics: string[];
    authType: string;
  }> }>(
    "/api/wearables",
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 86400000, // 24 hours
    }
  );
}

export function useSyncWearableData() {
  return useSWRMutation<
    HealthMetrics[],
    Error,
    "/api/wearables",
    { userId: string; deviceType: string; accessToken: string }
  >(
    "/api/wearables",
    postFetcher
  );
}

// ==========================================
// Geolocation Hook
// ==========================================

export function useGeolocation() {
  return useSWR<{ lat: number; lng: number }>(
    "user-geolocation",
    async () => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation not supported"));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000, // 5 minutes
      errorRetryCount: 1,
    }
  );
}

// ==========================================
// Data Freshness Indicator
// ==========================================

export function useDataFreshness(lastUpdated: string | undefined) {
  if (!lastUpdated) {
    return { isStale: false, formattedTime: "Unknown" };
  }

  const updated = new Date(lastUpdated);
  const now = new Date();
  const diffMs = now.getTime() - updated.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  let formattedTime: string;
  let isStale: boolean;

  if (diffMinutes < 1) {
    formattedTime = "Just now";
    isStale = false;
  } else if (diffMinutes < 60) {
    formattedTime = `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    isStale = false;
  } else if (diffHours < 24) {
    formattedTime = `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    isStale = diffHours > 12;
  } else {
    formattedTime = `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    isStale = true;
  }

  return { isStale, formattedTime };
}
