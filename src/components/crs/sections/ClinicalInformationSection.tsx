import type { ReactNode } from "react";
import {
  Box,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import { useCRSForm } from "../../../context/CRSFormContext";
import {
  congenitalHeartDiseaseOptions,
  groupBOptions,
} from "../constants/crs.constants";
import { whiteTextFieldSx } from "../constants/crs.styles";
import type { CRSClinicalInformation, YesNo } from "../types/crs.types";
import CheckboxField from "../components/CheckboxField";
import DateField from "../components/DateField";
import FieldError from "../components/FieldError";
import ToggleSwitch from "../components/ToggleSwitch";

const cardSx = {
  p: { xs: 2, sm: 2 },
  border: "1px solid #cfd4de",
  borderRadius: "6px",
  bgcolor: "#fff",
  boxShadow: "none",
} as const;

const sectionSx = {
  p: { xs: 2, sm: 2.5 },
  border: "1px solid #b8c2d0",
  borderRadius: "6px",
  bgcolor: "#fff",
  boxShadow: "none",
  minWidth: 0,
} as const;

const threeColumnSx = {
  display: "grid",
  gap: 2,
  gridTemplateColumns: "minmax(0, 1fr)",
  "@media (min-width:768px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },
  "@media (min-width:1280px)": {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
} as const;

const choiceSx = {
  gap: "8px",
  flexShrink: 0,
  "& .MuiToggleButton-root": {
    minWidth: 48,
    height: 34,
    px: 1.25,
    py: 0,
    border: "1px solid #e5e7eb !important",
    borderRadius: "4px !important",
    bgcolor: "#fff",
    color: "#94a3b8",
    textTransform: "none",
    fontSize: 14,
    fontWeight: 500,
    "&:hover": { bgcolor: "#f8fafc" },
    "&.Mui-selected, &.Mui-selected:hover": {
      bgcolor: "#e8f1ff",
      color: "#005bbb",
      borderColor: "#2563eb !important",
    },
  },
} as const;

const birthTitleSx = {
  fontSize: 16,
  fontWeight: 600,
  color: "#0f172a",
} as const;
const conditionalSx = { mt: 2, pt: 2, borderTop: "1px solid #d8dde6" } as const;

const groupAQuestions = [
  { key: "cataract", label: "Cataract" },
  { key: "congenitalGlaucoma", label: "Congenital Glaucoma" },
  { key: "pigmentaryRetinopathy", label: "Pigmentary Retinopathy" },
  { key: "hearingImpairment", label: "Hearing Impairment" },
] as const;

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Paper component="section" variant="outlined" sx={sectionSx}>
      <Box sx={{ mb: 2 }}>
        <Typography
          component="h3"
          sx={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "#374151",
          }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Paper>
  );
}

function QuestionCard({
  label,
  number,
  value,
  onChange,
  children,
}: {
  label: string;
  number?: number;
  value: YesNo;
  onChange: (value: YesNo) => void;
  children?: ReactNode;
}) {
  return (
    <Paper
      component="article"
      variant="outlined"
      sx={{ ...cardSx, minWidth: 0 }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Typography
          component="h4"
          sx={{
            flex: 1,
            minWidth: 0,
            fontSize: 12,
            fontWeight: 600,
            color: "#0f172a",
          }}
        >
          {number !== undefined && `${number}. `}
          {label}
        </Typography>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={value}
          aria-label={label}
          onChange={(_, nextValue: YesNo | null) => {
            if (nextValue !== null) onChange(nextValue);
          }}
          sx={choiceSx}
        >
          <ToggleButton value="yes">Yes</ToggleButton>
          <ToggleButton value="no">No</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {children && <Box sx={conditionalSx}>{children}</Box>}
    </Paper>
  );
}

export default function ClinicalInformationSection() {
  const { formData, validationErrors, updateClinicalInformation } =
    useCRSForm();
  const clinicalInformation = formData.clinicalInformation;
  const { groupA, groupB, birthDetails } = clinicalInformation;
  const {
    groupA: groupAErrors,
    groupB: groupBErrors,
    birthDetails: birthErrors,
  } = validationErrors.clinicalInformation;

  const updateSection = <K extends "groupA" | "groupB" | "birthDetails">(
    section: K,
    changes: Partial<CRSClinicalInformation[K]>,
  ) =>
    updateClinicalInformation({
      ...clinicalInformation,
      [section]: { ...clinicalInformation[section], ...changes },
    });

  const handleCongenitalHeartDiseaseChange = (value: YesNo) =>
    updateSection("groupA", {
      congenitalHeartDisease: value,
      ...(value === "no" && {
        congenitalHeartDiseaseTypes: {
          pda: false,
          vsd: false,
          cchd: false,
          ps: false,
          others: false,
          othersSpecify: "",
        },
      }),
    });

  const handleHeartDiseaseTypeChange = (
    key: "pda" | "vsd" | "cchd" | "ps" | "others",
    checked: boolean,
  ) =>
    updateSection("groupA", {
      congenitalHeartDiseaseTypes: {
        ...groupA.congenitalHeartDiseaseTypes,
        [key]: checked,
        ...(key === "others" && !checked ? { othersSpecify: "" } : {}),
      },
    });

  const handleOtherAbnormalitiesChange = (value: YesNo) =>
    updateSection("groupB", {
      otherAbnormalities: value,
      otherAbnormalitiesDescription:
        value === "yes" ? groupB.otherAbnormalitiesDescription : "",
    });

  const handleChildStatusChange = (checked: boolean) =>
    updateSection("birthDetails", {
      isChildDead: checked ? "yes" : "no",
      dateOfDeath: checked ? birthDetails.dateOfDeath : "",
    });

  return (
    <Box
      component="section"
      sx={{ bgcolor: "#fff", border: "1px solid #cfd4de" }}
    >
      <Box
        component="header"
        sx={{
          px: { xs: 2, md: 3 },
          py: 1,
          borderBottom: "1px solid #cfd4de",
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 16, md: 20 },
            fontWeight: 600,
            color: "#0f172a",
          }}
        >
          Clinical Information
        </Typography>
      </Box>

      <Box
        sx={{
          p: { xs: 2, md: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: "minmax(0, 1fr)",
            alignItems: "start",
            "@media (min-width:1024px)": {
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            },
          }}
        >
          <SectionCard title="Group (a)">
            <QuestionCard
              number={1}
              label="Congenital Heart Disease"
              value={groupA.congenitalHeartDisease}
              onChange={handleCongenitalHeartDiseaseChange}
            >
              {groupA.congenitalHeartDisease === "yes" && (
                <Box>
                  <Typography sx={{ mb: 1.5, fontSize: 12, color: "#566575" }}>
                    Tick all that apply.
                  </Typography>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                      columnGap: 2,
                      rowGap: 1,
                      "@media (min-width:640px)": {
                        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                      },
                    }}
                  >
                    {congenitalHeartDiseaseOptions
                      .filter((option) => option.key !== "others")
                      .map((option) => (
                        <CheckboxField
                          key={option.key}
                          label={option.label}
                          checked={
                            groupA.congenitalHeartDiseaseTypes[option.key]
                          }
                          onChange={(checked) =>
                            handleHeartDiseaseTypeChange(option.key, checked)
                          }
                        />
                      ))}
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      gap: 1.5,
                      mt: 1.5,
                      "@media (min-width:640px)": {
                        gridTemplateColumns: "auto minmax(0, 1fr)",
                        alignItems: "start",
                      },
                    }}
                  >
                    <Box sx={{ pt: 0.5 }}>
                      <CheckboxField
                        label="Others"
                        checked={groupA.congenitalHeartDiseaseTypes.others}
                        onChange={(checked) =>
                          handleHeartDiseaseTypeChange("others", checked)
                        }
                      />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="Specify others"
                        value={groupA.congenitalHeartDiseaseTypes.othersSpecify}
                        disabled={!groupA.congenitalHeartDiseaseTypes.others}
                        error={Boolean(groupAErrors.othersSpecify)}
                        onChange={(event) =>
                          updateSection("groupA", {
                            congenitalHeartDiseaseTypes: {
                              ...groupA.congenitalHeartDiseaseTypes,
                              othersSpecify: event.target.value,
                            },
                          })
                        }
                        sx={whiteTextFieldSx}
                      />
                      <FieldError message={groupAErrors.othersSpecify} />
                    </Box>
                  </Box>
                </Box>
              )}
            </QuestionCard>

            <Box sx={{ ...threeColumnSx, mt: 2 }}>
              {groupAQuestions.map(({ key, label }, index) => (
                <QuestionCard
                  key={key}
                  number={index + 2}
                  label={label}
                  value={groupA[key]}
                  onChange={(value) =>
                    updateSection("groupA", { [key]: value })
                  }
                />
              ))}
            </Box>
          </SectionCard>

          <SectionCard title="Group (b)">
            <Box sx={threeColumnSx}>
              {groupBOptions.map((option, index) => (
                <QuestionCard
                  key={option.key}
                  number={index + 1}
                  label={option.label}
                  value={groupB[option.key]}
                  onChange={(value) =>
                    option.key === "otherAbnormalities"
                      ? handleOtherAbnormalitiesChange(value)
                      : updateSection("groupB", { [option.key]: value })
                  }
                />
              ))}
            </Box>
            {groupB.otherAbnormalities === "yes" && (
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  minRows={2}
                  placeholder="Describe the abnormality"
                  value={groupB.otherAbnormalitiesDescription}
                  error={Boolean(groupBErrors.otherAbnormalitiesDescription)}
                  helperText={groupBErrors.otherAbnormalitiesDescription}
                  onChange={(event) =>
                    updateSection("groupB", {
                      otherAbnormalitiesDescription: event.target.value,
                    })
                  }
                  sx={whiteTextFieldSx}
                />
              </Box>
            )}
          </SectionCard>
        </Box>

        <SectionCard title="Birth Details">
          <Box
            sx={{
              display: "grid",
              gap: 2.5,
              "@media (min-width:768px)": {
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              },
            }}
          >
            <Paper component="article" variant="outlined" sx={cardSx}>
              <Typography sx={{ ...birthTitleSx, mb: 2 }}>
                Birth Weight
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 150,
                    "& .MuiFormLabel-asterisk": { display: "none" },
                  }}
                >
                  <TextField
                    required
                    size="small"
                    type="number"
                    label="Birth Weight"
                    value={birthDetails.birthWeight}
                    error={Boolean(birthErrors.birthWeight)}
                    onChange={(event) =>
                      updateSection("birthDetails", {
                        birthWeight: event.target.value,
                      })
                    }
                    sx={{
                      width: 150,
                      "& .MuiOutlinedInput-root": { bgcolor: "#fff" },
                    }}
                  />
                  <FieldError message={birthErrors.birthWeight} />
                </Box>
                <ToggleButtonGroup
                  exclusive
                  size="small"
                  value={birthDetails.birthWeightUnit}
                  aria-label="Birth weight unit"
                  onChange={(_, nextValue: "kg" | "lb" | null) => {
                    if (nextValue === "kg" || nextValue === "lb") {
                      updateSection("birthDetails", {
                        birthWeightUnit: nextValue,
                      });
                    }
                  }}
                  sx={[choiceSx, { "& .MuiToggleButton-root": { height: 40 } }]}
                >
                  <ToggleButton value="kg">KG</ToggleButton>
                  <ToggleButton value="lb">LB</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Paper>

            <Paper component="article" variant="outlined" sx={cardSx}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography sx={birthTitleSx}>Is the child dead?</Typography>
                <ToggleSwitch
                  checked={birthDetails.isChildDead === "yes"}
                  onChange={handleChildStatusChange}
                  ariaLabel="Is the child dead?"
                />
              </Box>
              {birthDetails.isChildDead === "yes" && (
                <Box
                  sx={{
                    ...conditionalSx,
                    "& .MuiFormLabel-asterisk": { display: "none" },
                  }}
                >
                  <DateField
                    label="Date of Death"
                    value={birthDetails.dateOfDeath}
                    required
                    onChange={(value) =>
                      updateSection("birthDetails", { dateOfDeath: value })
                    }
                  />
                  <FieldError message={birthErrors.dateOfDeath} />
                </Box>
              )}
            </Paper>
          </Box>
        </SectionCard>
      </Box>
    </Box>
  );
}
