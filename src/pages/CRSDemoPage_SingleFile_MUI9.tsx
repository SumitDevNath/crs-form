import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

// ----- Type definitions — crs.types.ts -----
export type YesNo = "yes" | "no" | null;
export type ChildStatus = "alive" | "dead";
export type BirthWeightUnit = "kg" | "lb";

export interface CongenitalHeartDiseaseTypes {
  pda: boolean;
  vsd: boolean;
  cchd: boolean;
  ps: boolean;
  others: boolean;
  othersSpecify: string;
}

// Group A: Clinical Information
export interface CRSGroupA {
  congenitalHeartDisease: YesNo;
  congenitalHeartDiseaseTypes: CongenitalHeartDiseaseTypes;
  cataract: YesNo;
  congenitalGlaucoma: YesNo;
  pigmentaryRetinopathy: YesNo;
  hearingImpairment: YesNo;
}

// Birth Details of Clinical Information
export interface CRSBirthDetails {
  birthWeight: string;
  birthWeightUnit: BirthWeightUnit;
  isChildDead: YesNo;
  dateOfDeath: string;
}

// Group B of Clinical Information
export interface CRSGroupB {
  purpura: YesNo;
  splenomegaly: YesNo;
  microcephaly: YesNo;
  mentalRetardation: YesNo;
  meningoencephalitis: YesNo;
  radiolucentBoneDisease: YesNo;
  jaundiceWithin24Hours: YesNo;
  otherAbnormalities: YesNo;
  otherAbnormalitiesDescription: string;
}

// CRS Clinical Information Full Form Data
export interface CRSClinicalInformation {
  groupA: CRSGroupA;
  birthDetails: CRSBirthDetails;
  groupB: CRSGroupB;
}

// Basic Maternal History
export interface CRSBasicMaternalInformation {
  motherAge: string;
  previousPregnancies: string;
  vaccinatedAgainstRubella: YesNo;
  rubellaVaccinationDate: string;
  compact?: boolean;
}

// Maternal History - Exposure During Pregnancy
export interface CRSExposureDuringPregnancy {
  exposedToRashIllness: YesNo;
  rubellaLaboratoryConfirmed: YesNo;
  exposurePregnancyMonth: string;
  maternalRashIllness: YesNo;
  maternalRashPregnancyMonth: string;
}

// CRS Maternal History Full Form Data
export interface CRSMaternalHistory {
  exposureDuringPregnancy: CRSExposureDuringPregnancy;
  basicInformation: CRSBasicMaternalInformation;
}

// CRS Vaccination History Full Form Data
export interface CRSCaseVaccinationHistory {
  vaccinationHistoryAvailable: boolean;
  vaccinatedAgainstRubella: YesNo;
  rubellaVaccinationDate: string;
}

// CRS Form Data Full Form Data
export interface CRSFormData {
  clinicalInformation: CRSClinicalInformation;
  maternalHistory: CRSMaternalHistory;
  caseVaccinationHistory: CRSCaseVaccinationHistory;
}

// ----- Initial data and question options — crs.constants.ts -----
export const initialCRSFormData: CRSFormData = {
  clinicalInformation: {
    groupA: {
      congenitalHeartDisease: null,
      congenitalHeartDiseaseTypes: {
        pda: false,
        vsd: false,
        cchd: false,
        ps: false,
        others: false,
        othersSpecify: "",
      },
      cataract: null,
      congenitalGlaucoma: null,
      pigmentaryRetinopathy: null,
      hearingImpairment: null,
    },
    birthDetails: {
      birthWeight: "",
      birthWeightUnit: "kg",
      // status: "alive",
      isChildDead: null,
      dateOfDeath: "",
    },
    groupB: {
      purpura: null,
      splenomegaly: null,
      microcephaly: null,
      mentalRetardation: null,
      meningoencephalitis: null,
      radiolucentBoneDisease: null,
      jaundiceWithin24Hours: null,
      otherAbnormalities: null,
      otherAbnormalitiesDescription: "",
    },
  },
  maternalHistory: {
    exposureDuringPregnancy: {
      exposedToRashIllness: null,
      exposurePregnancyMonth: "",
      rubellaLaboratoryConfirmed: null,
      maternalRashIllness: null,
      maternalRashPregnancyMonth: "",
    },
    basicInformation: {
      motherAge: "",
      previousPregnancies: "",
      vaccinatedAgainstRubella: null,
      rubellaVaccinationDate: "",
    },
  },
  caseVaccinationHistory: {
    vaccinationHistoryAvailable: false,
    vaccinatedAgainstRubella: null,
    rubellaVaccinationDate: "",
  },
};

export const congenitalHeartDiseaseOptions = [
  { key: "pda", label: "PDA" },
  { key: "vsd", label: "VSD" },
  { key: "cchd", label: "CCHD" },
  { key: "ps", label: "PS" },
  { key: "others", label: "Others" },
] as const;

export const groupBOptions = [
  { key: "purpura", label: "Purpura" },
  { key: "splenomegaly", label: "Splenomegaly" },
  { key: "microcephaly", label: "Microcephaly" },
  { key: "mentalRetardation", label: "Mental Retardation" },
  { key: "meningoencephalitis", label: "Meningoencephalitis" },
  { key: "radiolucentBoneDisease", label: "Radiolucent Bone Disease" },
  {
    key: "jaundiceWithin24Hours",
    label: "Jaundice (within 24 hours after birth)",
  },
  { key: "otherAbnormalities", label: "Other Abnormalities" },
] as const;

// ----- Shared TextField styles — crs.styles.ts -----
export const compactTextFieldSx = {
  "& .MuiInputBase-root": {
    fontSize: "0.875rem",
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.875rem",
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    fontSize: "0.75rem",
  },
};

export const whiteTextFieldSx = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff",
    borderRadius: "2px",
    "& fieldset": {
      borderColor: "#cfd6df",
    },
    "&:hover fieldset": {
      borderColor: "#9ca8b6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#0b63c7",
      borderWidth: "1px",
    },
  },
  "& .MuiInputBase-input": {
    fontSize: "0.875rem",
  },
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
  },
};

// ----- Validation — crsValidation.ts -----
function isValidDateFormat(value: string): boolean {
  return /^\d{2}-\d{2}-\d{4}$/.test(value);
}

function isValidCalendarDate(value: string): boolean {
  if (!isValidDateFormat(value)) {
    return false;
  }

  const [dayString, monthString, yearString] = value.split("-");
  const day = Number(dayString);
  const month = Number(monthString);
  const year = Number(yearString);

  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year)
  ) {
    return false;
  }

  if (year < 1000 || year > 9999) {
    return false;
  }

  if (month < 1 || month > 12) {
    return false;
  }

  const daysInMonth = new Date(year, month, 0).getDate();

  return day >= 1 && day <= daysInMonth;
}

function validateDateValue(value: string): string | undefined {
  if (!value.trim()) {
    return undefined;
  }

  if (!isValidDateFormat(value)) {
    return "Enter the date in DD-MM-YYYY format.";
  }

  if (!isValidCalendarDate(value)) {
    return "Enter a valid calendar date.";
  }

  if (isFutureDate(value)) {
    return "Future dates are not allowed.";
  }
  return undefined;
}

export function isFutureDate(value: string): boolean {
  if (!isValidDateFormat(value) || !isValidCalendarDate(value)) {
    return false;
  }

  const [day, month, year] = value.split("-").map(Number);
  const enteredDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  enteredDate.setHours(0, 0, 0, 0);

  return enteredDate > today;
}

export interface CRSValidationErrors {
  clinicalInformation: {
    groupA: {
      othersSpecify?: string;
    };
    birthDetails: {
      birthWeight?: string;
      dateOfDeath?: string;
    };
    groupB: {
      otherAbnormalitiesDescription?: string;
    };
  };
  maternalHistory: {
    exposureDuringPregnancy: {
      exposurePregnancyMonth?: string;
      maternalRashPregnancyMonth?: string;
    };
    basicInformation: {
      motherAge?: string;
      previousPregnancies?: string;
      rubellaVaccinationDate?: string;
    };
  };
  caseVaccinationHistory: {
    rubellaVaccinationDate?: string;
  };
}

export interface CRSValidationResult {
  errors: CRSValidationErrors;
  isValid: boolean;
}

function createEmptyErrors(): CRSValidationErrors {
  return {
    clinicalInformation: {
      groupA: {},
      birthDetails: {},
      groupB: {},
    },
    maternalHistory: {
      exposureDuringPregnancy: {},
      basicInformation: {},
    },
    caseVaccinationHistory: {},
  };
}

function isPositiveNumber(value: string): boolean {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) && parsedValue > 0;
}

function isPositiveInteger(value: string): boolean {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue > 0;
}

function isValidPreviousPregnancies(value: string): boolean {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue >= 0 && parsedValue <= 12;
}

function isValidPregnancyMonth(value: string): boolean {
  const parsedValue = Number(value);

  return Number.isInteger(parsedValue) && parsedValue >= 0 && parsedValue <= 10;
}

function containsError(value: unknown): boolean {
  if (typeof value === "string") {
    return value.length > 0;
  }

  if (typeof value === "object" && value !== null) {
    return Object.values(value).some(containsError);
  }

  return false;
}

function requiredDateError(value: string): string | undefined {
  return value.trim()
    ? validateDateValue(value)
    : "Vaccination date is required.";
}

function pregnancyMonthError(value: string): string | undefined {
  if (!value) return "Month during pregnancy is required.";
  if (!isValidPregnancyMonth(value))
    return "Enter a pregnancy month from 0 to 10.";
  return undefined;
}

export function validateCRSForm(formData: CRSFormData): CRSValidationResult {
  const errors = createEmptyErrors();
  const { groupA, birthDetails, groupB } = formData.clinicalInformation;
  const { exposureDuringPregnancy: exposure, basicInformation: basic } =
    formData.maternalHistory;
  const vaccination = formData.caseVaccinationHistory;

  if (
    groupA.congenitalHeartDisease === "yes" &&
    groupA.congenitalHeartDiseaseTypes.others &&
    !groupA.congenitalHeartDiseaseTypes.othersSpecify.trim()
  ) {
    errors.clinicalInformation.groupA.othersSpecify =
      "Please specify the other heart disease.";
  }

  if (!birthDetails.birthWeight.trim()) {
    errors.clinicalInformation.birthDetails.birthWeight =
      "Birth weight is required.";
  } else if (!isPositiveNumber(birthDetails.birthWeight)) {
    errors.clinicalInformation.birthDetails.birthWeight =
      "Birth weight must be greater than 0.";
  }

  if (birthDetails.isChildDead === "yes") {
    const error = birthDetails.dateOfDeath.trim()
      ? validateDateValue(birthDetails.dateOfDeath)
      : "Date of death is required.";
    if (error) errors.clinicalInformation.birthDetails.dateOfDeath = error;
  }

  if (
    groupB.otherAbnormalities === "yes" &&
    !groupB.otherAbnormalitiesDescription.trim()
  ) {
    errors.clinicalInformation.groupB.otherAbnormalitiesDescription =
      "Please describe the other abnormality.";
  }

  const pregnancyErrors = errors.maternalHistory.exposureDuringPregnancy;
  if (exposure.exposedToRashIllness === "yes") {
    const error = pregnancyMonthError(exposure.exposurePregnancyMonth);
    if (error) pregnancyErrors.exposurePregnancyMonth = error;
  }
  if (exposure.maternalRashIllness === "yes") {
    const error = pregnancyMonthError(exposure.maternalRashPregnancyMonth);
    if (error) pregnancyErrors.maternalRashPregnancyMonth = error;
  }

  const basicErrors = errors.maternalHistory.basicInformation;
  if (!basic.motherAge.trim()) {
    basicErrors.motherAge = "Mother's age is required.";
  } else if (!isPositiveInteger(basic.motherAge)) {
    basicErrors.motherAge = "Mother's age must be a positive whole number.";
  }

  if (!basic.previousPregnancies.trim()) {
    basicErrors.previousPregnancies =
      "Number of previous pregnancies is required.";
  } else if (!isValidPreviousPregnancies(basic.previousPregnancies)) {
    basicErrors.previousPregnancies =
      "Number of previous pregnancies must be between 0 and 12.";
  }

  if (basic.vaccinatedAgainstRubella === "yes") {
    const error = requiredDateError(basic.rubellaVaccinationDate);
    if (error) basicErrors.rubellaVaccinationDate = error;
  }

  if (vaccination.vaccinationHistoryAvailable) {
    if (vaccination.vaccinatedAgainstRubella === "yes") {
      const error = requiredDateError(vaccination.rubellaVaccinationDate);
      if (error) errors.caseVaccinationHistory.rubellaVaccinationDate = error;
    }
  }

  return { errors, isValid: !containsError(errors) };
}

// ----- Submit-only completeness validation -----
type CRSSubmissionErrors = Record<string, string>;

function getCRSSubmissionErrors(
  data: CRSFormData,
  errors: CRSValidationErrors,
): CRSSubmissionErrors {
  const result: CRSSubmissionErrors = {};
  const add = (id: string, message?: string) => {
    if (message) result[id] = message;
  };
  const missingChoice = (value: YesNo) =>
    value === null ? "Please select Yes or No." : undefined;

  const { groupA, groupB, birthDetails } = data.clinicalInformation;
  const { basicInformation: basic, exposureDuringPregnancy: exposure } =
    data.maternalHistory;
  const vaccination = data.caseVaccinationHistory;
  const clinicalErrors = errors.clinicalInformation;
  const maternalErrors = errors.maternalHistory;

  add(
    "groupA.congenitalHeartDisease",
    missingChoice(groupA.congenitalHeartDisease),
  );
  if (groupA.congenitalHeartDisease === "yes") {
    const diseaseTypes = groupA.congenitalHeartDiseaseTypes;
    if (!congenitalHeartDiseaseOptions.some(({ key }) => diseaseTypes[key])) {
      add(
        "groupA.congenitalHeartDiseaseTypes",
        "Select at least one heart disease type.",
      );
    }
    add("groupA.othersSpecify", clinicalErrors.groupA.othersSpecify);
  }
  for (const { key } of groupAQuestions) {
    add(`groupA.${key}`, missingChoice(groupA[key]));
  }
  for (const { key } of groupBOptions) {
    add(`groupB.${key}`, missingChoice(groupB[key]));
  }
  add(
    "groupB.otherAbnormalitiesDescription",
    clinicalErrors.groupB.otherAbnormalitiesDescription,
  );
  add("birthDetails.birthWeight", clinicalErrors.birthDetails.birthWeight);
  add("birthDetails.dateOfDeath", clinicalErrors.birthDetails.dateOfDeath);

  add("maternal.motherAge", maternalErrors.basicInformation.motherAge);
  add(
    "maternal.previousPregnancies",
    maternalErrors.basicInformation.previousPregnancies,
  );
  add(
    "maternal.rubellaVaccinationDate",
    maternalErrors.basicInformation.rubellaVaccinationDate,
  );
  for (const { key, monthKey } of exposureQuestions) {
    if (exposure[key] === "yes") {
      add(
        `maternal.${monthKey}`,
        maternalErrors.exposureDuringPregnancy[monthKey],
      );
    }
  }
  if (exposure.maternalRashIllness === "yes") {
    add(
      "maternal.rubellaLaboratoryConfirmed",
      missingChoice(exposure.rubellaLaboratoryConfirmed),
    );
  }
  if (vaccination.vaccinationHistoryAvailable) {
    if (vaccination.vaccinatedAgainstRubella === "yes") {
      add(
        "caseVaccination.rubellaVaccinationDate",
        errors.caseVaccinationHistory.rubellaVaccinationDate,
      );
    }
  }
  return result;
}

// Change the border only for invalid fields after Submit Now is pressed.
const invalidCardSx = { borderColor: "#d32f2f", borderWidth: "2px" } as const;

// ----- Weight conversion — weightConversion.ts -----
export function convertWeightToPounds(
  weight: string,
  unit: BirthWeightUnit,
): number | null {
  const numericWeight = Number(weight);

  if (!Number.isFinite(numericWeight) || numericWeight <= 0) {
    return null;
  }

  if (unit === "lb") {
    return Number(numericWeight.toFixed(2));
  }

  const pounds = numericWeight * 2.2046226218;

  return Number(pounds.toFixed(2));
}

// ----- Reusable CRS UI field components (all in this file) -----

// CheckboxField (inlined from CheckboxField(3).tsx)
interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function CheckboxField({
  label,
  checked,
  onChange,
  disabled = false,
}: CheckboxFieldProps) {
  return (
    <FormControlLabel
      label={label}
      sx={{
        m: 0,
        alignItems: "center",
        "& .MuiFormControlLabel-label": {
          fontSize: "0.8125rem",
          color: "#2c3b4b",
        },
      }}
      control={
        <Checkbox
          size="small"
          checked={checked}
          disabled={disabled}
          onChange={(_, checked) => onChange(checked)}
          sx={{
            p: "5px",
            mr: "4px",
            color: "#94a3b8",
            "&.Mui-checked": { color: "#12608f" },
          }}
        />
      }
    />
  );
}

// DateField (inlined from DateField(3).tsx)
interface DateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  helperText?: string;
}

function getTodayNativeDate(): string {
  const today = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");

  return `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
}

function convertNativeDateToDisplay(value: string): string {
  if (!value) return "";

  const [year, month, day] = value.split("-");
  return year && month && day ? `${day}-${month}-${year}` : "";
}

function isFutureDisplayDate(value: string): boolean {
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  if (!match) return false;

  const [, day, month, year] = match;
  const enteredDate = new Date(+year, +month - 1, +day);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  return enteredDate > today;
}

export function DateField({
  label,
  value,
  onChange,
  disabled = false,
  required = false,
  error = false,
}: DateFieldProps) {
  const calendarInputRef = useRef<HTMLInputElement>(null);

  const handleCalendarClick = () => {
    if (disabled || !calendarInputRef.current) return;

    const input = calendarInputRef.current;

    try {
      input.showPicker();
    } catch {
      input.click();
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        fullWidth
        size="small"
        label={label}
        value={value}
        disabled={disabled}
        required={required}
        error={error}
        placeholder="DD-MM-YYYY"
        onChange={(event) =>
          onChange(event.target.value.replace(/[^0-9-]/g, "").slice(0, 10))
        }
        onBlur={() => {
          if (isFutureDisplayDate(value)) onChange("");
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            bgcolor: "#fff",
          },
        }}
        slotProps={{
          htmlInput: {
            maxLength: 10,
            inputMode: "numeric",
            "aria-label": `${label} in DD-MM-YYYY format`,
          },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  size="small"
                  disabled={disabled}
                  onClick={handleCalendarClick}
                  aria-label={`Open calendar for ${label}`}
                  title="Open calendar"
                >
                  <CalendarMonthOutlinedIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <Box
        component="input"
        ref={calendarInputRef}
        type="date"
        max={getTodayNativeDate()}
        onChange={(event) =>
          onChange(convertNativeDateToDisplay(event.target.value))
        }
        tabIndex={-1}
        aria-hidden="true"
        sx={{
          position: "absolute",
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

// FieldError (inlined from FieldError(3).tsx)
interface FieldErrorProps {
  message?: string;
}

export function FieldError({ message }: FieldErrorProps) {
  if (!message) return null;

  return (
    <Typography
      component="p"
      variant="inherit"
      sx={{
        m: 0,
        pt: "4px",
        fontSize: "0.75rem",
        lineHeight: "1rem",
        color: "#d32f2f",
      }}
    >
      {message}
    </Typography>
  );
}

// SectionHeader (inlined from SectionHeader(2).tsx)
interface SectionHeaderProps {
  image: string;
  title: string;
  subtitle?: string;
  mandatory?: boolean;
  rightContent?: ReactNode;
}

export function SectionHeader({
  image,
  title,
  subtitle,
  mandatory = false,
  rightContent,
}: SectionHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        bgcolor: "#fff",
        pb: 1,
        "@media (min-width:640px)": {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            flexShrink: 0,
            borderRadius: "6px",
          }}
        >
          <Box
            component="img"
            src={image}
            alt=""
            aria-hidden="true"
            sx={{ width: 24, height: 24, objectFit: "contain" }}
          />
        </Box>

        <Box>
          <Typography
            component="h2"
            variant="inherit"
            sx={{
              m: 0,
              fontSize: 18,
              lineHeight: 1.5,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              component="p"
              variant="inherit"
              sx={{
                mt: 0.5,
                mb: 0,
                fontSize: 14,
                lineHeight: "20px",
                color: "#566575",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {mandatory && (
          <Typography
            component="div"
            variant="inherit"
            sx={{
              borderRadius: "9999px",
              bgcolor: "#fdecec",
              px: 2,
              py: 1,
              fontSize: 12,
              lineHeight: "16px",
              fontWeight: 500,
              color: "#c62828",
            }}
          >
            * Mandatory field
          </Typography>
        )}

        {rightContent}
      </Box>
    </Box>
  );
}

// SubsectionCard (inlined from SubsectionCard(2).tsx)
interface SubsectionCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
}

export function SubsectionCard({
  title,
  children,
  className = "",
  sx,
}: SubsectionCardProps) {
  return (
    <Paper
      component="section"
      variant="outlined"
      className={className}
      sx={[
        {
          border: "1px solid #cfd6df",
          borderRadius: "8px",
          bgcolor: "#fff",
          p: "20px",
          boxShadow: "none",
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {title && (
        <Box
          sx={{
            mb: "16px",
            pb: "12px",
            borderBottom: "1px solid #d9dee5",
          }}
        >
          <Typography
            component="h3"
            sx={{
              m: 0,
              fontFamily: "inherit",
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 700,
              letterSpacing: "0.025em",
              textTransform: "uppercase",
              color: "#1f2937",
            }}
          >
            {title}
          </Typography>
        </Box>
      )}

      {children}
    </Paper>
  );
}

// ToggleSwitch (inlined from ToggleSwitch(3).tsx)
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
  disabled?: boolean;
}

export function ToggleSwitch({
  checked,
  onChange,
  ariaLabel,
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <Switch
      checked={checked}
      onChange={(_, value) => onChange(value)}
      disabled={disabled}
      disableRipple
      slotProps={{ input: { "aria-label": ariaLabel } }}
      sx={{
        width: 44,
        height: 24,
        p: 0,
        flexShrink: 0,
        opacity: disabled ? 0.5 : 1,

        "& .MuiSwitch-switchBase": {
          p: "2px",

          "&.Mui-checked": {
            transform: "translateX(20px)",
            color: "#fff",

            "& + .MuiSwitch-track": {
              bgcolor: "#0566c7",
              opacity: 1,
            },
          },

          "&.Mui-focusVisible + .MuiSwitch-track": {
            boxShadow: "0 0 0 2px rgba(5, 102, 199, 0.3)",
          },

          "&.Mui-disabled": {
            cursor: "not-allowed",
          },

          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 1,
          },
        },

        "& .MuiSwitch-thumb": {
          width: 20,
          height: 20,
          bgcolor: "#fff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        },

        "& .MuiSwitch-track": {
          borderRadius: 12,
          bgcolor: "#c5cad4",
          opacity: 1,
          transition: "background-color 150ms ease",
        },
      }}
    />
  );
}

// YesNoField (inlined from YesNoField(3).tsx)
interface YesNoFieldProps {
  name: string;
  label: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
  disabled?: boolean;
  number?: number;
  compact?: boolean;
  required?: boolean;
  inline?: boolean;
}

export function YesNoField({
  name,
  label,
  value,
  onChange,
  disabled = false,
  number,
  compact = false,
  required = false,
  inline = false,
}: YesNoFieldProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: inline ? "flex-start" : "space-between",
        gap: inline ? 5 : 2,
        ml: inline ? 5 : 0,
        minHeight: compact ? 40 : 48,
      }}
    >
      {(label || number !== undefined) && (
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}
        >
          {number !== undefined && (
            <Typography
              component="span"
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontFamily: "inherit",
                letterSpacing: "inherit",
                color: "#566575",
              }}
            >
              {number}.
            </Typography>
          )}

          {label && (
            <Typography
              component="span"
              sx={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: 500,
                fontFamily: "inherit",
                letterSpacing: "inherit",
                color: "#1f2937",
              }}
            >
              {label}
              {required && (
                <Box component="span" sx={{ ml: 0.5, color: "#dc2626" }}>
                  *
                </Box>
              )}
            </Typography>
          )}
        </Box>
      )}

      <ToggleButtonGroup
        exclusive
        size="small"
        value={value}
        disabled={disabled}
        aria-label={label || name}
        onChange={(_, nextValue: YesNo | null) => {
          if (nextValue) onChange(nextValue);
        }}
        sx={{
          flexShrink: 0,
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
            bgcolor: "#f3f4f6",

            "&:hover": {
              color: "#9ca3af",
              bgcolor: "#f3f4f6",
              borderColor: "#d7dce3",
            },

            "&.Mui-selected, &.Mui-selected:hover": {
              bgcolor: "#0b63c7",
              color: "#ffffff",
              borderColor: "#0b63c7",
              fontWeight: 600,
            },
          },
        }}
      >
        <ToggleButton value="yes">Yes</ToggleButton>
        <ToggleButton value="no">No</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

// ----- Form state and validation -----
interface CRSFormContextValue {
  formData: CRSFormData;
  setFormData: Dispatch<SetStateAction<CRSFormData>>;
  validationErrors: CRSValidationErrors;
  submitAttempted: boolean;
  setSubmitAttempted: Dispatch<SetStateAction<boolean>>;
  submissionErrors: CRSSubmissionErrors;
  isValid: boolean;
  updateClinicalInformation: (value: CRSClinicalInformation) => void;
  updateMaternalHistory: (value: CRSMaternalHistory) => void;
  updateCaseVaccinationHistory: (value: CRSCaseVaccinationHistory) => void;
  resetForm: () => void;
}

const CRSFormContext = createContext<CRSFormContextValue | undefined>(
  undefined,
);

interface CRSFormProviderProps {
  children: ReactNode;
}

export function CRSFormProvider({ children }: CRSFormProviderProps) {
  const [formData, setFormData] = useState<CRSFormData>(initialCRSFormData);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const updateSection = <K extends keyof CRSFormData>(
    key: K,
    value: CRSFormData[K],
  ) => setFormData((previous) => ({ ...previous, [key]: value }));

  const updateClinicalInformation = (value: CRSClinicalInformation) =>
    updateSection("clinicalInformation", value);
  const updateMaternalHistory = (value: CRSMaternalHistory) =>
    updateSection("maternalHistory", value);
  const updateCaseVaccinationHistory = (value: CRSCaseVaccinationHistory) =>
    updateSection("caseVaccinationHistory", value);

  const resetForm = () => {
    setFormData(initialCRSFormData);
    setSubmitAttempted(false);
  };

  const validation = validateCRSForm(formData);
  const submissionErrors = getCRSSubmissionErrors(formData, validation.errors);

  return (
    <CRSFormContext.Provider
      value={{
        formData,
        setFormData,

        validationErrors: submitAttempted
          ? validation.errors
          : createEmptyErrors(),
        submitAttempted,
        setSubmitAttempted,
        submissionErrors,

        isValid: validation.isValid,

        updateClinicalInformation,
        updateMaternalHistory,
        updateCaseVaccinationHistory,

        resetForm,
      }}
    >
      {children}
    </CRSFormContext.Provider>
  );
}

export function useCRSForm() {
  const context = useContext(CRSFormContext);

  if (!context) {
    throw new Error("useCRSForm must be used inside CRSFormProvider");
  }

  return context;
}

// ----- Clinical, maternal, and vaccination sections -----
// Clinical Information
const clinicalCardSx = {
  p: { xs: 2, sm: 2 },
  border: "1px solid #cfd4de",
  borderRadius: "6px",
  bgcolor: "#fff",
  boxShadow: "none",
} as const;

const clinicalSectionSx = {
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

const cardTitleSx = {
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

const innerSectionTitleSx = {
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#374151",
} as const;

function SectionCard({
  title,
  children,
  clinical = false,
}: {
  title: string;
  children: ReactNode;
  clinical?: boolean;
}) {
  return (
    <Paper
      component="section"
      variant="outlined"
      sx={clinical ? clinicalSectionSx : maternalSectionSx}
    >
      {clinical ? (
        <Box sx={{ mb: 2 }}>
          <Typography component="h3" sx={innerSectionTitleSx}>
            {title}
          </Typography>
        </Box>
      ) : (
        <Typography component="h3" sx={{ ...innerSectionTitleSx, mb: 2 }}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
}

function YesNoButtons({
  label,
  value,
  onChange,
}: {
  label: string;
  value: YesNo;
  onChange: (value: YesNo) => void;
}) {
  return (
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
  );
}

const questionRowSx = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: 1.5,
} as const;

function QuestionCard({
  label,
  number,
  value,
  onChange,
  children,
  maternal = false,
  fieldId,
}: {
  label: string;
  number?: number;
  value: YesNo;
  onChange: (value: YesNo) => void;
  children?: ReactNode;
  maternal?: boolean;
  fieldId?: string;
}) {
  const { submitAttempted, submissionErrors } = useCRSForm();
  const warning =
    submitAttempted && fieldId ? submissionErrors[fieldId] : undefined;

  return (
    <Paper
      data-crs-invalid={warning ? "true" : undefined}
      tabIndex={warning ? -1 : undefined}
      component="article"
      variant="outlined"
      sx={[
        maternal ? maternalCardSx : { ...clinicalCardSx, minWidth: 0 },
        ...(warning ? [invalidCardSx] : []),
      ]}
    >
      <Box sx={questionRowSx}>
        <Typography
          component="h4"
          sx={
            maternal
              ? { ...cardTitleSx, flex: 1, minWidth: 0 }
              : {
                  flex: 1,
                  minWidth: 0,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#0f172a",
                }
          }
        >
          {!maternal && number !== undefined && `${number}. `}
          {label}
        </Typography>
        {maternal ? (
          <ToggleSwitch
            checked={value === "yes"}
            onChange={(checked) => onChange(checked ? "yes" : "no")}
            ariaLabel={label}
          />
        ) : (
          <YesNoButtons label={label} value={value} onChange={onChange} />
        )}
      </Box>
      {children && <Box sx={conditionalSx}>{children}</Box>}
      <FieldError message={warning} />
    </Paper>
  );
}

function ClinicalInformationSection() {
  const {
    formData,
    validationErrors,
    updateClinicalInformation,
    submitAttempted,
    submissionErrors,
  } = useCRSForm();
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
          <SectionCard clinical title="Group (a)">
            <QuestionCard
              number={1}
              fieldId="groupA.congenitalHeartDisease"
              label="Congenital Heart Disease"
              value={groupA.congenitalHeartDisease}
              onChange={handleCongenitalHeartDiseaseChange}
            >
              {groupA.congenitalHeartDisease === "yes" && (
                <Box
                  data-crs-invalid={
                    submitAttempted &&
                    submissionErrors["groupA.congenitalHeartDiseaseTypes"]
                      ? "true"
                      : undefined
                  }
                  tabIndex={-1}
                  sx={
                    submitAttempted &&
                    submissionErrors["groupA.congenitalHeartDiseaseTypes"]
                      ? {
                          border: "2px solid #d32f2f",
                          borderRadius: "6px",
                          p: 1,
                        }
                      : undefined
                  }
                >
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
                    <Box
                      data-crs-invalid={
                        submitAttempted &&
                        submissionErrors["groupA.othersSpecify"]
                          ? "true"
                          : undefined
                      }
                      tabIndex={-1}
                      sx={{ minWidth: 0 }}
                    >
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
                  <FieldError
                    message={
                      submitAttempted
                        ? submissionErrors["groupA.congenitalHeartDiseaseTypes"]
                        : undefined
                    }
                  />
                </Box>
              )}
            </QuestionCard>

            <Box sx={{ ...threeColumnSx, mt: 2 }}>
              {groupAQuestions.map(({ key, label }, index) => (
                <QuestionCard
                  key={key}
                  number={index + 2}
                  fieldId={`groupA.${key}`}
                  label={label}
                  value={groupA[key]}
                  onChange={(value) =>
                    updateSection("groupA", { [key]: value })
                  }
                />
              ))}
            </Box>
          </SectionCard>

          <SectionCard clinical title="Group (b)">
            <Box sx={threeColumnSx}>
              {groupBOptions.map((option, index) => (
                <QuestionCard
                  key={option.key}
                  number={index + 1}
                  fieldId={`groupB.${option.key}`}
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
              <Box
                data-crs-invalid={
                  submitAttempted &&
                  submissionErrors["groupB.otherAbnormalitiesDescription"]
                    ? "true"
                    : undefined
                }
                tabIndex={-1}
                sx={{ mt: 2 }}
              >
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

        <SectionCard clinical title="Birth Details">
          <Box
            sx={{
              display: "grid",
              gap: 2.5,
              "@media (min-width:768px)": {
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              },
            }}
          >
            <Paper
              component="article"
              variant="outlined"
              data-crs-invalid={
                submitAttempted && submissionErrors["birthDetails.birthWeight"]
                  ? "true"
                  : undefined
              }
              tabIndex={-1}
              sx={[
                clinicalCardSx,
                ...(submitAttempted &&
                submissionErrors["birthDetails.birthWeight"]
                  ? [invalidCardSx]
                  : []),
              ]}
            >
              <Typography sx={{ ...cardTitleSx, mb: 2 }}>
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

            <Paper
              component="article"
              variant="outlined"
              data-crs-invalid={
                submitAttempted && submissionErrors["birthDetails.isChildDead"]
                  ? "true"
                  : undefined
              }
              tabIndex={-1}
              sx={[
                clinicalCardSx,
                ...(submitAttempted &&
                submissionErrors["birthDetails.isChildDead"]
                  ? [invalidCardSx]
                  : []),
              ]}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Typography sx={cardTitleSx}>Is the child dead?</Typography>
                <ToggleSwitch
                  checked={birthDetails.isChildDead === "yes"}
                  onChange={handleChildStatusChange}
                  ariaLabel="Is the child dead?"
                />
              </Box>
              <FieldError
                message={
                  submitAttempted
                    ? submissionErrors["birthDetails.isChildDead"]
                    : undefined
                }
              />
              {birthDetails.isChildDead === "yes" && (
                <Box
                  data-crs-invalid={
                    submitAttempted &&
                    submissionErrors["birthDetails.dateOfDeath"]
                      ? "true"
                      : undefined
                  }
                  tabIndex={-1}
                  sx={{
                    ...conditionalSx,
                    "& .MuiFormLabel-asterisk": { display: "none" },
                  }}
                >
                  <DateField
                    label="Date of Death"
                    value={birthDetails.dateOfDeath}
                    error={
                      submitAttempted &&
                      Boolean(submissionErrors["birthDetails.dateOfDeath"])
                    }
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

// Maternal History
const maternalSectionSx = {
  ...clinicalSectionSx,
  p: { xs: 2, sm: 2 },
  borderRadius: "12px",
} as const;

const maternalCardSx = {
  ...clinicalCardSx,
  p: { xs: 2, sm: 2.5 },
  minWidth: 0,
} as const;

const monthInputSx = {
  "& .MuiOutlinedInput-root": { bgcolor: "#fff" },
} as const;

const basicGridSx = threeColumnSx;

const exposureGridSx = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr)",
  gap: 2,
  alignItems: "start",
  "@media (min-width:1024px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
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

function MaternalHistorySection() {
  const {
    formData,
    validationErrors,
    updateMaternalHistory,
    submitAttempted,
    submissionErrors,
  } = useCRSForm();
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
                data-crs-invalid={
                  submitAttempted && submissionErrors[`maternal.${field.key}`]
                    ? "true"
                    : undefined
                }
                tabIndex={-1}
                sx={[
                  maternalCardSx,
                  ...(submitAttempted &&
                  submissionErrors[`maternal.${field.key}`]
                    ? [invalidCardSx]
                    : []),
                ]}
              >
                <Typography component="h4" sx={{ ...cardTitleSx, mb: 2 }}>
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
              maternal
              fieldId="maternal.vaccinatedAgainstRubella"
              label="Vaccinated against rubella"
              value={basicInformation.vaccinatedAgainstRubella}
              onChange={handleMaternalVaccinationChange}
            >
              {basicInformation.vaccinatedAgainstRubella === "yes" && (
                <Box
                  data-crs-invalid={
                    submitAttempted &&
                    submissionErrors["maternal.rubellaVaccinationDate"]
                      ? "true"
                      : undefined
                  }
                  tabIndex={-1}
                >
                  <DateField
                    label="Vaccination date"
                    value={basicInformation.rubellaVaccinationDate}
                    error={
                      submitAttempted &&
                      Boolean(
                        submissionErrors["maternal.rubellaVaccinationDate"],
                      )
                    }
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
                  maternal
                  key={question.key}
                  fieldId={`maternal.${question.key}`}
                  label={question.label}
                  value={exposure[question.key]}
                  onChange={(value) => handleExposureChange(question, value)}
                >
                  {isYes && (
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                      <Box
                        data-crs-invalid={
                          submitAttempted &&
                          submissionErrors[`maternal.${question.monthKey}`]
                            ? "true"
                            : undefined
                        }
                        tabIndex={-1}
                        sx={{ maxWidth: 260 }}
                      >
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
                          data-crs-invalid={
                            submitAttempted &&
                            submissionErrors[
                              "maternal.rubellaLaboratoryConfirmed"
                            ]
                              ? "true"
                              : undefined
                          }
                          tabIndex={-1}
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: 1.5,
                            pt: 2,
                            borderTop: "1px solid #d8dde6",
                            ...(submitAttempted &&
                            submissionErrors[
                              "maternal.rubellaLaboratoryConfirmed"
                            ]
                              ? {
                                  border: "2px solid #d32f2f",
                                  borderRadius: "6px",
                                  p: 1,
                                }
                              : {}),
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
                          <Box>
                            <YesNoButtons
                              label="Was rubella laboratory confirmed?"
                              value={exposure.rubellaLaboratoryConfirmed}
                              onChange={(value) =>
                                updateExposure({
                                  rubellaLaboratoryConfirmed: value,
                                })
                              }
                            />
                            <FieldError
                              message={
                                submitAttempted
                                  ? submissionErrors[
                                      "maternal.rubellaLaboratoryConfirmed"
                                    ]
                                  : undefined
                              }
                            />
                          </Box>
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

// Case Vaccination History
const vaccinationCardSx = { ...maternalCardSx, borderRadius: "12px" } as const;

function CaseVaccinationHistorySection() {
  const {
    formData,
    validationErrors,
    updateCaseVaccinationHistory,
    submitAttempted,
    submissionErrors,
  } = useCRSForm();

  const vaccinationHistory = formData.caseVaccinationHistory;
  const vaccinationErrors = validationErrors.caseVaccinationHistory;

  const updateHistory = (changes: Partial<typeof vaccinationHistory>) =>
    updateCaseVaccinationHistory({ ...vaccinationHistory, ...changes });

  const handleAvailabilityChange = (checked: boolean) =>
    updateHistory({
      vaccinationHistoryAvailable: checked,
      ...(!checked && {
        vaccinatedAgainstRubella: null,
        rubellaVaccinationDate: "",
      }),
    });

  const handleVaccinatedChange = (checked: boolean) =>
    updateHistory({
      vaccinatedAgainstRubella: checked ? "yes" : "no",
      ...(!checked && { rubellaVaccinationDate: "" }),
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
      {/* HEADER WITH AVAILABILITY TOGGLE */}
      <Box
        component="header"
        sx={{
          px: { xs: 2, md: 3 },
          py: 2.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          borderBottom: "1px solid #cfd4de",
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 20, md: 24 },
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          Vaccination History of the Case
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            border: "1px solid #cfd4de",
            p: "6px 12px",
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#2c3b4b",
            }}
          >
            Vaccination history available?
          </Typography>

          <ToggleSwitch
            checked={vaccinationHistory.vaccinationHistoryAvailable}
            onChange={handleAvailabilityChange}
            ariaLabel="Enable vaccination history"
          />
        </Box>
      </Box>

      {/* VACCINATION DETAILS */}
      {vaccinationHistory.vaccinationHistoryAvailable && (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.5fr)",
              gap: 2,
              "@media (min-width:1024px)": {
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              },
            }}
          >
            <Paper
              component="article"
              variant="outlined"
              data-crs-invalid={
                submitAttempted &&
                submissionErrors["caseVaccination.vaccinatedAgainstRubella"]
                  ? "true"
                  : undefined
              }
              tabIndex={-1}
              sx={[
                vaccinationCardSx,
                ...(submitAttempted &&
                submissionErrors["caseVaccination.vaccinatedAgainstRubella"]
                  ? [invalidCardSx]
                  : []),
              ]}
            >
              <Box sx={{ ...questionRowSx, justifyContent: "space-between" }}>
                <Typography
                  component="h3"
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#0f172a",
                  }}
                >
                  Vaccinated against rubella
                </Typography>

                <ToggleSwitch
                  checked={
                    vaccinationHistory.vaccinatedAgainstRubella === "yes"
                  }
                  onChange={handleVaccinatedChange}
                  ariaLabel="Vaccinated against rubella"
                />
              </Box>

              <FieldError
                message={
                  submitAttempted
                    ? submissionErrors[
                        "caseVaccination.vaccinatedAgainstRubella"
                      ]
                    : undefined
                }
              />
              {vaccinationHistory.vaccinatedAgainstRubella === "yes" && (
                <Box
                  data-crs-invalid={
                    submitAttempted &&
                    submissionErrors["caseVaccination.rubellaVaccinationDate"]
                      ? "true"
                      : undefined
                  }
                  tabIndex={-1}
                  sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: "1px solid #d8dde6",
                  }}
                >
                  <DateField
                    label="Vaccination Date"
                    value={vaccinationHistory.rubellaVaccinationDate}
                    error={
                      submitAttempted &&
                      Boolean(
                        submissionErrors[
                          "caseVaccination.rubellaVaccinationDate"
                        ],
                      )
                    }
                    required
                    onChange={(value) =>
                      updateHistory({ rubellaVaccinationDate: value })
                    }
                  />

                  <FieldError
                    message={vaccinationErrors.rubellaVaccinationDate}
                  />
                </Box>
              )}
            </Paper>
          </Box>
        </Box>
      )}
    </Box>
  );
}

// Main CRS form composition
const sections = [
  { id: "clinical", Component: ClinicalInformationSection },
  { id: "maternal", Component: MaternalHistorySection },
  { id: "vaccination", Component: CaseVaccinationHistorySection },
] as const;

const formSectionSx = {
  border: "1px solid #dbe3ec",
  borderRadius: "12px",
  bgcolor: "#fff",
  p: "20px",
  boxShadow: "none",
  "@media (min-width:640px)": { p: "24px" },
} as const;

function CRSInvestigationForm() {
  const { submissionErrors, setSubmitAttempted } = useCRSForm();
  const formRef = useRef<HTMLDivElement>(null);
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    if (submitCount === 0) return;
    const firstInvalid = formRef.current?.querySelector<HTMLElement>(
      '[data-crs-invalid="true"]',
    );
    firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
    firstInvalid?.focus({ preventScroll: true });
  }, [submitCount]);

  const handleSubmit = () => {
    // Valid form: intentionally no operation, as requested.
    if (Object.keys(submissionErrors).length === 0) return;
    setSubmitAttempted(true);
    setSubmitCount((count) => count + 1);
  };

  return (
    <Stack
      ref={formRef}
      spacing={2}
      sx={{ p: "12px", "@media (min-width:640px)": { p: "16px" } }}
    >
      {sections.map(({ id, Component }) => (
        <Paper
          key={id}
          component="section"
          variant="outlined"
          sx={formSectionSx}
        >
          <Component />
        </Paper>
      ))}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          type="button"
          onClick={handleSubmit}
          sx={{
            bgcolor: "#0b63c7",
            color: "#fff",
            fontWeight: 600,
            textTransform: "none",
            px: 3,
            py: 1.25,
            "&:hover": { bgcolor: "#0955a8" },
          }}
        >
          Submit Now
        </Button>
      </Box>
    </Stack>
  );
}

// ----- Demo page and development state panel -----
function CRSFormDebugOutput() {
  const { formData, isValid } = useCRSForm();

  return (
    <Box
      component="details"
      sx={{ border: "1px solid #e2e8f0", bgcolor: "#fff" }}
    >
      <Box
        component="summary"
        sx={{
          cursor: "pointer",
          px: 2,
          py: 1.5,
          fontSize: 14,
          fontWeight: 500,
          color: "#334155",
        }}
      >
        Development Form State
      </Box>
      <Box sx={{ borderTop: "1px solid #e2e8f0", p: 2 }}>
        <Typography
          sx={{ mb: 1.5, fontSize: 12, lineHeight: "16px", color: "#64748b" }}
        >
          Validation: {isValid ? "valid" : "invalid"}
        </Typography>
        <Box
          component="pre"
          sx={{
            m: 0,
            maxHeight: 450,
            overflow: "auto",
            bgcolor: "#020617",
            p: 2,
            fontSize: 12,
            lineHeight: "20px",
            color: "#f1f5f9",
          }}
        >
          {JSON.stringify(formData, null, 2)}
        </Box>
      </Box>
    </Box>
  );
}

export default function CRSDemoPage() {
  return (
    <CRSFormProvider>
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          bgcolor: "#f4f7fb",
          px: "12px",
          py: "24px",
          "@media (min-width:640px)": { px: "20px" },
          "@media (min-width:1024px)": { px: "32px" },
        }}
      >
        <Box sx={{ maxWidth: 1180, mx: "auto" }}>
          <Box
            sx={{ mb: 2, bgcolor: "#1d355d", px: 2.5, py: 2, color: "#fff" }}
          >
            <Box
              sx={{
                display: "grid",
                gap: 1.5,
                "@media (min-width:768px)": {
                  gridTemplateColumns: "minmax(0, 1fr) 360px",
                  alignItems: "center",
                },
              }}
            >
              <Box>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: 18,
                    lineHeight: "28px",
                    fontWeight: 600,
                    color: "inherit",
                  }}
                >
                  Disease Selection
                </Typography>
                <Typography
                  sx={{
                    mt: 0.5,
                    fontSize: 12,
                    lineHeight: "16px",
                    color: "#dbeafe",
                  }}
                >
                  Select the specific surveillance target for clinical
                  branching.
                </Typography>
              </Box>

              <Select
                fullWidth
                size="small"
                value="crs"
                disabled
                aria-label="Selected disease"
                sx={{
                  height: 40,
                  borderRadius: "6px",
                  bgcolor: "#fff",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#0f172a",
                  "& .MuiOutlinedInput-notchedOutline, &.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#bfdbfe",
                    },
                  "& .MuiSelect-select": { pl: 1.5, py: 1 },
                  "& .MuiSelect-select.Mui-disabled": {
                    WebkitTextFillColor: "#0f172a",
                  },
                }}
              >
                <MenuItem value="crs">
                  Congenital Rubella Syndrome (CRS)
                </MenuItem>
              </Select>
            </Box>
          </Box>

          <CRSInvestigationForm />
          <Box sx={{ mt: 2.5 }}>
            <CRSFormDebugOutput />
          </Box>
        </Box>
      </Box>
    </CRSFormProvider>
  );
}
