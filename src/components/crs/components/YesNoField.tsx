import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import type { YesNo } from "../types/crs.types";

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

export default function YesNoField({
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
