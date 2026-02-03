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
  InsurancePlan,
  HealthMetrics,
  SearchFilters,
  SearchResult,
  DataSource,
  PriceRange,
} from "@/lib/types/healthcare";

// ==========================================
// Healthcare Data Aggregator Service
// ==========================================

class HealthcareDataAggregator {
  private baseUrl: string;
  private cache: Map<string, { data: unknown; timestamp: number }> = new Map();
  private cacheTTL = 5 * 60 * 1000; // 5 minutes default

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  }

  // ==========================================
  // Hospital & Provider Data
  // ==========================================

  async fetchProviders(filters: SearchFilters): Promise<SearchResult<Provider>> {
    const cacheKey = `providers:${JSON.stringify(filters)}`;
    const cached = this.getFromCache<SearchResult<Provider>>(cacheKey);
    if (cached) return cached;

    // Fetch from multiple sources in parallel
    const [npiData, googleData, qualityData] = await Promise.all([
      this.fetchNPIRegistry(filters),
      this.fetchGooglePlacesData(filters),
      this.fetchQualityRatings(filters),
    ]);

    // Merge and normalize data
    const mergedProviders = this.mergeProviderData(npiData, googleData, qualityData);

    // Apply filters and sort
    const filteredProviders = this.applyFilters(mergedProviders, filters);

    const result: SearchResult<Provider> = {
      data: filteredProviders,
      total: filteredProviders.length,
      page: filters.page || 1,
      limit: filters.limit || 20,
      hasMore: filteredProviders.length > (filters.limit || 20),
      filters,
      dataFreshness: {
        lastUpdated: new Date().toISOString(),
        updateFrequency: "daily",
        isStale: false,
      },
    };

    this.setCache(cacheKey, result);
    return result;
  }

  async fetchProviderById(npi: string): Promise<Provider | null> {
    const cacheKey = `provider:${npi}`;
    const cached = this.getFromCache<Provider>(cacheKey);
    if (cached) return cached;

    // Use NPI Registry as source of truth
    const npiData = await this.fetchNPIRegistry({ query: npi });
    if (!npiData.length) return null;

    const provider = npiData[0];

    // Enrich with additional data
    const [googleData, qualityData] = await Promise.all([
      this.fetchGooglePlacesForAddress(provider.address),
      this.fetchLeapfrogData(npi),
    ]);

    const enrichedProvider = {
      ...provider,
      qualityRatings: {
        ...provider.qualityRatings,
        ...qualityData,
      },
      operatingHours: googleData?.operatingHours || provider.operatingHours,
    };

    this.setCache(cacheKey, enrichedProvider);
    return enrichedProvider;
  }

  // ==========================================
  // Procedure Pricing Data
  // ==========================================

  async fetchProcedurePrices(
    procedureCode: string,
    filters: SearchFilters
  ): Promise<SearchResult<ProcedurePrice>> {
    const cacheKey = `prices:${procedureCode}:${JSON.stringify(filters)}`;
    const cached = this.getFromCache<SearchResult<ProcedurePrice>>(cacheKey);
    if (cached) return cached;

    // Fetch from multiple pricing sources
    const [cmsData, fairHealthData, userReportedData] = await Promise.all([
      this.fetchCMSTransparencyData(procedureCode, filters),
      this.fetchFairHealthAPI(procedureCode, filters),
      this.fetchUserReportedPrices(procedureCode, filters),
    ]);

    // Merge and normalize prices
    const mergedPrices = this.mergePriceData(cmsData, fairHealthData, userReportedData);

    // Calculate statistics
    const pricesWithStats = mergedPrices.map((price) => ({
      ...price,
      nationalAverage: this.calculateNationalAverage(mergedPrices),
      regionalAverage: this.calculateRegionalAverage(mergedPrices, filters.state),
      priceRange: this.calculatePriceRange(mergedPrices),
    }));

    const result: SearchResult<ProcedurePrice> = {
      data: pricesWithStats,
      total: pricesWithStats.length,
      page: filters.page || 1,
      limit: filters.limit || 20,
      hasMore: pricesWithStats.length > (filters.limit || 20),
      filters,
      dataFreshness: {
        lastUpdated: new Date().toISOString(),
        updateFrequency: "weekly",
        isStale: false,
      },
    };

    this.setCache(cacheKey, result);
    return result;
  }

  // ==========================================
  // Prescription Drug Pricing
  // ==========================================

  async fetchDrugPrices(drugId: string, zipCode: string): Promise<DrugPrice[]> {
    const cacheKey = `drug:${drugId}:${zipCode}`;
    const cached = this.getFromCache<DrugPrice[]>(cacheKey);
    if (cached) return cached;

    // Fetch from multiple pharmacy pricing sources
    const [goodRxData, rxSaverData, blinkData] = await Promise.all([
      this.fetchGoodRxPrices(drugId, zipCode),
      this.fetchRxSaverPrices(drugId, zipCode),
      this.fetchBlinkHealthPrices(drugId, zipCode),
    ]);

    // Merge and sort by price
    const allPrices = [...goodRxData, ...rxSaverData, ...blinkData].sort(
      (a, b) => (a.priceWithCoupon || a.price) - (b.priceWithCoupon || b.price)
    );

    this.setCache(cacheKey, allPrices, 60 * 60 * 1000); // 1 hour cache for drug prices
    return allPrices;
  }

  async searchDrugs(query: string): Promise<Drug[]> {
    const cacheKey = `drugs:search:${query}`;
    const cached = this.getFromCache<Drug[]>(cacheKey);
    if (cached) return cached;

    // Search FDA NDC database
    const drugs = await this.fetchFDADrugDatabase(query);
    this.setCache(cacheKey, drugs);
    return drugs;
  }

  // ==========================================
  // Telemedicine Providers
  // ==========================================

  async fetchTelemedicineProviders(
    specialty?: string,
    state?: string
  ): Promise<TelemedicineProvider[]> {
    const cacheKey = `telemedicine:${specialty || "all"}:${state || "all"}`;
    const cached = this.getFromCache<TelemedicineProvider[]>(cacheKey);
    if (cached) return cached;

    // Fetch telemedicine provider data
    const providers = await this.fetchTelemedicineData(specialty, state);
    this.setCache(cacheKey, providers);
    return providers;
  }

  // ==========================================
  // Emergency Services
  // ==========================================

  async fetchERWaitTimes(
    lat: number,
    lng: number,
    radiusMiles: number = 25
  ): Promise<EmergencyRoom[]> {
    // Real-time data - shorter cache
    const cacheKey = `er:${lat}:${lng}:${radiusMiles}`;
    const cached = this.getFromCache<EmergencyRoom[]>(cacheKey);
    if (cached) return cached;

    const erRooms = await this.fetchRealTimeERData(lat, lng, radiusMiles);
    this.setCache(cacheKey, erRooms, 2 * 60 * 1000); // 2 minute cache
    return erRooms;
  }

  async fetchUrgentCareFacilities(
    lat: number,
    lng: number,
    radiusMiles: number = 15
  ): Promise<UrgentCare[]> {
    const cacheKey = `urgentcare:${lat}:${lng}:${radiusMiles}`;
    const cached = this.getFromCache<UrgentCare[]>(cacheKey);
    if (cached) return cached;

    const facilities = await this.fetchUrgentCareData(lat, lng, radiusMiles);
    this.setCache(cacheKey, facilities);
    return facilities;
  }

  // ==========================================
  // Clinical Trials
  // ==========================================

  async fetchClinicalTrials(
    condition: string,
    filters?: {
      status?: string[];
      phase?: string[];
      location?: { lat: number; lng: number; radius: number };
    }
  ): Promise<ClinicalTrial[]> {
    const cacheKey = `trials:${condition}:${JSON.stringify(filters)}`;
    const cached = this.getFromCache<ClinicalTrial[]>(cacheKey);
    if (cached) return cached;

    // Fetch from ClinicalTrials.gov API
    const trials = await this.fetchClinicalTrialsGov(condition, filters);
    this.setCache(cacheKey, trials, 24 * 60 * 60 * 1000); // 24 hour cache
    return trials;
  }

  // ==========================================
  // Medical Tourism
  // ==========================================

  async fetchMedicalTourismDestinations(
    procedureName?: string
  ): Promise<MedicalTourismDestination[]> {
    const cacheKey = `tourism:${procedureName || "all"}`;
    const cached = this.getFromCache<MedicalTourismDestination[]>(cacheKey);
    if (cached) return cached;

    // Fetch destination data
    const destinations = await this.fetchTourismData(procedureName);

    // Enrich with travel costs
    const enrichedDestinations = await Promise.all(
      destinations.map(async (dest) => ({
        ...dest,
        travelInfo: await this.fetchTravelCosts("US", dest.country, dest.city),
        costOfLiving: await this.fetchCostOfLiving(dest.city, dest.country),
      }))
    );

    this.setCache(cacheKey, enrichedDestinations);
    return enrichedDestinations;
  }

  async calculateTotalTravelCost(
    userLocation: string,
    destination: MedicalTourismDestination,
    stayDays: number
  ): Promise<{
    flights: PriceRange;
    accommodation: number;
    meals: number;
    transport: number;
    total: PriceRange;
  }> {
    const [flightData, hotelData] = await Promise.all([
      this.fetchFlightPrices(userLocation, destination.city),
      this.fetchAccommodationPrices(destination.city, stayDays),
    ]);

    const mealsCost = destination.costOfLiving.mealCostAverage * 3 * stayDays;
    const transportCost = destination.travelInfo.localTransportDaily * stayDays;

    return {
      flights: flightData,
      accommodation: hotelData,
      meals: mealsCost,
      transport: transportCost,
      total: {
        min: flightData.min + hotelData + mealsCost + transportCost,
        max: flightData.max + hotelData + mealsCost + transportCost,
        median: flightData.median + hotelData + mealsCost + transportCost,
        percentile25: flightData.percentile25 + hotelData + mealsCost + transportCost,
        percentile75: flightData.percentile75 + hotelData + mealsCost + transportCost,
      },
    };
  }

  // ==========================================
  // Insurance & Financial
  // ==========================================

  async fetchInsurancePlans(
    state: string,
    filters?: {
      planType?: string[];
      metalLevel?: string[];
      maxPremium?: number;
    }
  ): Promise<InsurancePlan[]> {
    const cacheKey = `insurance:${state}:${JSON.stringify(filters)}`;
    const cached = this.getFromCache<InsurancePlan[]>(cacheKey);
    if (cached) return cached;

    const plans = await this.fetchHealthcareGovPlans(state, filters);
    this.setCache(cacheKey, plans, 24 * 60 * 60 * 1000); // 24 hour cache
    return plans;
  }

  // ==========================================
  // Wearable Data Integration
  // ==========================================

  async syncWearableData(
    userId: string,
    deviceType: string,
    accessToken: string
  ): Promise<HealthMetrics[]> {
    switch (deviceType) {
      case "apple_health":
        return this.fetchAppleHealthData(userId, accessToken);
      case "fitbit":
        return this.fetchFitbitData(userId, accessToken);
      case "garmin":
        return this.fetchGarminData(userId, accessToken);
      case "google_fit":
        return this.fetchGoogleFitData(userId, accessToken);
      default:
        throw new Error(`Unsupported device type: ${deviceType}`);
    }
  }

  // ==========================================
  // Private Data Source Methods
  // ==========================================

  private async fetchNPIRegistry(filters: SearchFilters): Promise<Provider[]> {
    // In production, this would call the NPPES NPI Registry API
    // https://npiregistry.cms.hhs.gov/api/
    console.log("[v0] Fetching from NPI Registry with filters:", filters);
    return this.getMockProviders(filters);
  }

  private async fetchGooglePlacesData(filters: SearchFilters): Promise<Partial<Provider>[]> {
    // In production, this would call Google Places API
    console.log("[v0] Fetching from Google Places with filters:", filters);
    return [];
  }

  private async fetchGooglePlacesForAddress(address: Provider["address"]): Promise<{
    operatingHours?: Provider["operatingHours"];
  } | null> {
    console.log("[v0] Fetching Google Places for address:", address);
    return null;
  }

  private async fetchQualityRatings(filters: SearchFilters): Promise<Map<string, Provider["qualityRatings"]>> {
    // Fetch from Leapfrog, CMS Hospital Compare, etc.
    console.log("[v0] Fetching quality ratings");
    return new Map();
  }

  private async fetchLeapfrogData(npi: string): Promise<Partial<Provider["qualityRatings"]>> {
    console.log("[v0] Fetching Leapfrog data for NPI:", npi);
    return {};
  }

  private async fetchCMSTransparencyData(
    procedureCode: string,
    filters: SearchFilters
  ): Promise<ProcedurePrice[]> {
    // Fetch from CMS Hospital Price Transparency files
    console.log("[v0] Fetching CMS transparency data for:", procedureCode);
    return this.getMockPrices(procedureCode, filters);
  }

  private async fetchFairHealthAPI(
    procedureCode: string,
    filters: SearchFilters
  ): Promise<ProcedurePrice[]> {
    // In production, call FAIR Health API
    console.log("[v0] Fetching FAIR Health data for:", procedureCode);
    return [];
  }

  private async fetchUserReportedPrices(
    procedureCode: string,
    filters: SearchFilters
  ): Promise<ProcedurePrice[]> {
    console.log("[v0] Fetching user-reported prices for:", procedureCode);
    return [];
  }

  private async fetchGoodRxPrices(drugId: string, zipCode: string): Promise<DrugPrice[]> {
    console.log("[v0] Fetching GoodRx prices for:", drugId, zipCode);
    return this.getMockDrugPrices(drugId, "GoodRx");
  }

  private async fetchRxSaverPrices(drugId: string, zipCode: string): Promise<DrugPrice[]> {
    console.log("[v0] Fetching RxSaver prices for:", drugId, zipCode);
    return this.getMockDrugPrices(drugId, "RxSaver");
  }

  private async fetchBlinkHealthPrices(drugId: string, zipCode: string): Promise<DrugPrice[]> {
    console.log("[v0] Fetching Blink Health prices for:", drugId, zipCode);
    return this.getMockDrugPrices(drugId, "Blink Health");
  }

  private async fetchFDADrugDatabase(query: string): Promise<Drug[]> {
    console.log("[v0] Searching FDA drug database for:", query);
    return this.getMockDrugs(query);
  }

  private async fetchTelemedicineData(
    specialty?: string,
    state?: string
  ): Promise<TelemedicineProvider[]> {
    console.log("[v0] Fetching telemedicine providers:", specialty, state);
    return this.getMockTelemedicineProviders();
  }

  private async fetchRealTimeERData(
    lat: number,
    lng: number,
    radius: number
  ): Promise<EmergencyRoom[]> {
    console.log("[v0] Fetching ER wait times near:", lat, lng);
    return this.getMockERData(lat, lng);
  }

  private async fetchUrgentCareData(
    lat: number,
    lng: number,
    radius: number
  ): Promise<UrgentCare[]> {
    console.log("[v0] Fetching urgent care facilities near:", lat, lng);
    return [];
  }

  private async fetchClinicalTrialsGov(
    condition: string,
    filters?: object
  ): Promise<ClinicalTrial[]> {
    // In production, call ClinicalTrials.gov API
    console.log("[v0] Fetching clinical trials for:", condition);
    return this.getMockClinicalTrials(condition);
  }

  private async fetchTourismData(procedureName?: string): Promise<MedicalTourismDestination[]> {
    console.log("[v0] Fetching medical tourism data for:", procedureName);
    return this.getMockTourismDestinations();
  }

  private async fetchTravelCosts(
    origin: string,
    destCountry: string,
    destCity: string
  ): Promise<MedicalTourismDestination["travelInfo"]> {
    console.log("[v0] Fetching travel costs from", origin, "to", destCity);
    return {
      flightEstimate: { min: 400, max: 1200, median: 700, percentile25: 500, percentile75: 900 },
      flightDurationHours: 5,
      accommodationPerNight: { min: 50, max: 200, median: 100, percentile25: 70, percentile75: 150 },
      localTransportDaily: 20,
      mealCostDaily: 30,
      recommendedStayDays: 14,
    };
  }

  private async fetchCostOfLiving(
    city: string,
    country: string
  ): Promise<MedicalTourismDestination["costOfLiving"]> {
    console.log("[v0] Fetching cost of living for:", city, country);
    return {
      index: 45,
      mealCostAverage: 8,
      publicTransport: 1,
      taxi: 5,
      currency: "MXN",
      exchangeRate: 17.5,
    };
  }

  private async fetchFlightPrices(origin: string, destination: string): Promise<PriceRange> {
    console.log("[v0] Fetching flight prices from", origin, "to", destination);
    return { min: 300, max: 1000, median: 550, percentile25: 400, percentile75: 750 };
  }

  private async fetchAccommodationPrices(city: string, nights: number): Promise<number> {
    console.log("[v0] Fetching accommodation prices in", city, "for", nights, "nights");
    return 100 * nights;
  }

  private async fetchHealthcareGovPlans(
    state: string,
    filters?: object
  ): Promise<InsurancePlan[]> {
    console.log("[v0] Fetching Healthcare.gov plans for:", state);
    return [];
  }

  private async fetchAppleHealthData(userId: string, token: string): Promise<HealthMetrics[]> {
    console.log("[v0] Fetching Apple Health data for user:", userId);
    return [];
  }

  private async fetchFitbitData(userId: string, token: string): Promise<HealthMetrics[]> {
    console.log("[v0] Fetching Fitbit data for user:", userId);
    return [];
  }

  private async fetchGarminData(userId: string, token: string): Promise<HealthMetrics[]> {
    console.log("[v0] Fetching Garmin data for user:", userId);
    return [];
  }

  private async fetchGoogleFitData(userId: string, token: string): Promise<HealthMetrics[]> {
    console.log("[v0] Fetching Google Fit data for user:", userId);
    return [];
  }

  // ==========================================
  // Data Merging & Processing Utilities
  // ==========================================

  private mergeProviderData(
    npiData: Provider[],
    googleData: Partial<Provider>[],
    qualityData: Map<string, Provider["qualityRatings"]>
  ): Provider[] {
    return npiData.map((provider) => ({
      ...provider,
      qualityRatings: qualityData.get(provider.npi) || provider.qualityRatings,
    }));
  }

  private mergePriceData(...sources: ProcedurePrice[][]): ProcedurePrice[] {
    const priceMap = new Map<string, ProcedurePrice>();

    for (const source of sources) {
      for (const price of source) {
        const key = `${price.providerId}:${price.procedureCode}`;
        const existing = priceMap.get(key);

        if (!existing || price.confidenceScore > existing.confidenceScore) {
          priceMap.set(key, price);
        }
      }
    }

    return Array.from(priceMap.values());
  }

  private applyFilters<T extends Provider>(items: T[], filters: SearchFilters): T[] {
    let result = [...items];

    if (filters.priceRange) {
      // Filter by price would be applied here
    }

    if (filters.qualityRating) {
      result = result.filter((item) => item.qualityRatings.overall >= filters.qualityRating!);
    }

    if (filters.accreditations?.length) {
      result = result.filter((item) =>
        item.accreditations.some((acc) => filters.accreditations!.includes(acc.organization))
      );
    }

    // Sort
    if (filters.sortBy === "rating") {
      result.sort((a, b) =>
        filters.sortOrder === "asc"
          ? a.qualityRatings.overall - b.qualityRatings.overall
          : b.qualityRatings.overall - a.qualityRatings.overall
      );
    }

    // Paginate
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const start = (page - 1) * limit;
    return result.slice(start, start + limit);
  }

  private calculateNationalAverage(prices: ProcedurePrice[]): number {
    if (!prices.length) return 0;
    const sum = prices.reduce((acc, p) => acc + p.pricing.cashPrice, 0);
    return Math.round(sum / prices.length);
  }

  private calculateRegionalAverage(prices: ProcedurePrice[], state?: string): number {
    if (!state || !prices.length) return this.calculateNationalAverage(prices);
    // In production, filter by state and calculate
    return this.calculateNationalAverage(prices);
  }

  private calculatePriceRange(prices: ProcedurePrice[]): PriceRange {
    if (!prices.length) {
      return { min: 0, max: 0, median: 0, percentile25: 0, percentile75: 0 };
    }

    const sorted = prices.map((p) => p.pricing.cashPrice).sort((a, b) => a - b);
    const len = sorted.length;

    return {
      min: sorted[0],
      max: sorted[len - 1],
      median: sorted[Math.floor(len / 2)],
      percentile25: sorted[Math.floor(len * 0.25)],
      percentile75: sorted[Math.floor(len * 0.75)],
    };
  }

  // ==========================================
  // Cache Management
  // ==========================================

  private getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.cacheTTL) {
      this.cache.delete(key);
      return null;
    }

    return cached.data as T;
  }

  private setCache(key: string, data: unknown, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });

    if (ttl) {
      setTimeout(() => this.cache.delete(key), ttl);
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  // ==========================================
  // Mock Data Generators (Replace with real API calls)
  // ==========================================

  private getMockProviders(filters: SearchFilters): Provider[] {
    const baseProvider: Provider = {
      id: "",
      npi: "",
      name: "",
      type: "hospital",
      address: {
        street: "",
        city: filters.zipCode?.slice(0, 3) === "900" ? "Los Angeles" : "New York",
        state: filters.state || "CA",
        zipCode: filters.zipCode || "90001",
        country: "US",
      },
      contact: { phone: "(555) 123-4567" },
      coordinates: { lat: 34.0522, lng: -118.2437 },
      accreditations: [
        { name: "Joint Commission", organization: "Joint Commission", status: "accredited" },
      ],
      qualityRatings: {
        overall: 4.2,
        patientSatisfaction: 4.0,
        safetyScore: 4.5,
        reviewCount: 234,
        leapfrogGrade: "A",
        sources: [{ name: "CMS", type: "government", lastFetched: new Date().toISOString(), confidenceLevel: "high", requiresAttribution: false }],
      },
      services: [],
      acceptedInsurance: ["Aetna", "Blue Cross", "Cigna", "United Healthcare"],
      operatingHours: { monday: { open: "00:00", close: "23:59" }, is24Hours: true },
      isVerified: true,
      lastUpdated: new Date().toISOString(),
      dataSource: { name: "NPI Registry", type: "government", lastFetched: new Date().toISOString(), confidenceLevel: "high", requiresAttribution: false },
    };

    const providers: Provider[] = [
      { ...baseProvider, id: "1", npi: "1234567890", name: "Cedars-Sinai Medical Center", qualityRatings: { ...baseProvider.qualityRatings, overall: 4.8, leapfrogGrade: "A" } },
      { ...baseProvider, id: "2", npi: "2345678901", name: "UCLA Medical Center", qualityRatings: { ...baseProvider.qualityRatings, overall: 4.7, leapfrogGrade: "A" } },
      { ...baseProvider, id: "3", npi: "3456789012", name: "Providence Saint John's", qualityRatings: { ...baseProvider.qualityRatings, overall: 4.5, leapfrogGrade: "B" } },
      { ...baseProvider, id: "4", npi: "4567890123", name: "Torrance Memorial", qualityRatings: { ...baseProvider.qualityRatings, overall: 4.3, leapfrogGrade: "A" } },
      { ...baseProvider, id: "5", npi: "5678901234", name: "Kaiser Permanente", qualityRatings: { ...baseProvider.qualityRatings, overall: 4.1, leapfrogGrade: "B" } },
    ];

    return providers;
  }

  private getMockPrices(procedureCode: string, filters: SearchFilters): ProcedurePrice[] {
    const providers = this.getMockProviders(filters);
    const basePrice = procedureCode === "27447" ? 35000 : 5000; // Knee replacement vs generic

    return providers.map((provider, index) => ({
      id: `price-${index}`,
      procedureCode,
      procedureName: procedureCode === "27447" ? "Total Knee Replacement" : "Medical Procedure",
      description: "Complete procedure including facility fees",
      category: "Orthopedic",
      providerId: provider.id,
      providerName: provider.name,
      pricing: {
        cashPrice: basePrice + Math.floor(Math.random() * 10000) - 5000,
        chargemasterPrice: basePrice * 2.5,
        medicareRate: basePrice * 0.6,
        selfPayDiscount: 20,
        financingAvailable: true,
      },
      negotiatedRates: [
        { insurerId: "1", insurerName: "Blue Cross", planType: "PPO", negotiatedPrice: basePrice * 0.8, inNetwork: true },
        { insurerId: "2", insurerName: "Aetna", planType: "HMO", negotiatedPrice: basePrice * 0.75, inNetwork: true },
      ],
      nationalAverage: basePrice,
      regionalAverage: basePrice * 1.1,
      priceRange: { min: basePrice * 0.7, max: basePrice * 1.5, median: basePrice, percentile25: basePrice * 0.85, percentile75: basePrice * 1.2 },
      confidenceScore: 85 + Math.floor(Math.random() * 15),
      lastUpdated: new Date().toISOString(),
      dataSources: [{ name: "CMS Transparency", type: "government", lastFetched: new Date().toISOString(), confidenceLevel: "high", requiresAttribution: false }],
    }));
  }

  private getMockDrugPrices(drugId: string, source: string): DrugPrice[] {
    const basePrice = 150;
    const pharmacies = ["CVS", "Walgreens", "Rite Aid", "Costco", "Walmart"];

    return pharmacies.map((pharmacy, index) => ({
      drugId,
      pharmacyId: `pharm-${index}`,
      pharmacyName: pharmacy,
      pharmacyType: pharmacy === "Costco" ? "retail" : "retail",
      price: basePrice + Math.floor(Math.random() * 50),
      priceWithCoupon: basePrice - 20 + Math.floor(Math.random() * 30),
      couponCode: `${source.toUpperCase().replace(" ", "")}${Math.floor(Math.random() * 1000)}`,
      couponProvider: source as DrugPrice["couponProvider"],
      quantity: 30,
      daysSupply: 30,
      lastUpdated: new Date().toISOString(),
      dataSource: { name: source, type: "commercial", lastFetched: new Date().toISOString(), confidenceLevel: "high", requiresAttribution: true },
    }));
  }

  private getMockDrugs(query: string): Drug[] {
    return [
      {
        id: "drug-1",
        ndc: "00069-0150-30",
        name: "Lipitor",
        genericName: "Atorvastatin",
        brandNames: ["Lipitor"],
        manufacturer: "Pfizer",
        dosageForm: "Tablet",
        strength: "20mg",
        quantity: 30,
        isGeneric: false,
        requiresPrescription: true,
        therapeuticClass: "Statins",
        interactions: [],
      },
      {
        id: "drug-2",
        ndc: "00093-7180-01",
        name: "Atorvastatin",
        genericName: "Atorvastatin",
        brandNames: ["Lipitor"],
        manufacturer: "Teva",
        dosageForm: "Tablet",
        strength: "20mg",
        quantity: 30,
        isGeneric: true,
        requiresPrescription: true,
        therapeuticClass: "Statins",
        interactions: [],
      },
    ];
  }

  private getMockTelemedicineProviders(): TelemedicineProvider[] {
    return [
      {
        id: "tele-1",
        name: "Teladoc",
        description: "24/7 access to doctors via phone or video",
        services: [
          { name: "General Medical", description: "Primary care consultations", price: 75, duration: 15, category: "primary_care" },
          { name: "Mental Health", description: "Therapy and psychiatry", price: 99, duration: 45, category: "mental_health" },
        ],
        pricing: { consultationFee: 75, subscriptionMonthly: 15 },
        availability: { is24_7: true, averageWaitTime: 10, scheduleInAdvance: true, sameDayAvailable: true },
        ratings: { overall: 4.5, reviewCount: 12500, responseTime: 8 },
        acceptedInsurance: ["Aetna", "Blue Cross", "Cigna"],
        languages: ["English", "Spanish"],
        specialties: ["Primary Care", "Dermatology", "Mental Health"],
        statesAvailable: ["CA", "NY", "TX", "FL"],
        website: "https://teladoc.com",
      },
    ];
  }

  private getMockERData(lat: number, lng: number): EmergencyRoom[] {
    return [
      {
        id: "er-1",
        providerId: "1",
        hospitalName: "Cedars-Sinai Emergency",
        address: { street: "8700 Beverly Blvd", city: "Los Angeles", state: "CA", zipCode: "90048", country: "US" },
        coordinates: { lat: 34.0762, lng: -118.3785 },
        contact: { phone: "(310) 423-3277" },
        currentWaitTime: 45,
        waitTimeTrend: "decreasing",
        capacityStatus: "moderate",
        traumaLevel: 1,
        pediatricER: true,
        strokeCenter: true,
        cardiacCenter: true,
        burnCenter: false,
        lastUpdated: new Date().toISOString(),
        estimatedCosts: {
          lowAcuity: { min: 500, max: 1500, median: 900, percentile25: 650, percentile75: 1200 },
          moderateAcuity: { min: 1500, max: 5000, median: 2800, percentile25: 2000, percentile75: 4000 },
          highAcuity: { min: 5000, max: 15000, median: 8500, percentile25: 6500, percentile75: 12000 },
          critical: { min: 15000, max: 50000, median: 28000, percentile25: 20000, percentile75: 40000 },
        },
      },
    ];
  }

  private getMockClinicalTrials(condition: string): ClinicalTrial[] {
    return [
      {
        id: "trial-1",
        nctId: "NCT04567890",
        title: `Phase 3 Study of Novel Treatment for ${condition}`,
        briefSummary: "A randomized, double-blind study evaluating the efficacy and safety of a new treatment approach.",
        status: "recruiting",
        phase: "Phase 3",
        studyType: "interventional",
        conditions: [condition],
        interventions: [{ type: "drug", name: "Study Drug XYZ", description: "Novel therapeutic agent" }],
        eligibility: {
          gender: "all",
          minAge: 18,
          maxAge: 75,
          healthyVolunteers: false,
          criteria: ["Diagnosed with condition", "No prior treatment with similar drugs"],
        },
        locations: [
          { facility: "UCLA Medical Center", city: "Los Angeles", state: "CA", country: "US", status: "recruiting" },
        ],
        sponsor: "Pharmaceutical Research Corp",
        compensation: { amount: 500, frequency: "per visit", description: "Compensation for time and travel", travelReimbursement: true },
        startDate: "2024-01-15",
        estimatedCompletionDate: "2026-06-30",
        enrollment: { current: 156, target: 300 },
        contactInfo: { phone: "(310) 555-0123", email: "trials@example.com" },
        lastUpdated: new Date().toISOString(),
      },
    ];
  }

  private getMockTourismDestinations(): MedicalTourismDestination[] {
    return [
      {
        id: "dest-1",
        country: "Mexico",
        city: "Tijuana",
        hospitals: [
          {
            id: "hosp-1",
            name: "Hospital Angeles Tijuana",
            address: { street: "Av Paseo de los Heroes", city: "Tijuana", state: "BC", zipCode: "22010", country: "Mexico" },
            accreditations: [{ name: "JCI", organization: "JCI", status: "accredited" }],
            specialties: ["Orthopedics", "Cardiology", "Bariatric Surgery"],
            internationalPatientServices: true,
            interpreterServices: ["English", "Spanish"],
            website: "https://hospitalangelestijuana.com",
            ratings: { overall: 4.6, reviewCount: 890, sources: [] },
          },
        ],
        popularProcedures: [
          { procedureName: "Knee Replacement", averageCostLocal: 12000, averageCostUS: 45000, savingsPercentage: 73, recoveryTimeWeeks: 6, hospitalStayDays: 3 },
          { procedureName: "Dental Implants", averageCostLocal: 1500, averageCostUS: 5000, savingsPercentage: 70, recoveryTimeWeeks: 2, hospitalStayDays: 0 },
        ],
        averageSavings: 65,
        travelInfo: {
          flightEstimate: { min: 150, max: 400, median: 250, percentile25: 180, percentile75: 320 },
          flightDurationHours: 2.5,
          accommodationPerNight: { min: 40, max: 150, median: 80, percentile25: 55, percentile75: 110 },
          localTransportDaily: 15,
          mealCostDaily: 25,
          recommendedStayDays: 10,
        },
        costOfLiving: { index: 45, mealCostAverage: 8, publicTransport: 1, taxi: 5, currency: "MXN", exchangeRate: 17.5 },
        visaRequirements: { required: false, medicalVisaAvailable: false },
        languagesSpoken: ["Spanish", "English"],
        qualityIndicators: { jciAccreditedHospitals: 8 },
      },
    ];
  }
}

// Export singleton instance
export const healthcareDataAggregator = new HealthcareDataAggregator();
