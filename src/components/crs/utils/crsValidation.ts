import type { CRSFormData } from "../types/crs.types";

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

export function validateCRSForm(formData: CRSFormData): CRSValidationResult {
  const errors = createEmptyErrors();

  const { groupA, birthDetails, groupB } = formData.clinicalInformation;

  const { exposureDuringPregnancy, basicInformation } =
    formData.maternalHistory;

  const caseVaccinationHistory = formData.caseVaccinationHistory;

  // --------------------------------
  // Clinical Information — Group A
  // --------------------------------

  if (
    groupA.congenitalHeartDisease === "yes" &&
    groupA.congenitalHeartDiseaseTypes.others &&
    !groupA.congenitalHeartDiseaseTypes.othersSpecify.trim()
  ) {
    errors.clinicalInformation.groupA.othersSpecify =
      "Please specify the other heart disease.";
  }

  // --------------------------------
  // Birth Details
  // --------------------------------

  if (!birthDetails.birthWeight.trim()) {
    errors.clinicalInformation.birthDetails.birthWeight =
      "Birth weight is required.";
  } else if (!isPositiveNumber(birthDetails.birthWeight)) {
    errors.clinicalInformation.birthDetails.birthWeight =
      "Birth weight must be greater than 0.";
  }

  if (birthDetails.isChildDead === "yes") {
    if (!birthDetails.dateOfDeath.trim()) {
      errors.clinicalInformation.birthDetails.dateOfDeath =
        "Date of death is required.";
    } else {
      const dateError = validateDateValue(birthDetails.dateOfDeath);

      if (dateError) {
        errors.clinicalInformation.birthDetails.dateOfDeath = dateError;
      }
    }
  }

  // --------------------------------
  // Clinical Information — Group B
  // --------------------------------

  if (
    groupB.otherAbnormalities === "yes" &&
    !groupB.otherAbnormalitiesDescription.trim()
  ) {
    errors.clinicalInformation.groupB.otherAbnormalitiesDescription =
      "Please describe the other abnormality.";
  }

  // --------------------------------
  // Maternal exposure
  // --------------------------------

  if (exposureDuringPregnancy.exposedToRashIllness === "yes") {
    if (!exposureDuringPregnancy.exposurePregnancyMonth) {
      errors.maternalHistory.exposureDuringPregnancy.exposurePregnancyMonth =
        "Month during pregnancy is required.";
    } else if (
      !isValidPregnancyMonth(exposureDuringPregnancy.exposurePregnancyMonth)
    ) {
      errors.maternalHistory.exposureDuringPregnancy.exposurePregnancyMonth =
        "Enter a pregnancy month from 0 to 10.";
    }
  }

  if (exposureDuringPregnancy.maternalRashIllness === "yes") {
    if (!exposureDuringPregnancy.maternalRashPregnancyMonth) {
      errors.maternalHistory.exposureDuringPregnancy.maternalRashPregnancyMonth =
        "Month during pregnancy is required.";
    } else if (
      !isValidPregnancyMonth(exposureDuringPregnancy.maternalRashPregnancyMonth)
    ) {
      errors.maternalHistory.exposureDuringPregnancy.maternalRashPregnancyMonth =
        "Enter a pregnancy month from 0 to 10.";
    }
  }

  // --------------------------------
  // Basic maternal information
  // --------------------------------

  if (!basicInformation.motherAge.trim()) {
    errors.maternalHistory.basicInformation.motherAge =
      "Mother's age is required.";
  } else if (!isPositiveInteger(basicInformation.motherAge)) {
    errors.maternalHistory.basicInformation.motherAge =
      "Mother's age must be a positive whole number.";
  }

  if (!basicInformation.previousPregnancies.trim()) {
    errors.maternalHistory.basicInformation.previousPregnancies =
      "Number of previous pregnancies is required.";
  } else if (
    !isValidPreviousPregnancies(basicInformation.previousPregnancies)
  ) {
    errors.maternalHistory.basicInformation.previousPregnancies =
      "Number of previous pregnancies must be between 0 and 12.";
  }

  if (basicInformation.vaccinatedAgainstRubella === "yes") {
    if (!basicInformation.rubellaVaccinationDate.trim()) {
      errors.maternalHistory.basicInformation.rubellaVaccinationDate =
        "Vaccination date is required.";
    } else {
      const dateError = validateDateValue(
        basicInformation.rubellaVaccinationDate,
      );

      if (dateError) {
        errors.maternalHistory.basicInformation.rubellaVaccinationDate =
          dateError;
      }
    }
  }

  // --------------------------------
  // Vaccination History of the Case
  // --------------------------------

  if (caseVaccinationHistory.vaccinationHistoryAvailable) {
    if (caseVaccinationHistory.vaccinatedAgainstRubella === null) {
      errors.caseVaccinationHistory.rubellaVaccinationDate =
        "Please select Yes or No.";
    }

    if (caseVaccinationHistory.vaccinatedAgainstRubella === "yes") {
      if (!caseVaccinationHistory.rubellaVaccinationDate.trim()) {
        errors.caseVaccinationHistory.rubellaVaccinationDate =
          "Vaccination date is required.";
      } else {
        const dateError = validateDateValue(
          caseVaccinationHistory.rubellaVaccinationDate,
        );

        if (dateError) {
          errors.caseVaccinationHistory.rubellaVaccinationDate = dateError;
        }
      }
    }
  }

  return {
    errors,
    isValid: !containsError(errors),
  };
}
