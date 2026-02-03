import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { PriceComparison } from "@/components/price-comparison";
import { SymptomChecker } from "@/components/symptom-checker";
import { HealthDashboard } from "@/components/health-dashboard";
import { MedicalTourism } from "@/components/medical-tourism";
import { CareCoordination } from "@/components/care-coordination";
import { PrescriptionPricing } from "@/components/prescription-pricing";
import { TelemedicineMarketplace } from "@/components/telemedicine-marketplace";
import { ClinicalTrials } from "@/components/clinical-trials";
import { EmergencyServices } from "@/components/emergency-services";
import { HealthRecords } from "@/components/health-records";
import { CommunityForums } from "@/components/community-forums";
import { FinancialTools } from "@/components/financial-tools";
import { WellnessPrevention } from "@/components/wellness-prevention";
import { Gamification } from "@/components/gamification";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PriceComparison />
        <TelemedicineMarketplace />
        <EmergencyServices />
        <PrescriptionPricing />
        <SymptomChecker />
        <ClinicalTrials />
        <HealthRecords />
        <HealthDashboard />
        <MedicalTourism />
        <CommunityForums />
        <FinancialTools />
        <WellnessPrevention />
        <Gamification />
        <CareCoordination />
      </main>
      <Footer />
    </div>
  );
}
