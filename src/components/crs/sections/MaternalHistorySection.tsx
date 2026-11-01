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
import { whiteTextFieldSx } from "../constants/crs.styles";
import type {
  CRSBasicMaternalInformation,
  CRSExposureDuringPregnancy,
  YesNo,
} from "../types/crs.types";
import DateField from "../components/DateField";
import ToggleSwitch from "../components/ToggleSwitch";
import FieldError from "../components/FieldError";

const sectionSx = {
  p: { xs: 2, sm: 2 },
  border: "1px solid #b8c2d0",
  borderRadius: "12px",
  bgcolor: "#fff",
  boxShadow: "none",
  minWidth: 0,
} as const;

const cardSx = {
  p: { xs: 2, sm: 2.5 },
  border: "1px solid #cfd4de",
  borderRadius: "6px",
  bgcolor: "#fff",
  boxShadow: "none",
  minWidth: 0,
} as const;

const titleSx = { fontSize: 16, fontWeight: 600, color: "#0f172a" } as const;
const conditionalSx = { mt: 2, pt: 2, borderTop: "1px solid #d8dde6" } as const;
const monthInputSx = {
  "& .MuiOutlinedInput-root": { bgcolor: "#fff" },
} as const;

const basicGridSx = {
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

const exposureGridSx = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: 2,
  alignItems: "start",
  "@media (min-width:1024px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
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

const numberFields = [
  { key: "motherAge", label: "Mother's age", min: 1 },
  {
    key: "previousPregnancies",
    label: "No of Previous pregnancies",
    min: 0,
    max: 12,
  },
] as const;

const exposureQuestions = [
  {
    key: "maternalRashIllness",
    monthKey: "maternalRashPregnancyMonth",
    label: "Maculopapular rash illness with fever",
  },
  {
    key: "exposedToRashIllness",
    monthKey: "exposurePregnancyMonth",
    label:
      "Exposed during pregnancy to any person with maculopapular rash illness with fever",
  },
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
      <Typography
        component="h3"
        sx={{
          mb: 2,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#374151",
        }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

function QuestionCard({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
  children?: ReactNode;
}) {
  return (
    <Paper component="article" variant="outlined" sx={cardSx}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Typography component="h4" sx={{ ...titleSx, flex: 1, minWidth: 0 }}>
          {label}
        </Typography>
        <ToggleSwitch
          checked={value === "yes"}
          onChange={(checked) => onChange(checked ? "yes" : "no")}
          ariaLabel={label}
        />
      </Box>
      {children && <Box sx={conditionalSx}>{children}</Box>}
    </Paper>
  );
}

export default function MaternalHistorySection() {
  const { formData, validationErrors, updateMaternalHistory } = useCRSForm();
  const maternalHistory = formData.maternalHistory;
  const { basicInformation, exposureDuringPregnancy: exposure } =
    maternalHistory;
  const {
    basicInformation: basicErrors,
    exposureDuringPregnancy: exposureErrors,
  } = validationErrors.maternalHistory;

  const updateBasic = (changes: Partial<CRSBasicMaternalInformation>) =>
    updateMaternalHistory({
      ...maternalHistory,
      basicInformation: { ...basicInformation, ...changes },
    });

  const updateExposure = (changes: Partial<CRSExposureDuringPregnancy>) =>
    updateMaternalHistory({
      ...maternalHistory,
      exposureDuringPregnancy: { ...exposure, ...changes },
    });

  const handleMaternalVaccinationChange = (value: YesNo) =>
    updateBasic({
      vaccinatedAgainstRubella: value === "no" ? "no" : "yes",
      ...(value === "no" && { rubellaVaccinationDate: "" }),
    });

  const handleExposureChange = (
    question: (typeof exposureQuestions)[number],
    value: YesNo,
  ) =>
    updateExposure({
      [question.key]: value,
      [question.monthKey]: value === "yes" ? exposure[question.monthKey] : "",
      ...(question.key === "maternalRashIllness" && {
        rubellaLaboratoryConfirmed:
          value === "yes" ? exposure.rubellaLaboratoryConfirmed : null,
      }),
    });

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "#fff",
        border: "1px solid #cfd4de",
        "& .MuiFormLabel-asterisk": { display: "none" },
      }}
    >
      <Box
        component="header"
        sx={{ px: { xs: 2, md: 3 }, py: 1, borderBottom: "1px solid #cfd4de" }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 20, md: 24 },
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          Maternal History
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
        <SectionCard title="Basic maternal information">
          <Box sx={basicGridSx}>
            {numberFields.map((field) => (
              <Paper
                key={field.key}
                component="article"
                variant="outlined"
                sx={cardSx}
              >
                <Typography component="h4" sx={{ ...titleSx, mb: 2 }}>
                  {field.label}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label={field.label}
                  value={basicInformation[field.key]}
                  error={Boolean(basicErrors[field.key])}
                  helperText={basicErrors[field.key]}
                  onChange={(event) =>
                    updateBasic({ [field.key]: event.target.value })
                  }
                  slotProps={{
                    htmlInput: {
                      min: field.min,
                      max: "max" in field ? field.max : undefined,
                      step: 1,
                    },
                  }}
                  sx={whiteTextFieldSx}
                />
              </Paper>
            ))}

            <QuestionCard
              label="Vaccinated against rubella"
              value={basicInformation.vaccinatedAgainstRubella}
              onChange={handleMaternalVaccinationChange}
            >
              {basicInformation.vaccinatedAgainstRubella === "yes" && (
                <Box>
                  <DateField
                    label="Vaccination date"
                    value={basicInformation.rubellaVaccinationDate}
                    required
                    onChange={(value) =>
                      updateBasic({ rubellaVaccinationDate: value })
                    }
                  />
                  <FieldError message={basicErrors.rubellaVaccinationDate} />
                </Box>
              )}
            </QuestionCard>
          </Box>
        </SectionCard>

        <SectionCard title="Exposure during pregnancy">
          <Box sx={exposureGridSx}>
            {exposureQuestions.map((question) => {
              const isYes = exposure[question.key] === "yes";

              return (
                <QuestionCard
                  key={question.key}
                  label={question.label}
                  value={exposure[question.key]}
                  onChange={(value) => handleExposureChange(question, value)}
                >
                  {isYes && (
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Box sx={{ maxWidth: 260 }}>
                        <Typography
                          component="div"
                          sx={{ mb: 1, fontSize: 12, color: "#43525f" }}
                        >
                          Month during pregnancy
                        </Typography>
                        <TextField
                          fullWidth
                          required
                          size="small"
                          type="number"
                          value={exposure[question.monthKey]}
                          error={Boolean(exposureErrors[question.monthKey])}
                          onChange={(event) =>
                            updateExposure({
                              [question.monthKey]: event.target.value,
                            })
                          }
                          slotProps={{
                            htmlInput: {
                              min: 0,
                              max: 10,
                              step: 1,
                              "aria-label": "Month during pregnancy",
                            },
                          }}
                          sx={monthInputSx}
                        />
                        <FieldError
                          message={exposureErrors[question.monthKey]}
                        />
                      </Box>

                      {question.key === "maternalRashIllness" && (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 1.5,
                            pt: 2,
                            borderTop: "1px solid #d8dde6",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 500,
                              color: "#2c3b4b",
                            }}
                          >
                            Was rubella laboratory confirmed?
                          </Typography>
                          <ToggleButtonGroup
                            exclusive
                            size="small"
                            aria-label="Was rubella laboratory confirmed?"
                            value={exposure.rubellaLaboratoryConfirmed}
                            onChange={(_, nextValue: YesNo | null) => {
                              if (nextValue !== null) {
                                updateExposure({
                                  rubellaLaboratoryConfirmed: nextValue,
                                });
                              }
                            }}
                            sx={choiceSx}
                          >
                            <ToggleButton value="yes">Yes</ToggleButton>
                            <ToggleButton value="no">No</ToggleButton>
                          </ToggleButtonGroup>
                        </Box>
                      )}
                    </Box>
                  )}
                </QuestionCard>
              );
            })}
          </Box>
        </SectionCard>
      </Box>
    </Box>
  );
}
