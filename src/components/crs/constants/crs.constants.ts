import type { CRSFormData } from "../types/crs.types";

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
  {
    key: "pda",
    label: "PDA",
  },
  {
    key: "vsd",
    label: "VSD",
  },
  {
    key: "cchd",
    label: "CCHD",
  },
  {
    key: "ps",
    label: "PS",
  },
  {
    key: "others",
    label: "Others",
  },
] as const;

export const groupBOptions = [
  {
    key: "purpura",
    label: "Purpura",
  },
  {
    key: "splenomegaly",
    label: "Splenomegaly",
  },
  {
    key: "microcephaly",
    label: "Microcephaly",
  },
  {
    key: "mentalRetardation",
    label: "Mental Retardation",
  },
  {
    key: "meningoencephalitis",
    label: "Meningoencephalitis",
  },
  {
    key: "radiolucentBoneDisease",
    label: "Radiolucent Bone Disease",
  },
  {
    key: "jaundiceWithin24Hours",
    label: "Jaundice (within 24 hours after birth)",
  },
  {
    key: "otherAbnormalities",
    label: "Other Abnormalities",
  },
] as const;
