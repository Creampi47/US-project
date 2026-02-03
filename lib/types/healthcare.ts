// Healthcare Data Types

// ==========================================
// Provider & Hospital Types
// ==========================================

export interface Provider {
  id: string;
  npi: string;
  name: string;
  type: "hospital" | "clinic" | "urgent_care" | "imaging_center" | "surgery_center" | "physician";
  specialty?: string;
  address: Address;
  contact: ContactInfo;
  coordinates: Coordinates;
  accreditations: Accreditation[];
  qualityRatings: QualityRatings;
  services: string[];
  acceptedInsurance: string[];
  operatingHours: OperatingHours;
  imageUrl?: string;
  website?: string;
  isVerified: boolean;
  lastUpdated: string;
  dataSource: DataSource;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ContactInfo {
  phone: string;
  fax?: string;
  email?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Accreditation {
  name: string;
  organization: "JCI" | "NCQA" | "Joint Commission" | "AAAHC" | "DNV" | "Other";
  status: "accredited" | "pending" | "expired";
  expirationDate?: string;
}

export interface QualityRatings {
  overall: number; // 1-5
  patientSatisfaction?: number;
  safetyScore?: number;
  readmissionRate?: number;
  mortalityRate?: number;
  infectionRate?: number;
  leapfrogGrade?: "A" | "B" | "C" | "D" | "F";
  cmsStarRating?: number;
  reviewCount: number;
  sources: DataSource[];
}

export interface OperatingHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
  is24Hours?: boolean;
  holidayHours?: string;
}

export interface DayHours {
  open: string;
  close: string;
  isClosed?: boolean;
}

// ==========================================
// Pricing Types
// ==========================================

export interface ProcedurePrice {
  id: string;
  procedureCode: string; // CPT/HCPCS code
  procedureName: string;
  description: string;
  category: string;
  providerId: string;
  providerName: string;
  pricing: PricingDetails;
  negotiatedRates: NegotiatedRate[];
  nationalAverage: number;
  regionalAverage: number;
  priceRange: PriceRange;
  confidenceScore: number; // 0-100
  lastUpdated: string;
  dataSources: DataSource[];
}

export interface PricingDetails {
  cashPrice: number;
  chargemasterPrice?: number;
  medicareRate?: number;
  medicaidRate?: number;
  selfPayDiscount?: number;
  financingAvailable?: boolean;
}

export interface NegotiatedRate {
  insurerId: string;
  insurerName: string;
  planType: string;
  negotiatedPrice: number;
  inNetwork: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
  median: number;
  percentile25: number;
  percentile75: number;
}

// ==========================================
// Prescription Drug Types
// ==========================================

export interface Drug {
  id: string;
  ndc: string; // National Drug Code
  name: string;
  genericName: string;
  brandNames: string[];
  manufacturer: string;
  dosageForm: string;
  strength: string;
  quantity: number;
  isGeneric: boolean;
  requiresPrescription: boolean;
  controlledSubstance?: boolean;
  therapeuticClass: string;
  interactions: DrugInteraction[];
}

export interface DrugPrice {
  drugId: string;
  pharmacyId: string;
  pharmacyName: string;
  pharmacyType: "retail" | "mail_order" | "online";
  pharmacyAddress?: Address;
  price: number;
  priceWithCoupon?: number;
  couponCode?: string;
  couponProvider?: "GoodRx" | "RxSaver" | "SingleCare" | "Blink Health" | "Other";
  quantity: number;
  daysSupply: number;
  lastUpdated: string;
  dataSource: DataSource;
}

export interface DrugInteraction {
  interactingDrug: string;
  severity: "major" | "moderate" | "minor";
  description: string;
}

// ==========================================
// Telemedicine Types
// ==========================================

export interface TelemedicineProvider {
  id: string;
  name: string;
  logo?: string;
  description: string;
  services: TelemedicineService[];
  pricing: TelemedicinePricing;
  availability: TelemedicineAvailability;
  ratings: {
    overall: number;
    reviewCount: number;
    responseTime: number; // average minutes
  };
  acceptedInsurance: string[];
  languages: string[];
  specialties: string[];
  statesAvailable: string[];
  website: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
}

export interface TelemedicineService {
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: "primary_care" | "mental_health" | "dermatology" | "urgent_care" | "specialist" | "other";
}

export interface TelemedicinePricing {
  consultationFee: number;
  subscriptionMonthly?: number;
  subscriptionAnnual?: number;
  insuranceCopay?: number;
}

export interface TelemedicineAvailability {
  is24_7: boolean;
  averageWaitTime: number; // minutes
  scheduleInAdvance: boolean;
  sameDayAvailable: boolean;
}

// ==========================================
// Emergency Services Types
// ==========================================

export interface EmergencyRoom {
  id: string;
  providerId: string;
  hospitalName: string;
  address: Address;
  coordinates: Coordinates;
  contact: ContactInfo;
  currentWaitTime: number; // minutes
  waitTimeTrend: "increasing" | "decreasing" | "stable";
  capacityStatus: "low" | "moderate" | "high" | "critical";
  traumaLevel?: 1 | 2 | 3 | 4 | 5;
  pediatricER: boolean;
  strokeCenter: boolean;
  cardiacCenter: boolean;
  burnCenter: boolean;
  lastUpdated: string;
  estimatedCosts: ERCostEstimate;
}

export interface ERCostEstimate {
  lowAcuity: PriceRange;
  moderateAcuity: PriceRange;
  highAcuity: PriceRange;
  critical: PriceRange;
}

export interface UrgentCare {
  id: string;
  name: string;
  address: Address;
  coordinates: Coordinates;
  contact: ContactInfo;
  operatingHours: OperatingHours;
  currentWaitTime?: number;
  walkInAccepted: boolean;
  servicesOffered: string[];
  pricing: {
    visitFee: number;
    xrayFee?: number;
    labFee?: number;
  };
  acceptedInsurance: string[];
  ratings: QualityRatings;
}

// ==========================================
// Clinical Trials Types
// ==========================================

export interface ClinicalTrial {
  id: string;
  nctId: string; // ClinicalTrials.gov identifier
  title: string;
  briefSummary: string;
  detailedDescription?: string;
  status: "recruiting" | "not_yet_recruiting" | "active_not_recruiting" | "completed" | "suspended" | "terminated" | "withdrawn";
  phase: "Phase 1" | "Phase 2" | "Phase 3" | "Phase 4" | "N/A";
  studyType: "interventional" | "observational";
  conditions: string[];
  interventions: TrialIntervention[];
  eligibility: TrialEligibility;
  locations: TrialLocation[];
  sponsor: string;
  compensation?: TrialCompensation;
  startDate: string;
  estimatedCompletionDate?: string;
  enrollment: {
    current: number;
    target: number;
  };
  contactInfo: ContactInfo;
  lastUpdated: string;
}

export interface TrialIntervention {
  type: "drug" | "device" | "biological" | "procedure" | "behavioral" | "other";
  name: string;
  description?: string;
}

export interface TrialEligibility {
  gender: "all" | "male" | "female";
  minAge: number;
  maxAge: number;
  healthyVolunteers: boolean;
  criteria: string[];
}

export interface TrialLocation {
  facility: string;
  city: string;
  state: string;
  country: string;
  status: "recruiting" | "not_recruiting" | "completed";
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface TrialCompensation {
  amount?: number;
  frequency?: string;
  description: string;
  travelReimbursement: boolean;
}

// ==========================================
// Medical Tourism Types
// ==========================================

export interface MedicalTourismDestination {
  id: string;
  country: string;
  city: string;
  hospitals: InternationalHospital[];
  popularProcedures: TourismProcedure[];
  averageSavings: number; // percentage vs US
  travelInfo: TravelInfo;
  costOfLiving: CostOfLivingData;
  visaRequirements: VisaInfo;
  languagesSpoken: string[];
  qualityIndicators: {
    jciAccreditedHospitals: number;
    medicalTourismRanking?: number;
  };
}

export interface InternationalHospital {
  id: string;
  name: string;
  address: Address;
  accreditations: Accreditation[];
  specialties: string[];
  internationalPatientServices: boolean;
  interpreterServices: string[];
  website: string;
  ratings: QualityRatings;
}

export interface TourismProcedure {
  procedureName: string;
  averageCostLocal: number;
  averageCostUS: number;
  savingsPercentage: number;
  recoveryTimeWeeks: number;
  hospitalStayDays: number;
}

export interface TravelInfo {
  flightEstimate: PriceRange;
  flightDurationHours: number;
  accommodationPerNight: PriceRange;
  localTransportDaily: number;
  mealCostDaily: number;
  recommendedStayDays: number;
}

export interface CostOfLivingData {
  index: number; // relative to US = 100
  mealCostAverage: number;
  publicTransport: number;
  taxi: number;
  currency: string;
  exchangeRate: number;
}

export interface VisaInfo {
  required: boolean;
  type?: string;
  processingTimeDays?: number;
  medicalVisaAvailable?: boolean;
  eVisaAvailable?: boolean;
}

// ==========================================
// Insurance & Financial Types
// ==========================================

export interface InsurancePlan {
  id: string;
  carrierId: string;
  carrierName: string;
  planName: string;
  planType: "HMO" | "PPO" | "EPO" | "POS" | "HDHP" | "Catastrophic";
  metalLevel?: "Bronze" | "Silver" | "Gold" | "Platinum";
  premium: {
    individual: number;
    family: number;
  };
  deductible: {
    individual: number;
    family: number;
  };
  outOfPocketMax: {
    individual: number;
    family: number;
  };
  copays: {
    primaryCare: number;
    specialist: number;
    urgentCare: number;
    emergencyRoom: number;
    genericDrug: number;
    brandDrug: number;
  };
  coinsurance: number; // percentage
  hsaEligible: boolean;
  networkSize: number;
  rating?: number;
  stateAvailable: string[];
}

export interface HSAAccount {
  id: string;
  provider: string;
  balance: number;
  contributionYTD: number;
  contributionLimit: number;
  investments?: HSAInvestment[];
  transactions: HSATransaction[];
}

export interface HSAInvestment {
  fundName: string;
  amount: number;
  returnYTD: number;
}

export interface HSATransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: "contribution" | "withdrawal" | "expense";
}

export interface PaymentPlan {
  id: string;
  providerName: string;
  type: "medical_credit" | "hospital_plan" | "third_party";
  apr: number;
  minAmount: number;
  maxAmount: number;
  termMonths: number[];
  promotionalPeriod?: number; // 0% APR months
  requirements: string[];
  applicationUrl: string;
}

// ==========================================
// Wearable & Health Data Types
// ==========================================

export interface WearableDevice {
  id: string;
  type: "fitness_tracker" | "smartwatch" | "cgm" | "blood_pressure" | "scale" | "sleep_tracker" | "pulse_ox";
  brand: string;
  model: string;
  connectedAt: string;
  lastSynced: string;
  status: "connected" | "disconnected" | "syncing" | "error";
}

export interface HealthMetrics {
  userId: string;
  date: string;
  heartRate?: VitalReading;
  bloodPressure?: BloodPressureReading;
  bloodGlucose?: GlucoseReading;
  steps?: number;
  activeMinutes?: number;
  caloriesBurned?: number;
  sleep?: SleepData;
  weight?: number;
  bodyFat?: number;
  oxygenSaturation?: number;
  respiratoryRate?: number;
  temperature?: number;
  source: string;
}

export interface VitalReading {
  value: number;
  unit: string;
  timestamp: string;
  context?: "resting" | "active" | "sleeping";
}

export interface BloodPressureReading {
  systolic: number;
  diastolic: number;
  pulse: number;
  timestamp: string;
}

export interface GlucoseReading {
  value: number;
  unit: "mg/dL" | "mmol/L";
  timestamp: string;
  mealContext?: "fasting" | "before_meal" | "after_meal" | "bedtime";
}

export interface SleepData {
  totalMinutes: number;
  deepSleepMinutes: number;
  lightSleepMinutes: number;
  remSleepMinutes: number;
  awakeMinutes: number;
  sleepScore?: number;
  bedtime: string;
  wakeTime: string;
}

// ==========================================
// User & Health Records Types
// ==========================================

export interface HealthRecord {
  id: string;
  userId: string;
  type: "lab_result" | "imaging" | "visit_summary" | "prescription" | "immunization" | "procedure" | "allergy" | "other";
  title: string;
  date: string;
  provider?: string;
  facility?: string;
  fileUrl?: string;
  fileType?: string;
  summary?: string;
  data?: Record<string, unknown>;
  tags: string[];
  isVerified: boolean;
  source: "user_upload" | "provider_sync" | "insurance" | "pharmacy";
  createdAt: string;
  updatedAt: string;
}

export interface Medication {
  id: string;
  drugId: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  route: string;
  prescribedBy: string;
  prescribedDate: string;
  pharmacy?: string;
  refillsRemaining: number;
  nextRefillDate?: string;
  status: "active" | "discontinued" | "completed";
  instructions?: string;
}

export interface Immunization {
  id: string;
  vaccineName: string;
  vaccineType: string;
  dateAdministered: string;
  administrator: string;
  lotNumber?: string;
  site?: string;
  doseNumber?: number;
  seriesComplete?: boolean;
  nextDoseDate?: string;
}

export interface Allergy {
  id: string;
  allergen: string;
  type: "drug" | "food" | "environmental" | "other";
  reaction: string;
  severity: "mild" | "moderate" | "severe" | "life_threatening";
  onsetDate?: string;
  verifiedBy?: string;
  notes?: string;
}

// ==========================================
// Community & Reviews Types
// ==========================================

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  providerId: string;
  providerName: string;
  procedureCode?: string;
  procedureName?: string;
  rating: number;
  title: string;
  content: string;
  pros?: string[];
  cons?: string[];
  costPaid?: number;
  insuranceUsed?: string;
  visitDate: string;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
  response?: ProviderResponse;
}

export interface ProviderResponse {
  content: string;
  respondedAt: string;
  respondedBy: string;
}

export interface ForumPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
  viewCount: number;
  replyCount: number;
  likeCount: number;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
  replies: ForumReply[];
}

export interface ForumReply {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  isVerifiedProvider: boolean;
  content: string;
  likeCount: number;
  isAcceptedAnswer: boolean;
  createdAt: string;
}

// ==========================================
// Data Source & Metadata Types
// ==========================================

export interface DataSource {
  name: string;
  type: "government" | "commercial" | "user_reported" | "partner" | "scraped";
  url?: string;
  lastFetched: string;
  confidenceLevel: "high" | "medium" | "low";
  requiresAttribution: boolean;
}

export interface DataFreshness {
  lastUpdated: string;
  updateFrequency: "real_time" | "daily" | "weekly" | "monthly" | "quarterly";
  nextUpdate?: string;
  isStale: boolean;
}

// ==========================================
// Search & Filter Types
// ==========================================

export interface SearchFilters {
  query?: string;
  procedureCode?: string;
  location?: {
    lat: number;
    lng: number;
    radius: number; // miles
  };
  zipCode?: string;
  state?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  providerTypes?: Provider["type"][];
  insuranceAccepted?: string[];
  qualityRating?: number;
  accreditations?: string[];
  sortBy?: "price" | "distance" | "rating" | "wait_time";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface SearchResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
  filters: SearchFilters;
  dataFreshness: DataFreshness;
}

// ==========================================
// API Response Types
// ==========================================

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: APIError;
  meta?: {
    requestId: string;
    timestamp: string;
    cached: boolean;
    dataSources: DataSource[];
  };
}

export interface APIError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
