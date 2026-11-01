import { Paper, Stack } from "@mui/material";
import ClinicalInformationSection from "./sections/ClinicalInformationSection";
import MaternalHistorySection from "./sections/MaternalHistorySection";
import CaseVaccinationHistorySection from "./sections/CaseVaccinationHistorySection";

const sections = [
  { id: "clinical", Component: ClinicalInformationSection },
  { id: "maternal", Component: MaternalHistorySection },
  { id: "vaccination", Component: CaseVaccinationHistorySection },
] as const;

const sectionSx = {
  border: "1px solid #dbe3ec",
  borderRadius: "12px",
  bgcolor: "#fff",
  p: "20px",
  boxShadow: "none",
  "@media (min-width:640px)": { p: "24px" },
} as const;

export default function CRSInvestigationForm() {
  return (
    <Stack
      spacing={2}
      sx={{ p: "12px", "@media (min-width:640px)": { p: "16px" } }}
    >
      {sections.map(({ id, Component }) => (
        <Paper key={id} component="section" variant="outlined" sx={sectionSx}>
          <Component />
        </Paper>
      ))}
    </Stack>
  );
}
