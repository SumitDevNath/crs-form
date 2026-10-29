import ClinicalInformationSection from "./sections/ClinicalInformationSection";
import MaternalHistorySection from "./sections/MaternalHistorySection";
import CaseVaccinationHistorySection from "./sections/CaseVaccinationHistorySection";

export default function CRSInvestigationForm() {
  return (
    <div className="space-y-4 p-3 sm:p-4">
      <div className="rounded-xl border border-[#dbe3ec] justify-center bg-white p-5 sm:p-6">
        <ClinicalInformationSection />
      </div>

      <div className="rounded-xl border border-[#dbe3ec] bg-white p-5 sm:p-6">
        <MaternalHistorySection />
      </div>

      <div className="rounded-xl border border-[#dbe3ec] bg-white p-5 sm:p-6">
        <CaseVaccinationHistorySection />
      </div>
    </div>
  );
}
