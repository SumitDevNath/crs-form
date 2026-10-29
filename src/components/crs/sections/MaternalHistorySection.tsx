import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useCRSForm } from "../../../context/CRSFormContext";
import { whiteTextFieldSx } from "../constants/crs.styles";

import type {
  CRSBasicMaternalInformation,
  CRSExposureDuringPregnancy,
  CRSMaternalHistory,
  YesNo,
} from "../types/crs.types";

import SectionHeader from "../components/SectionHeader";
import SubsectionCard from "../components/SubsectionCard";
import YesNoField from "../components/YesNoField";
import DateField from "../components/DateField";
import FieldError from "../components/FieldError";

export default function MaternalHistorySection() {
  const { formData, validationErrors, updateMaternalHistory } = useCRSForm();
  const maternalHistory = formData.maternalHistory;

  const maternalErrors = validationErrors.maternalHistory;

  const exposure = maternalHistory.exposureDuringPregnancy;

  const basicInformation = maternalHistory.basicInformation;

  const updateExposure = (value: CRSExposureDuringPregnancy) => {
    const updatedMaternalHistory: CRSMaternalHistory = {
      ...maternalHistory,
      exposureDuringPregnancy: value,
    };

    updateMaternalHistory(updatedMaternalHistory);
  };

  const updateBasicInformation = (value: CRSBasicMaternalInformation) => {
    const updatedMaternalHistory: CRSMaternalHistory = {
      ...maternalHistory,
      basicInformation: value,
    };

    updateMaternalHistory(updatedMaternalHistory);
  };

  const handleExposureChange = (value: YesNo) => {
    updateExposure({
      ...exposure,

      exposedToRashIllness: value,

      exposurePregnancyMonth:
        value === "yes" ? exposure.exposurePregnancyMonth : "",
    });
  };

  const handleMaternalRashChange = (value: YesNo) => {
    updateExposure({
      ...exposure,

      maternalRashIllness: value,

      maternalRashPregnancyMonth:
        value === "yes" ? exposure.maternalRashPregnancyMonth : "",

      rubellaLaboratoryConfirmed:
        value === "yes" ? exposure.rubellaLaboratoryConfirmed : null,
    });
  };

  const handleMaternalVaccinationChange = (value: YesNo) => {
    if (value === "no") {
      updateBasicInformation({
        ...basicInformation,

        vaccinatedAgainstRubella: "no",

        rubellaVaccinationDate: "",
      });

      return;
    }

    updateBasicInformation({
      ...basicInformation,
      vaccinatedAgainstRubella: "yes",
    });
  };

  return (
    <section>
      <SectionHeader image="/medical-report.png" title="Maternal History" />

      <div className="space-y-4">
        {/* BASIC MATERNAL INFORMATION */}
        <SubsectionCard title="Basic maternal information">
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {/* Mother's age */}
            <div>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Mother's age"
                value={basicInformation.motherAge}
                error={Boolean(maternalErrors.basicInformation.motherAge)}
                helperText={maternalErrors.basicInformation.motherAge}
                onChange={(event) =>
                  updateBasicInformation({
                    ...basicInformation,
                    motherAge: event.target.value,
                  })
                }
                slotProps={{
                  htmlInput: {
                    min: 1,
                    step: 1,
                  },
                }}
                sx={{
                  ...whiteTextFieldSx,
                  // width: "200px",
                }}
              />
            </div>

            {/* Previous pregnancies */}
            <div>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="No of Previous pregnancies"
                value={basicInformation.previousPregnancies}
                error={Boolean(
                  maternalErrors.basicInformation.previousPregnancies,
                )}
                helperText={maternalErrors.basicInformation.previousPregnancies}
                onChange={(event) =>
                  updateBasicInformation({
                    ...basicInformation,
                    previousPregnancies: event.target.value,
                  })
                }
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: 12,
                    step: 1,
                  },
                }}
                sx={{
                  ...whiteTextFieldSx,
                  // width: "250px",
                }}
              />
            </div>

            {/* Vaccinated against rubella */}
            <div>
              <YesNoField
                name="motherVaccinatedAgainstRubella"
                label="Vaccinated against rubella"
                value={basicInformation.vaccinatedAgainstRubella}
                onChange={handleMaternalVaccinationChange}
                compact
                required
              />
            </div>

            {/* Vaccination date */}
            <div>
              {basicInformation.vaccinatedAgainstRubella === "yes" ? (
                <div className="pt-0">
                  <DateField
                    label="Vaccination date"
                    value={basicInformation.rubellaVaccinationDate}
                    required
                    // error={Boolean(
                    //   maternalErrors.basicInformation.rubellaVaccinationDate,
                    // )}
                    // helperText={
                    //   maternalErrors.basicInformation.rubellaVaccinationDate
                    // }
                    onChange={(value) =>
                      updateBasicInformation({
                        ...basicInformation,
                        rubellaVaccinationDate: value,
                      })
                    }
                  />
                  <FieldError
                    message={
                      maternalErrors.basicInformation.rubellaVaccinationDate
                    }
                  />
                </div>
              ) : (
                <div className="h-10" />
              )}
            </div>
          </div>
        </SubsectionCard>

        {/* EXPOSURE DURING PREGNANCY */}
        {/* EXPOSURE DURING PREGNANCY */}
        <SubsectionCard title="Exposure during pregnancy">
          <div className="space-y-0">
            {/* =====================================================
        1. MACULOPAPULAR RASH ILLNESS
       ===================================================== */}

            <div className="border-b border-[#e1e8ef] py-3">
              <div
                className="
          grid gap-x-4 gap-y-3
          xl:grid-cols-[minmax(0,2fr)_auto_minmax(150px,1fr)_200px]
          xl:items-start
        "
              >
                {/* Question */}
                <div className="flex min-h-10 items-center text-sm font-medium leading-5 text-[#2c3b4b]">
                  Maculopapular rash illness with fever
                </div>

                {/* Yes / No */}
                <div className="flex min-h-10 items-center">
                  <YesNoField
                    name="maternalRashIllness"
                    label=""
                    value={exposure.maternalRashIllness}
                    onChange={handleMaternalRashChange}
                    compact
                  />
                </div>

                {/* Month label + input */}
                {exposure.maternalRashIllness === "yes" ? (
                  <>
                    <div className="flex min-h-10 items-center text-sm text-[#43525f]">
                      Month during pregnancy
                    </div>

                    <div className="min-w-0">
                      <TextField
                        fullWidth
                        required
                        size="small"
                        type="number"
                        value={exposure.maternalRashPregnancyMonth}
                        error={Boolean(
                          maternalErrors.exposureDuringPregnancy
                            .maternalRashPregnancyMonth,
                        )}
                        onChange={(event) =>
                          updateExposure({
                            ...exposure,
                            maternalRashPregnancyMonth: event.target.value,
                          })
                        }
                        slotProps={{
                          htmlInput: {
                            min: 0,
                            max: 10,
                            step: 1,
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#ffffff",
                          },
                        }}
                      />

                      <FieldError
                        message={
                          maternalErrors.exposureDuringPregnancy
                            .maternalRashPregnancyMonth
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div />
                    <div />
                  </>
                )}
              </div>

              {/* LAB CONFIRMATION */}
              {exposure.maternalRashIllness === "yes" && (
                <div className="mt-3 px-4 py-2">
                  <div className="w-full max-w-155">
                    <div className="flex flex-wrap items-center gap-x-61 gap-y-2">
                      <span className="text-sm font-medium text-[#2c3b4b]">
                        Was rubella laboratory confirmed?
                      </span>

                      <ToggleButtonGroup
                        exclusive
                        size="small"
                        value={exposure.rubellaLaboratoryConfirmed}
                        onChange={(_, nextValue: YesNo) => {
                          if (nextValue) {
                            updateExposure({
                              ...exposure,
                              rubellaLaboratoryConfirmed: nextValue,
                            });
                          }
                        }}
                        sx={{
                          gap: "10px",

                          "& .MuiToggleButton-root": {
                            minWidth: 52,
                            height: 32,
                            border: "1px solid #d7dce3",
                            borderRadius: "2px !important",
                            px: 1.5,
                            py: 0,
                            textTransform: "none",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            color: "#9ca3af",
                            backgroundColor: "#f3f4f6",
                          },

                          "& .MuiToggleButton-root:hover": {
                            backgroundColor: "#e9edf2",
                          },

                          "& .MuiToggleButton-root.Mui-selected": {
                            backgroundColor: "#0b63c7",
                            color: "#ffffff",
                            borderColor: "#0b63c7",
                            fontWeight: 600,
                          },

                          "& .MuiToggleButton-root.Mui-selected:hover": {
                            backgroundColor: "#0b63c7",
                          },
                        }}
                      >
                        <ToggleButton value="yes">Yes</ToggleButton>

                        <ToggleButton value="no">No</ToggleButton>
                      </ToggleButtonGroup>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* =====================================================
        2. EXPOSURE TO ANOTHER PERSON WITH RASH ILLNESS
       ===================================================== */}

            <div className="py-3">
              <div
                className="
          grid gap-x-4 gap-y-3
          xl:grid-cols-[minmax(0,2fr)_auto_minmax(150px,1fr)_200px]
          xl:items-start
        "
              >
                {/* Question */}
                <div className="flex min-h-10 items-center text-sm font-medium leading-5 text-[#2c3b4b]">
                  Exposed during pregnancy to any person with maculopapular rash
                  illness with fever
                </div>

                {/* Yes / No */}
                <div className="flex min-h-10 items-center">
                  <YesNoField
                    name="exposedToRashIllness"
                    label=""
                    value={exposure.exposedToRashIllness}
                    onChange={handleExposureChange}
                    compact
                  />
                </div>

                {/* Month label + input */}
                {exposure.exposedToRashIllness === "yes" ? (
                  <>
                    <div className="flex min-h-10 items-center text-sm text-[#43525f]">
                      Month during pregnancy
                    </div>

                    <div className="min-w-0 pt-0.5">
                      <TextField
                        fullWidth
                        required
                        size="small"
                        type="number"
                        value={exposure.exposurePregnancyMonth}
                        error={Boolean(
                          maternalErrors.exposureDuringPregnancy
                            .exposurePregnancyMonth,
                        )}
                        onChange={(event) =>
                          updateExposure({
                            ...exposure,
                            exposurePregnancyMonth: event.target.value,
                          })
                        }
                        slotProps={{
                          htmlInput: {
                            min: 0,
                            max: 10,
                            step: 1,
                          },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#ffffff",
                          },
                        }}
                      />

                      <FieldError
                        message={
                          maternalErrors.exposureDuringPregnancy
                            .exposurePregnancyMonth
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div />
                    <div />
                  </>
                )}
              </div>
            </div>
          </div>
        </SubsectionCard>
      </div>
    </section>
  );
}
