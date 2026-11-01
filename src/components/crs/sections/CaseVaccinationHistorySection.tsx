import { Box, Paper, Typography } from "@mui/material";
import { useCRSForm } from "../../../context/CRSFormContext";
import DateField from "../components/DateField";
import FieldError from "../components/FieldError";
import ToggleSwitch from "../components/ToggleSwitch";

const cardSx = {
  p: { xs: 2, sm: 2.5 },
  border: "1px solid #cfd4de",
  borderRadius: "12px",
  bgcolor: "#fff",
  boxShadow: "none",
  minWidth: 0,
} as const;

export default function CaseVaccinationHistorySection() {
  const { formData, validationErrors, updateCaseVaccinationHistory } =
    useCRSForm();

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
            <Paper component="article" variant="outlined" sx={cardSx}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 1.5,
                }}
              >
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

              {vaccinationHistory.vaccinatedAgainstRubella === "yes" && (
                <Box
                  sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: "1px solid #d8dde6",
                  }}
                >
                  <DateField
                    label="Vaccination Date"
                    value={vaccinationHistory.rubellaVaccinationDate}
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
