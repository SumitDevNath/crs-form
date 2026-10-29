// import { Switch } from "@mui/material";

import { useCRSForm } from "../../../context/CRSFormContext";
import SectionHeader from "../components/SectionHeader";
import YesNoField from "../components/YesNoField";
import DateField from "../components/DateField";
import ToggleSwitch from "../components/ToggleSwitch";
import FieldError from "../components/FieldError";

export default function CaseVaccinationHistorySection() {
  const { formData, validationErrors, updateCaseVaccinationHistory } =
    useCRSForm();

  const vaccinationHistory = formData.caseVaccinationHistory;

  const vaccinationErrors = validationErrors.caseVaccinationHistory;

  const handleAvailabilityChange = (checked: boolean) => {
    updateCaseVaccinationHistory({
      ...vaccinationHistory,

      vaccinationHistoryAvailable: checked,

      vaccinatedAgainstRubella: checked
        ? vaccinationHistory.vaccinatedAgainstRubella
        : null,

      rubellaVaccinationDate: checked
        ? vaccinationHistory.rubellaVaccinationDate
        : "",
    });
  };

  const handleVaccinatedChange = (value: "yes" | "no" | null) => {
    updateCaseVaccinationHistory({
      ...vaccinationHistory,

      vaccinatedAgainstRubella: value,

      rubellaVaccinationDate:
        value === "yes" ? vaccinationHistory.rubellaVaccinationDate : "",
    });
  };

  return (
    <section>
      <SectionHeader
        image="/vaccine.png"
        title="Vaccination History of the Case"
        // subtitle="Record rubella vaccination information"
        rightContent={
          <div className="flex items-center gap-3 rounded-xl bg-[#dbeafe] px-4 py-2">
            <span className="text-sm font-medium text-[#111827]">
              Vaccination history available?
            </span>

            <ToggleSwitch
              checked={vaccinationHistory.vaccinationHistoryAvailable}
              onChange={handleAvailabilityChange}
              ariaLabel="Enable vaccination history"
            />
          </div>
        }
      />

      <div className="px-5 py-3">
        {vaccinationHistory.vaccinationHistoryAvailable && (
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-4">
            {/* Vaccinated against rubella */}
            <div className="shrink-0">
              <YesNoField
                name="caseVaccinatedAgainstRubella"
                label="Vaccinated against rubella"
                value={vaccinationHistory.vaccinatedAgainstRubella}
                onChange={handleVaccinatedChange}
                required
                inline
              />
            </div>

            {/* Vaccination Date */}
            {vaccinationHistory.vaccinatedAgainstRubella === "yes" && (
              <div className="w-full pt-1 md:w-60">
                <DateField
                  label="Vaccination Date"
                  value={vaccinationHistory.rubellaVaccinationDate}
                  required
                  onChange={(value) =>
                    updateCaseVaccinationHistory({
                      ...vaccinationHistory,
                      rubellaVaccinationDate: value,
                    })
                  }
                />

                <FieldError
                  message={vaccinationErrors.rubellaVaccinationDate}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
