import { Box, MenuItem, Select, Typography } from "@mui/material";
import { CRSFormProvider, useCRSForm } from "../context/CRSFormContext";
import CRSInvestigationForm from "../components/crs/CRSInvestigationForm";

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
