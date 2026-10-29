export type YesNo = "yes" | "no" | null;

export type ChildStatus = "alive" | "dead";

export type BirthWeightUnit = "kg" | "lb";

export interface CRSBirthDetails {
  birthWeight: string;
  birthWeightUnit: BirthWeightUnit;
  // status: ChildStatus;
  isChildDead: YesNo;
  dateOfDeath: string;
}

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
