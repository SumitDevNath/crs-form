import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { initialCRSFormData } from "../components/crs/constants/crs.constants";

import {
  validateCRSForm,
  type CRSValidationErrors,
} from "../components/crs/utils/crsValidation";

import type {
  CRSCaseVaccinationHistory,
  CRSClinicalInformation,
  CRSFormData,
  CRSMaternalHistory,
} from "../components/crs/types/crs.types";

interface CRSFormContextValue {
  formData: CRSFormData;

  setFormData: Dispatch<SetStateAction<CRSFormData>>;

  validationErrors: CRSValidationErrors;

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

  const updateClinicalInformation = (value: CRSClinicalInformation) => {
    setFormData((previous) => ({
      ...previous,
      clinicalInformation: value,
    }));
  };

  const updateMaternalHistory = (value: CRSMaternalHistory) => {
    setFormData((previous) => ({
      ...previous,
      maternalHistory: value,
    }));
  };

  const updateCaseVaccinationHistory = (value: CRSCaseVaccinationHistory) => {
    setFormData((previous) => ({
      ...previous,
      caseVaccinationHistory: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialCRSFormData);
  };

  const validation = validateCRSForm(formData);

  return (
    <CRSFormContext.Provider
      value={{
        formData,
        setFormData,

        validationErrors: validation.errors,

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
