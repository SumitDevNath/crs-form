import {
  // MenuItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { useCRSForm } from "../../../context/CRSFormContext";

import {
  congenitalHeartDiseaseOptions,
  groupBOptions,
} from "../constants/crs.constants";

import type {
  CRSClinicalInformation,
  CRSGroupA,
  CRSGroupB,
  CRSBirthDetails,
  YesNo,
  // ChildStatus,
} from "../types/crs.types";

import SectionHeader from "../components/SectionHeader";
import SubsectionCard from "../components/SubsectionCard";
import YesNoField from "../components/YesNoField";
import CheckboxField from "../components/CheckboxField";
import DateField from "../components/DateField";
import { whiteTextFieldSx } from "../constants/crs.styles";
import FieldError from "../components/FieldError";

export default function ClinicalInformationSection() {
  const { formData, validationErrors, updateClinicalInformation } =
    useCRSForm();

  const clinicalInformation = formData.clinicalInformation;
  const clinicalErrors = validationErrors.clinicalInformation;

  const updateGroupA = (value: CRSGroupA) => {
    const updatedClinicalInformation: CRSClinicalInformation = {
      ...clinicalInformation,
      groupA: value,
    };

    updateClinicalInformation(updatedClinicalInformation);
  };

  const updateBirthDetails = (value: CRSBirthDetails) => {
    const updatedClinicalInformation: CRSClinicalInformation = {
      ...clinicalInformation,
      birthDetails: value,
    };

    updateClinicalInformation(updatedClinicalInformation);
  };

  const updateGroupB = (value: CRSGroupB) => {
    const updatedClinicalInformation: CRSClinicalInformation = {
      ...clinicalInformation,
      groupB: value,
    };

    updateClinicalInformation(updatedClinicalInformation);
  };

  const handleCongenitalHeartDiseaseChange = (value: YesNo) => {
    if (value === "no") {
      updateGroupA({
        ...clinicalInformation.groupA,

        congenitalHeartDisease: value,

        congenitalHeartDiseaseTypes: {
          pda: false,
          vsd: false,
          cchd: false,
          ps: false,
          others: false,
          othersSpecify: "",
        },
      });

      return;
    }

    updateGroupA({
      ...clinicalInformation.groupA,
      congenitalHeartDisease: value,
    });
  };

  const handleHeartDiseaseTypeChange = (
    key: "pda" | "vsd" | "cchd" | "ps" | "others",
    checked: boolean,
  ) => {
    const currentTypes = clinicalInformation.groupA.congenitalHeartDiseaseTypes;

    const updatedTypes = {
      ...currentTypes,
      [key]: checked,
    };

    if (key === "others" && checked === false) {
      updatedTypes.othersSpecify = "";
    }

    updateGroupA({
      ...clinicalInformation.groupA,

      congenitalHeartDiseaseTypes: updatedTypes,
    });
  };

  const handleOtherAbnormalitiesChange = (value: YesNo) => {
    updateGroupB({
      ...clinicalInformation.groupB,

      otherAbnormalities: value,

      otherAbnormalitiesDescription:
        value === "yes"
          ? clinicalInformation.groupB.otherAbnormalitiesDescription
          : "",
    });
  };

  return (
    <section>
      <SectionHeader image="/medical.png" title="Clinical Information" />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <SubsectionCard title="Group (a)">
            <div>
              <YesNoField
                name="congenitalHeartDisease"
                number={1}
                label="Congenital Heart Disease"
                value={clinicalInformation.groupA.congenitalHeartDisease}
                onChange={handleCongenitalHeartDiseaseChange}
                required
              />

              {clinicalInformation.groupA.congenitalHeartDisease === "yes" && (
                <div className="mx-7 my-2 rounded-xl border border-[#d8e3ed] bg-[#eef4fa] p-4">
                  <p className="mb-3 text-xs text-[#566575]">
                    If "Yes", tick all that apply.
                  </p>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
                    {congenitalHeartDiseaseOptions
                      .filter((option) => option.key !== "others")
                      .map((option) => (
                        <CheckboxField
                          key={option.key}
                          label={option.label}
                          checked={
                            clinicalInformation.groupA
                              .congenitalHeartDiseaseTypes[option.key]
                          }
                          onChange={(checked) =>
                            handleHeartDiseaseTypeChange(option.key, checked)
                          }
                        />
                      ))}
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-[auto_1fr] sm:items-start">
                    <div className="pt-1">
                      <CheckboxField
                        label="Others"
                        checked={
                          clinicalInformation.groupA.congenitalHeartDiseaseTypes
                            .others
                        }
                        onChange={(checked) =>
                          handleHeartDiseaseTypeChange("others", checked)
                        }
                      />
                    </div>
                    <div className="min-w-0">
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Specify others"
                        value={
                          clinicalInformation.groupA.congenitalHeartDiseaseTypes
                            .othersSpecify
                        }
                        disabled={
                          !clinicalInformation.groupA
                            .congenitalHeartDiseaseTypes.others
                        }
                        error={Boolean(clinicalErrors.groupA.othersSpecify)}
                        onChange={(event) =>
                          updateGroupA({
                            ...clinicalInformation.groupA,

                            congenitalHeartDiseaseTypes: {
                              ...clinicalInformation.groupA
                                .congenitalHeartDiseaseTypes,

                              othersSpecify: event.target.value,
                            },
                          })
                        }
                        sx={whiteTextFieldSx}
                      />
                      <FieldError
                        message={clinicalErrors.groupA.othersSpecify}
                      />
                    </div>
                  </div>
                </div>
              )}

              <YesNoField
                name="cataract"
                number={2}
                label="Cataract"
                value={clinicalInformation.groupA.cataract}
                onChange={(value) =>
                  updateGroupA({
                    ...clinicalInformation.groupA,
                    cataract: value,
                  })
                }
              />

              <YesNoField
                name="congenitalGlaucoma"
                number={3}
                label="Congenital Glaucoma"
                value={clinicalInformation.groupA.congenitalGlaucoma}
                onChange={(value) =>
                  updateGroupA({
                    ...clinicalInformation.groupA,
                    congenitalGlaucoma: value,
                  })
                }
              />

              <YesNoField
                name="pigmentaryRetinopathy"
                number={4}
                label="Pigmentary Retinopathy"
                value={clinicalInformation.groupA.pigmentaryRetinopathy}
                onChange={(value) =>
                  updateGroupA({
                    ...clinicalInformation.groupA,
                    pigmentaryRetinopathy: value,
                  })
                }
              />

              <YesNoField
                name="hearingImpairment"
                number={5}
                label="Hearing Impairment"
                value={clinicalInformation.groupA.hearingImpairment}
                onChange={(value) =>
                  updateGroupA({
                    ...clinicalInformation.groupA,
                    hearingImpairment: value,
                  })
                }
              />
            </div>
          </SubsectionCard>
        </div>

        {/* RIGHT COLUMN — GROUP B */}
        <SubsectionCard title="Group (b)" className="h-fit">
          <div>
            {groupBOptions.map((option, index) => (
              <YesNoField
                key={option.key}
                name={option.key}
                number={index + 1}
                label={option.label}
                value={clinicalInformation.groupB[option.key]}
                onChange={(value) => {
                  if (option.key === "otherAbnormalities") {
                    handleOtherAbnormalitiesChange(value);
                    return;
                  }

                  updateGroupB({
                    ...clinicalInformation.groupB,
                    [option.key]: value,
                  });
                }}
              />
            ))}

            {clinicalInformation.groupB.otherAbnormalities === "yes" && (
              <div className="mt-4 rounded-xl border border-[#d8e3ed] bg-[#eef4fa] p-4">
                <p className="mb-2 text-xs text-[#566575]">
                  If "Yes" to other abnormalities, describe them.
                </p>

                <TextField
                  fullWidth
                  size="small"
                  multiline
                  minRows={2}
                  placeholder="Describe the abnormality"
                  value={
                    clinicalInformation.groupB.otherAbnormalitiesDescription
                  }
                  error={Boolean(
                    clinicalErrors.groupB.otherAbnormalitiesDescription,
                  )}
                  helperText={
                    clinicalErrors.groupB.otherAbnormalitiesDescription
                  }
                  onChange={(event) =>
                    updateGroupB({
                      ...clinicalInformation.groupB,
                      otherAbnormalitiesDescription: event.target.value,
                    })
                  }
                  sx={whiteTextFieldSx}
                />
              </div>
            )}
          </div>
        </SubsectionCard>
      </div>

      {/* BIRTH DETAILS */}
      <div className="bg-white p-5">
        <div className="mb-4 border-b border-[#d9dee5] pb-3" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-[auto_auto_260px] xl:items-start">
          {/* Birth Weight */}
          <div className="min-w-0">
            <div className="flex items-start gap-2">
              <div>
                <TextField
                  required
                  size="small"
                  type="number"
                  label="Birth Weight"
                  value={clinicalInformation.birthDetails.birthWeight}
                  error={Boolean(clinicalErrors.birthDetails.birthWeight)}
                  onChange={(event) =>
                    updateBirthDetails({
                      ...clinicalInformation.birthDetails,
                      birthWeight: event.target.value,
                    })
                  }
                  sx={{
                    width: "150px",

                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#ffffff",
                    },
                  }}
                />

                <FieldError message={clinicalErrors.birthDetails.birthWeight} />
              </div>

              <ToggleButtonGroup
                exclusive
                size="small"
                value={clinicalInformation.birthDetails.birthWeightUnit}
                onChange={(_, value) => {
                  if (value === "kg" || value === "lb") {
                    updateBirthDetails({
                      ...clinicalInformation.birthDetails,
                      birthWeightUnit: value,
                    });
                  }
                }}
                sx={{
                  "& .MuiToggleButton-root": {
                    height: "40px",
                    minWidth: 48,
                    textTransform: "none",
                  },

                  "& .MuiToggleButton-root.Mui-selected": {
                    backgroundColor: "#0b63c7",
                    color: "#ffffff",
                  },
                }}
              >
                <ToggleButton value="kg">KG</ToggleButton>
                <ToggleButton value="lb">LB</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          {/* Is child dead */}
          <div className="flex min-h-10 items-center gap-3">
            <span className="whitespace-nowrap text-sm font-medium text-[#374151]">
              Is the child dead?
              <span className="ml-1 text-red-600">*</span>
            </span>

            <YesNoField
              name="isChildDead"
              label=""
              value={clinicalInformation.birthDetails.isChildDead}
              onChange={(value) =>
                updateBirthDetails({
                  ...clinicalInformation.birthDetails,
                  isChildDead: value,
                  dateOfDeath:
                    value === "yes"
                      ? clinicalInformation.birthDetails.dateOfDeath
                      : "",
                })
              }
              compact
            />
          </div>

          {/* Date of Death */}
          {clinicalInformation.birthDetails.isChildDead === "yes" && (
            <div className="min-w-0">
              <DateField
                label="Date of Death"
                value={clinicalInformation.birthDetails.dateOfDeath}
                required
                onChange={(value) =>
                  updateBirthDetails({
                    ...clinicalInformation.birthDetails,
                    dateOfDeath: value,
                  })
                }
              />

              <FieldError message={clinicalErrors.birthDetails.dateOfDeath} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
