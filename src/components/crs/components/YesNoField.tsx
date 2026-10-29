import { ToggleButton, ToggleButtonGroup } from "@mui/material";

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
    <div
      className={`flex items-center ${
        inline ? "justify-start ml-10 gap-10" : "justify-between gap-4"
      } ${compact ? "min-h-10" : "min-h-12"}`}
    >
      {(label || number !== undefined) && (
        <div className="flex min-w-0 items-center gap-2">
          {number !== undefined && (
            <span className="text-sm text-[#566575]">{number}.</span>
          )}

          {label && (
            <span className="text-sm font-medium text-[#1f2937]">
              {label}

              {required && <span className="ml-1 text-red-600">*</span>}
            </span>
          )}
        </div>
      )}

      <ToggleButtonGroup
        exclusive
        size="small"
        value={value}
        disabled={disabled}
        aria-label={label || name}
        onChange={(_, nextValue: YesNo) => {
          if (nextValue) {
            onChange(nextValue);
          }
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
            backgroundColor: "#f3f4f6",
          },

          // Unselected button: no hover effect
          "& .MuiToggleButton-root:hover": {
            color: "#9ca3af",
            backgroundColor: "#f3f4f6",
            borderColor: "#d7dce3",
          },

          "& .MuiToggleButton-root.Mui-selected": {
            backgroundColor: "#0b63c7",
            color: "#ffffff",
            borderColor: "#0b63c7",
            fontWeight: 600,
          },

          // Selected button: also keep same appearance on hover
          "& .MuiToggleButton-root.Mui-selected:hover": {
            backgroundColor: "#0b63c7",
            color: "#ffffff",
            borderColor: "#0b63c7",
          },
        }}
      >
        <ToggleButton value="yes">Yes</ToggleButton>

        <ToggleButton value="no">No</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
